const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Point = new Schema (
    {
        userId: { type: String, require: true, },
        index: { type: Number, require: true, },
        data: [
            { 
                MMH:    { type: String, require: true, },
                TMH:    { type: String, require: true, },
                TC:     { type: Number, require: true, },
                KT:     { type: Number, require: true, },
                THI:    { type: Number, require: true, },
                KTRA:   { type: Number, require: true, },
                THIL1:  { type: Number, require: true, },
                TK10:   { type: Number, require: true, },
                TKCH:   { type: String, require: true, },
                TK4:    { type: Number, require: true, },
                KQ:     { type: String, require: true, },
            }
        ],
        totalScore: {
            TK10: { type: Number, require: true, },
            TK4: { type: Number, require: true, },
            TC: { type: Number, require: true, },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Point', Point);
