const express = require('express');
const { getTimeslot ,addTimeslot,updateTimeslot,deleteTimeslot} = require('../controllers/timeslotController');
const router = express.Router();

router.get('/', getTimeslot);
router.post('/', addTimeslot);
router.delete('/:time_slot_id', deleteTimeslot);

module.exports = router;
