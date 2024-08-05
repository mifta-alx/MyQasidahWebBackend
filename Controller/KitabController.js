const Kitab = require("../Model/KitabModel.js");

//tampil data
exports.getKitab = async (req, res) => {
  try {
    const kitabs = await Kitab.find();
    res.status(200).json(kitabs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
//tampil data berdasarkan id
exports.getKitabById = async (req, res) => {
  try {
    const kitabs = await Kitab.findById(req.params.id);
    res.json(kitabs);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
//save data
exports.saveKitab = async (req, res) => {
  const kitabs = new Kitab(req.body);
  try {
    await kitabs.save();
    res.status(201).json({ message: "Kitab berhasil disimpan!" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
//update data
exports.updateKitab = async (req, res) => {
  try {
    await Kitab.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(201).json({ message: "Kitab berhasil diubah!" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
//delete data
exports.deleteKitab = async (req, res) => {
  try {
    await Kitab.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: `Kitab berhasil dihapus` });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
