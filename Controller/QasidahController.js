const Qasidah = require("../Model/QasidahModel.js");

//tampil data
exports.getQasidah = async (req, res) => {
  try {
    const qasidahs = await Qasidah.find();
    res.status(200).json(qasidahs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
//tampil data berdasarkan id
exports.getQasidahById = async (req, res) => {
  try {
    const qasidah = await Qasidah.findById(req.params.id);
    res.json(qasidah);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
//save data
exports.saveQasidah = async (req, res) => {
  const qasidah = new Qasidah(req.body);
  try {
      await qasidah.save();
      res.status(201).json({ message: "Qasidah berhasil disimpan!" });
      // const insertqasidah = await qasidah.save();
      // res.status(201).json(insertqasidah);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
//update data
exports.updateQasidah = async (req, res) => {
  try {
      await Qasidah.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json({ message: "Qasidah berhasil diubah!" });
      // const updateqasidah = await Qasidah.updateOne(
      //   { _id: req.params.id },
      //   { $set: req.body }
      // );
      // res.status(201).json(updateqasidah);backend/Routes/QasidahRoutes.js
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
//delete data
exports.deleteQasidah = async (req, res) => {
  try {
    await Qasidah.deleteOne({ _id: req.params.id });
    // const deleteqasidah = await Qasidah.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: `Qasidah berhasil dihapus` });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
