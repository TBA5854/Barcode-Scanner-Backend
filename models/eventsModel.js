const mongooose = require('mongoose')
const userschema = new mongooose.Schema({
    "Title": {
        type: String,
        required: true,
    },
    "Description": {
        type: String,
        required: true,
    },
    "EventType": {
        type: String,
        required: true,
    },
    "Venue": {
        type: String,
        required: true
    },
    "CntactInfo": {
        type: String,
        required: true,
    },
    "Coordinator": {
        type: mongooose.Types.ObjectId,
        required:true
    },
})

mongooose.model('Event', userschema)

module.exports = mongooose.model('Event')