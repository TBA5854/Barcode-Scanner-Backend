const mongooose = require('mongoose')
const userschema = new mongooose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    "password": {
        type: String,
        required: true
    },
    "profile": {
        type: mongooose.Types.ObjectId,
        required:true
    }
})

mongooose.model('User', userschema)

module.exports = mongooose.model('User')