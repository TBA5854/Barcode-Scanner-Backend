const mongooose = require('mongoose')
const clubschema = new mongooose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "members": {
        type: Array,
        required: true,
        default:[]
    },
    "board": {
        type: Array,
        required: true,
        default:[]
    },
    "staff": {
        type: mongooose.Types.ObjectId,
        required:true
    }
})

mongooose.model('Club', clubschema)

module.exports = mongooose.model('Club')