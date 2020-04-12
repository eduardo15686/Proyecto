var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    flavor: {
        type: String,
        enum: ["Chocolate", "Vainilla", "Fresa"]
    },
    description: {
        type: String,
        minlength: [8, "Descripcion minima requerida: 8 caracteres"],
        maxlength: [42, "Su descripción sobrepaso el limite de 42 caracteres"]
    },
    iq: {
        type: Number,
        required: true,
        min: [1, 'El iq no puede ser 0'],
        max: [301, 'El IQ no puede ser mayor a 300']
    },
    picture: {
        type: String,
        required: true
    },
    user:{
        type: String
    }
})

var Cerebro = mongoose.model("Cerebro", modelSchema)
module.exports = Cerebro;