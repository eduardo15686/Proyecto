var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [4, "Ingrese un número de usuario de minimo 4 caracteres"],
        maxlength: [14, "Núm de caracteres max: 14"],
        unique: [true, "Este nombre de usuario ya ha sido registrado"]
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: [true, "El correo electronico es un campo obligatorio c:"]
    },
    type: {
        type: String,
        enum: ["Administrador", "Usuario Normal"]
    }
})

var Usuario = mongoose.model("Usuarios", modelSchema)
module.exports = Usuario;