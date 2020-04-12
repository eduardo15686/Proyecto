let express = require('express');
let router = express.Router();

let Zombie = require('../models/zombie');
let Cerebro = require('../models/cerebro');
let Usuario = require("../models/usuario");
let Apartado = require("../models/apartados");
var bcrypt = require('bcrypt');
const saltRounds = 10;

//Zombies

router.get('/zombies/:nombre', async(req,res) => {
    if((req.params.nombre) !== undefined){
        await Usuario.findOne({username: req.params.nombre}).exec((error,admin) => {
            if(!error)
            {
                if(admin.type == 'Administrador'){
                    Zombie.find().exec((error,zombies) => {
                        if(!error)
                        {
                            res.status(200).json(zombies);
                        }
                        else
                        {
                            res.status(500).json(error);
                            console.log(req.body.nombre);
                        }
                    });
                }
                else{
                    Zombie.find({user: req.params.nombre}).exec((error,zombies) => {
                        if(!error)
                        {
                            res.status(200).json(zombies);
                        }
                        else
                        {
                            res.status(500).json(error);
                            console.log(req.body.nombre);
                        }
                    });
                }
            }
            else
            {
                res.status(500).json(error);
                console.log(req.body.nombre);
            }
        });
        
    }
    else{
        console.log('tu wea no sirve :v');
    }
});

//Add

router.post('/zombies/new', async function(req, res) {
    var data = req.body;
    var nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type,
        user: data.user
    });
    var json = [];
    var id = 0;
    if (nuevoZombie.name == "" || nuevoZombie.name == undefined || nuevoZombie.type == "" || nuevoZombie.type == undefined) {
        id++;
        json.push({ "mensaje": "No has llenado todos los datos, intenta de nuevo.", "id": id });
        res.status(500).json({ mensajeError: json });
    } else {
        await nuevoZombie.save(function(error) {
            if (error) {
                if (error.errors.name) {
                    id++;
                    json.push({ "mensaje": error.errors.name.message, "id": id });
                }
                if (error.errors.email) {
                    id++;
                    json.push({ "mensaje": error.errors.email.message, "id": id });
                }
                if (error.errors.type) {
                    id++;
                    json.push({ "mensaje": "Tipo de zombie no valido", "id": id });
                }
                res.status(500).json({ mensajeError: json });
            } else {
                listadoZombies("Zombie insertado correctamente", "alert-success", req, res);
            }
        });
    }
});

//Editar

router.put('/zombies/edit/:id', async function(req, res) {
    var json = [];
    var id = 0;
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.name = req.body.name;
        zombie.email = req.body.email;
        zombie.type = req.body.type;
        await zombie.save();
        listadoZombies("Zombie modificado correctamente", "alert-success", req, res);
    } catch (e) {
        if (e.errors.name) {
            id++;
            json.push({ "mensaje": e.errors.name.message, "id": id });
        }
        if (e.errors.email) {
            id++;
            json.push({ "mensaje": e.errors.email.message, "id": id });
        }
        if (e.errors.type) {
            id++;
            json.push({ "mensaje": "Tipo de zombie no valido", "id": id });
        }
        res.status(500).json({ mensajeError: json, mensajeExito:''});
    }
});

//Eliminar

router.delete('/zombies/delete/:id', async function(req, res) {
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();
        listadoZombies("Zombie eliminado correctamente", "alert-success", req, res);

    } catch (e) {
        res.status(500).json({ mensajeError: e, mensajeExito:''});
    }
});

function listadoZombies(_alert, _color, req, res) {
    Zombie.find().exec(function(error, Zombies) {
        if (!error) {
            console.log(Zombies);
            res.status(200).json({mensajeError:'', mensajeExito: _alert});
        }
    });
}

//Cerebros



router.get('/cerebros/:nombre', async(req,res) => {
    if((req.params.nombre) !== undefined){
        await Usuario.findOne({username: req.params.nombre}).exec((error,admin) => {
            if(!error)
            {
                if(admin.type == 'Administrador'){
                    Cerebro.find().exec((error,cerebros) => {
                        if(!error)
                        {
                            res.status(200).json(cerebros);
                        }
                        else
                        {
                            res.status(500).json(error);
                            console.log(req.body.nombre);
                        }
                    });
                }
                else{
                    Cerebro.find({user: req.params.nombre}).exec((error,cerebros) => {
                        if(!error)
                        {
                            res.status(200).json(cerebros);
                        }
                        else
                        {
                            res.status(500).json(error);
                            console.log(req.body.nombre);
                        }
                    });
                }
            }
            else
            {
                res.status(500).json(error);
                console.log(req.body.nombre);
            }
        });
        
    }
    else{
        console.log('tu wea no sirve :v');
    }
});

