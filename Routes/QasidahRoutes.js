import express from "express";
import Qasidah from "../Model/QasidahModel.js";
import {
    saveData
} from "../Controller/QasidahController.js";
const router = express.Router();
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
router.post("/qasidahs/", async (req, res) => {
  const qasidah = new Qasidah(req.body);
  try {
    const insertqasidah = await qasidah.save();
    res.status(201).json(insertqasidah);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
router.put("/qasidahs/:id", async (req, res) => {
  try {
    const updateqasidah = await Qasidah.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateqasidah);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
router.delete("/qasidahs/:id", async (req, res) => {
  try {
    const deleteqasidah = await Qasidah.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteqasidah);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
