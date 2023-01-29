import express from "express";
import Qasidah from "../Model/QasidahModel.js";
import { saveData } from "../Controller/QasidahController.js";
const router = express.Router();
import { body, validationResult, check } from "express-validator";

router.get("/qasidahs", async (req, res) => {
  try {
    const qasidahs = await Qasidah.find();
    res.json(qasidahs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.get("/qasidahs/:id", async (req, res) => {
  try {
    const qasidah = await Qasidah.findById(req.params.id);
    res.json(qasidah);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});
router.post(
  "/qasidahs/",
  [
    check("title", "Judul qasidah harus di isi!").notEmpty(),
    check("title_arabic", "Judul arab qasidah harus di isi!").notEmpty(),
    check("version", "Versi harus di isi!").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const qasidah = new Qasidah(req.body);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: errors.array(),
        });
      } else {
        await qasidah.save();
        res.status(201).json({ message: "Qasidah berhasil disimpan!" });
        // const insertqasidah = await qasidah.save();
        // res.status(201).json(insertqasidah);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);
router.put(
  "/qasidahs/:id",
  [
    check("title", "Judul qasidah harus di isi!").notEmpty(),
    check("title_arabic", "Judul arab qasidah harus di isi!").notEmpty(),
    check("version", "Versi harus di isi!").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: errors.array(),
        });
      } else {
        await Qasidah.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(201).json({ message: "Qasidah berhasil diubah!" });
        // const updateqasidah = await Qasidah.updateOne(
        //   { _id: req.params.id },
        //   { $set: req.body }
        // );
        // res.status(201).json(updateqasidah);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);
router.delete("/qasidahs/:id", async (req, res) => {
  try {
    await Qasidah.deleteOne({ _id: req.params.id });
    // const deleteqasidah = await Qasidah.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: `Qasidah berhasil dihapus` });
    // res.status(200).json(deleteqasidah);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
