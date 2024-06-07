const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataschema = new Schema(
    {
        title: {
            type: String,
            required: true // Changed from require to required
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Data', dataschema);
