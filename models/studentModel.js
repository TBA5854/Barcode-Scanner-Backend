const mongooose = require('mongoose')
const studentschema = new mongooose.Schema({
    "regNo": {
      "type": "String",
      required: true,
    },
    "Clubs": {
        type: Array,
        required: true,
        // unique: true,
        default:[]
    },
    "Board": {
        type: Array,
        required: true,
        // unique: true,
        default:[]
    },
    "role": {
        type: String,
        required: true,
        default:"Student"
    }
  })

mongooose.model('Student', studentschema)

module.exports = mongooose.model('Student')