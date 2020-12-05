//model for user who is a fan of another user
var mongoose = require('mongoose');

const fanSchema = new mongoose.Schema(
    {
        fanId: {
            type: String,
            required: true,
        },
        faveId: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
);

const Fan = mongoose.model('Fan', fanSchema);

module.exports = Fan;