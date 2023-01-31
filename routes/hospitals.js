const express = require('express');
const { getAllHospital, createHospital, getHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');
router = express.Router();

router.route('/').get(getAllHospital).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

module.exports=router;