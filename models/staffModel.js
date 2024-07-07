const mongooose = require('mongoose')
const staffschema = new mongooose.Schema({
    "club": {
        type: String,
        required: true,
        
    },
    "empid": {
        type: Number,
        unique: true,
        required: true,
    },
    "role": {
        type: String,
        required: true,
        default:"Staff"
    }
  })

mongooose.model('Staff', staffschema)

module.exports = mongooose.model('Staff')