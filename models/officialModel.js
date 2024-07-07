const mongooose = require('mongoose')
const officialSchema = new mongooose.Schema({
    "role": {
        type: String,
        required: true,
    }
})

mongooose.model('Official', officialSchema)

module.exports = mongooose.model('Official')