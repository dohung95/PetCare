
const Log = require('../models/Log');


exports.getPetLogs = async (req, res) => {
  try {
    const logs = await Log.find({ petId: req.params.id });
    if (!logs) {
      return res.status(404).json({ message: 'Logs not found' });
    }
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addLog = async (req, res) => {
  const log = new Log({
    petId: req.params.id,
    activity: req.body.activity,
    notes: req.body.notes
  });
  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updateLog = async (req, res) => {
    try {
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.logId,
            req.body,
            { new: true, runValidators: true } // new: true trả về bản ghi đã cập nhật, runValidators để chạy các validate trong schema
        );
        if (!updatedLog) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.json(updatedLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteLog = async (req, res) => {
  try {
    const deletedLog = await Log.findByIdAndDelete(req.params.logId);

    if (!deletedLog) {
      return res.status(404).json({ message: 'Log not found.' });
    }

    res.json({ message: 'Log successfully deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};