const express = require('express');
const router = express.Router();
const { createData, getData, getSingledata, updateData, deleteTask } = require('../controllers/Datacontrollers');

router.post('/', createData);
router.get('/', getData);
router.get('/:id', getSingledata);
router.patch('/:id', updateData);
router.delete('/:id', deleteTask);


module.exports = router;
