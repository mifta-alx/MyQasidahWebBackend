const mongoose = require('mongoose')
const Qasidah = mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    title_arabic: {
        type: String,
        required : true
    },
    version: {
        type: String,
        required : true
    },
    tipe: {
        type: String,
        required : true
    },
    textreff: [
        {
            parent:{
                type: String,
                required:false
            },
            reff:[
                {
                    subreff:{
                        type: String,
                        required:false
                    }
                }
            ]
        }
    ],
    textlirik:[
        {
            parent:{
                type: String,
                required:false
            },
            lirik:[
                {
                    sublirik:{
                        type: String,
                        required:false
                    }
                }
            ]
        }
    ],
},{timestamps : true})
module.exports = mongoose.model('Qasidahs', Qasidah);