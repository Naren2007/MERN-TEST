const datamodel = require('../models/datamodels');
const mongoose = require('mongoose');

// POST API to create data
const createData = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newData = await datamodel.create({ title, description });
        res.status(200).json(newData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET API to fetch all data
const getData = async (req, res) => {
    try {
        const data = await datamodel.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET API to fetch single data
const getSingledata = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Data Not Found' });
    }
    try {
        const singleData = await datamodel.findById(id);
        if (!singleData) {
            return res.status(404).json({ error: 'Data Not Found' });
        }
        res.status(200).json(singleData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PATCH API to update data

const updateData = async (req, res) => { 
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Data Not Found' });
    }
    try {
        const Data = await datamodel.findByIdAndUpdate({
            _id:id
        },
        {
            ...req.body 
        }
        );
        res.status(200).json(Data)

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// DELETE A DATA

const deleteTask = async (req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Data Not Found' });
    }
    try{
        const Data = await datamodel.findByIdAndDelete(id)
        res.status(200).json(Data)
    }catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports = { createData, getData, getSingledata, updateData, deleteTask};
