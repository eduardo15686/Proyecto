var mongoose = require('mongoose');

/*var modelSchema = mongoose.Schema({
    name: String,
    email: String,
    type: String
})*/

var modelSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [4, "El nombre es muy corto: min 4 caracteres"],
        maxlength: [16, "El nombre solo puede tener hasta 16 caracteres"]
    },
    email: {
        type: String,
        required: [true, "El campo de correo electronico es obligatorio"],
        unique: true
    },
    type: {
        type: String,
        enum: ["Alumno", "Profesor"]
    },
    user:{
        type: String
    }
});

var Zombie = mongoose.model("Zombie", modelSchema)
module.exports = Zombie;