//contar Sabores
router.get('/Chocolate', async(req,res) => {
        await Cerebro.find({flavor: 'Chocolate'}).count().exec((error,sabores) => {
            if(!error)
            {
                console.log(sabores);
                res.status(200).json(sabores);
            }
            else
            {
                res.status(500).json(error);
            }
        });
});
router.get('/Vainilla', async(req,res) => {
    await Cerebro.find({flavor: 'Vainilla'}).count().exec((error,sabores) => {
        if(!error)
        {
            console.log(sabores);
            res.status(200).json(sabores);
        }
        else
        {
            res.status(500).json(error);
        }
    });
});
router.get('/Fresa', async(req,res) => {
    await Cerebro.find({flavor: 'Fresa'}).count().exec((error,sabores) => {
        if(!error)
        {
            console.log(sabores);
            res.status(200).json(sabores);
        }
        else
        {
            res.status(500).json(error);
        }
    });
});

//contar cerebros-usuarios
router.get('/cerebrosU/:nombre', async(req,res) => {
    await Cerebro.find({user: req.params.nombre}).count().exec((error,cUsuarios) => {
        if(!error)
        {
            console.log(cUsuarios);
            res.status(200).json(cUsuarios);
        }
        else
        {
            res.status(500).json(error);
        }
    });
});
router.get('/cerebrosRes', async(req,res) => {
    await Cerebro.find().count().exec((error,sabores) => {
        if(!error)
        {
            console.log(sabores);
            res.status(200).json(sabores);
        }
        else
        {
            res.status(500).json(error);
        }
    });
});

//Add

router.post('/cerebros/new', async function(req, res) {
    var cerebro = req;
    var data = req.body;
    var nuevoCerebro = new Cerebro({
        flavor: data.flavor,
        description: data.description,
        iq: data.iq,
        picture: data.picture,
        user: data.user
    });
    var json = [];
    var id = 0;
    if (nuevoCerebro.flavor == "" || nuevoCerebro.description == "" || nuevoCerebro.flavor == undefined || nuevoCerebro.description == undefined) {
        id++;
        json.push({ "mensaje": "No has llenado todos los datos, intenta de nuevo.", "id": id });
        res.render('cerebro/add', { alert: json, color: "alert-danger" })

    } else {
        nuevoCerebro.save(function(error) {
            if (error) {

                if (error.errors.flavor) {
                    id++;
                    json.push({ "mensaje": error.errors.flavor.message, "id": id });
                }
                if (error.errors.description) {
                    id++;
                    json.push({ "mensaje": error.errors.description.message, "id": id });
                }
                if (error.errors.iq) {
                    id++;
                    json.push({ "mensaje": error.errors.iq.message, "id": id });
                }
                if (error.errors.picture) {
                    id++;
                    json.push({ "mensaje": "Imagen no seleccionada", "id": id });
                }
                res.status(500).json({ mensajeError: json });
            } else {
                listadoCerebros("Cerebro insertado correctamente", "alert-success", req, res);
            }
        });
    }
});

//Editar

router.put('/cerebros/edit/:id', async function(req, res) {
    var json = [];
    var id = 0;
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.flavor = req.body.flavor;
        cerebro.description = req.body.description;
        cerebro.iq = req.body.iq;
        cerebro.picture = req.body.picture;
        await cerebro.save();
        listadoCerebros("Cerebro editado correctamente", "alert-success", req, res);
    } catch (e) {
        if (e.errors.flavor) {
            id++;
            json.push({ "mensaje": e.errors.flavor.message, "id": id });
        }
        if (e.errors.description) {
            id++;
            json.push({ "mensaje": e.errors.description.message, "id": id });
        }
        if (e.errors.iq) {
            id++;
            json.push({ "mensaje": e.errors.iq.message, "id": id });
        }
        if (e.errors.picture) {
            id++;
            json.push({ "mensaje": "Imagen no seleccionada", "id": id });
        }
        res.status(500).json({ mensajeError: json });
    }
});

//Eliminar

router.delete('/cerebros/delete/:id', async function(req, res) {
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.delete();
        listadoCerebros("Cerebro eliminado correctamente", "alert-success", req, res);
    } catch (e) {
        res.status(500).json({ mensajeError: e, mensajeExito:''});
    }
});

function listadoCerebros(_alert, _color, req, res) {
    Cerebro.find().exec(function(error, Cerebros) {
        if (!error) {
            console.log(Cerebros);
            res.status(200).json({mensajeError:'', mensajeExito: _alert});
        }
    });
}

//Usuarios

//Login

router.post('/users/login', async function(req, res) {
    var data = req.body;
    var usuario = new Usuario({
        username: data.username,
        password: data.password
    });
    
    console.log(usuario.username);
    console.log(usuario.password);
    Usuario.findOne({username:usuario.username}).exec(function(error, _usuario) {
        if (!error) {
            console.log(_usuario);
            if (_usuario == null)
            {
                indexLogin("Usuario incorrecto", "alert-danger", req, res);
            }
            else
            {
                bcrypt.compare(usuario.password, _usuario.password, function(error, result) {
                    if(result){
                        console.log(usuario.type);
                      res.status(200).json({mensajeError:'', mensajeExito: 'sucess'});
                    } else {
                      res.status(500).json({mensajeError:'Contraseña incorrecta', mensajeExito: ''});
                    }
                  });
            }
        }
        else
        {
            res.status(500).json({ mensajeError: error, mensajeExito:''});
        }
    });
});

