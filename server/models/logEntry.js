const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredNumber = {
    type : Number,
    required : true,
}

const LogEntrySchema = new Schema({
    title : {
        type : String,
        required : true
    },
    comments : String,
    image : String,
    latitude : {
        ...requiredNumber,
        min : -90,
        max : 90
    },
    longitude : {
        ...requiredNumber,
        min : -180,
        max : 180
    }
})

const LogEntry = mongoose.model('LogEntry', LogEntrySchema)l

module.exports = LogEntry;