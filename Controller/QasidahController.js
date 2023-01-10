import Qasidah from "../Model/QasidahModel.js";
import fs from "fs";
//membuat folder  folder jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  //cek file
  fs.mkdirSync(dirPath); //membuat folder data
}
//membuat folder file json jika belum ada
const dataPath = "./data/qasidah.json";
if (!fs.existsSync(dataPath)) {
  //cek file
  fs.writeFileSync(dataPath, "[]", "utf-8"); //membuat file json
}
//menimpa data di json dengan data baru
export const saveData = (qasidahs) => {
  fs.writeFileSync("data/qasidah.json", JSON.stringify(qasidahs));
};
///////////
//tampil data
export const getQasidah = async (req, res) => {
  try {
    const qasidahs = await Qasidah.find();
    return res.json(qasidahs);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
//tampil data berdasarkan id
export const getQasidahById = async (req, res) => {
  try {
    const qasidah = await Qasidah.findById(req.params.id);
    return res.json(qasidah);
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
//save data
export const saveQasidah = async (req, res) => {
  const qasidah = new Qasidah(req.body);
  try {
    const insertqasidah = await qasidah.save();
    //save to file json
    const qasidahs = await Qasidah.find();
    saveData(qasidahs)
    //
    return res.status(201).json(insertqasidah);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
//update data
export const updateQasidah = async (req, res) => {
  try {
    const updateqasidah = await Qasidah.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    //save to file json
    const qasidahs = await Qasidah.find();
    saveData(qasidahs)
    //
    return res.status(200).json(updateqasidah);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
//delete data
export const deleteQasidah = async (req, res) => {
  try {
    const deleteqasidah = await Qasidah.deleteOne({ _id: req.params.id });
    //save to file json
    const qasidahs = await Qasidah.find();
    saveData(qasidahs)
    //
    return res.status(200).json(deleteqasidah);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