router.get('/users/:nombre', async function(req,res){
    if((req.params.nombre) !== undefined){
        var F ;
        await Usuario.findOne({username: req.params.nombre}).exec((error,admin) => {
            if(!error)
            {
                if(admin.type == 'Administrador'){
                    F= true;
                }
                else{
                    F=false;
                }
                res.status(200).json(admin);
            }
            else
            {
                res.status(500).json(error);
                console.log(req.body.nombre);
            }
        });
    }
    else{
        console.log('tu wea no sirve :v');
    }

});

//Register

router.post('/users/new', async function(req, res) {
    var user = req;
    var data = req.body;
    bcrypt.hash(data.password, saltRounds, function (err,   hash) {
        var nuevoUser = new Usuario({
            username: data.username,
            password: hash,
            email: data.email,
            type: data.type
        });
        console.log(nuevoUser);
        var json = [];
        var id = 0;
        if (nuevoUser.username == undefined || nuevoUser.password == undefined || nuevoUser.username == "" || nuevoUser.password == "" || nuevoUser.type == "" || nuevoUser.type == undefined || nuevoUser.email == "" || nuevoUser.email == undefined) {
            id++;
            json.push({ "mensaje": "No has llenado todos los datos, intenta de nuevo.", "id": id });
            res.status(500).json({ mensajeError: json, mensajeExito:''});
    
        } else {
            nuevoUser.save(function(error) {
                if (error) {
                    if (error.errors.username) {
                        id++;
                        json.push({ "mensaje": error.errors.username.message, "id": id });
                    }
                    if (error.errors.password) {
                        id++;
                        json.push({ "mensaje": error.errors.password.message, "id": id });
                    }
                    if (error.errors.email) {
                        id++;
                        json.push({ "mensaje": error.errors.email.message, "id": id });
                    }
                    if (error.errors.type) {
                        id++;
                        json.push({ "mensaje": error.errors.type.message, "id": id });
                    }
                    res.status(500).json({ mensajeError: json, mensajeExito:''});
                } else {
                    res.status(200).json({ mensajeError: "", mensajeExito:'Usuario registrado correctamente'});
                }
            });
        }
    });
    
});


//apartado
router.post('/apartado/new', async function(req, res) {
    var data = req.body;
    var nuevoApartado = new Apartado({
        flavor: data.flavor,
        quantity: data.quantity,
        category: data.category,
        date: data.date,
        arrive: data.arrive,
        user: data.user
    });
    var json = [];
    var id = 0;
    if (nuevoApartado.flavor == "" || nuevoApartado.quantity == "" || nuevoApartado.flavor == undefined || nuevoApartado.quantity == undefined) {
        id++;
        json.push({ "mensaje": "No has llenado todos los datos, intenta de nuevo.", "id": id });
        res.render('apartado/add', { alert: json, color: "alert-danger" })

    } else {
        nuevoApartado.save(function(error) {
            if (error) {

                if (error.errors.flavor) {
                    id++;
                    json.push({ "mensaje": error.errors.flavor.message, "id": id });
                }
                if (error.errors.iq) {
                    id++;
                    json.push({ "mensaje": error.errors.quantity.message, "id": id });
                }
                res.status(500).json({ mensajeError: json });
            } else {
                listadoCerebros("Apartado realizado correctamente", "alert-success", req, res);
            }
        });
    }
});

router.get('/apartados/:nombre', async(req,res) => {
    if((req.params.nombre) !== undefined){
        await Usuario.findOne({username: req.params.nombre}).exec((error,admin) => {
            if(!error)
            {
                if(admin.type == 'Administrador'){
                    Apartado.find().exec((error,apartados) => {
                        if(!error)
                        {
                            res.status(200).json(apartados);
                        }
                        else
                        {
                            res.status(500).json(error);
                            console.log(req.body.nombre);
                        }
                    });
                }
                else{
                    Apartado.find({user: req.params.nombre}).exec((error,apartados) => {
                        if(!error)
                        {
                            res.status(200).json(apartados);
                        }
                        else
                        {
                            res.status(500).json(error);
                            console.log(req.body.nombre);
                        }
                    });
                }
            }
            else
            {
                res.status(500).json(error);
                console.log(req.body.nombre);
            }
        });
        
    }
    else{
        console.log('tu wea no sirve :v');
    }
});



function indexLogin(_alert, _color, req, res) { 
    res.status(500).json({mensajeError:_alert, mensajeExito: ''});
}

module.exports = router;