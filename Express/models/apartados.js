var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    flavor: {
        type: String
    },
    quantity:{
        type: Number
    },
    category:{
        type: String,
        enum: ["Bronze", "Silver", "Gold"]
    },
    date: {
        type: Date
    },
    arrive: {
        type: Date
    },
    user:{
        type: String
    }
})

var Apartado = mongoose.model("Apartado", modelSchema)
module.exports = Apartado;