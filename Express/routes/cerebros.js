var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest: "C:/Users/weyma/Documents/generador/public/images"});
const fs = require('fs');

var cerebro = require('../models/cerebro');

/* GET home page. */
router.get('/', function(req, res, next) {
  cerebro.find().exec(function(error,cerebros){
    if(!error){
      res.render('cerebros/index', { title: 'Express',coleccion: cerebros });
    }
  });
});

router.get('/add',function(req,res,next){
  res.render('cerebros/add_cerebros',{alert:0});
});

/* GET home page. */
router.post('/add', upload.single('picture'),function(req, res) {
  if(req.file) {
    var data = req.body;
    var nuevoCerebro = new cerebro({
        flavor: data.flavor,
        description: data.descripcion,
        iq: data.iq,
        picture: req.file.filename
    });
    nuevoCerebro.save(function(error){
      if(error){
        res.render('cerebros/add_cerebros',{alert:1,tError: error.message});
      }else{
        res.render('cerebros/add_cerebros',{alert:2});
      }
    });
  }else {
    res.render('cerebros/add_cerebros',{alert:1,tError: "se requiere imagen"});
  }
});

router.get('/edit/:id',async function(req,res){
  var editcerebro = await cerebro.findById(req.params.id);
  res.render('cerebros/edit',{ecerebro:editcerebro,alert:0});
});

router.post('/edit/:id',upload.single('picture'),async function(req,res){
  try {
    var data = req.body;
    var editcerebro = await cerebro.findById(req.params.id);
    if(req.file){
      fs.unlink('C:/Users/weyma/Desktop/generador/public/images/'+editcerebro.picture, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
      editcerebro.flavor = data.flavor;
      editcerebro.description = data.descripcion;
      editcerebro.iq = data.iq;
      editcerebro.picture = req.file.filename;
      await editcerebro.save(function(error){
      if(error){
        res.render('cerebros/edit',{ecerebro:editcerebro,alert:1,tError:error});
      }else{
        res.render('cerebros/edit',{ecerebro:editcerebro,alert:2});
      }
    });
    }else if(editcerebro.picture == data.pictureR){
      editcerebro.flavor = data.flavor;
      editcerebro.description = data.descripcion;
      editcerebro.iq = data.iq;
      await editcerebro.save(function(error){
        if(error){
          res.render('cerebros/edit',{ecerebro:editcerebro,alert:1,tError:error});
        }else{
          res.render('cerebros/edit',{ecerebro:editcerebro,alert:2});
        } });
    }else throw 'error';
  } catch (error) {
    res.render('cerebros/edit',{ecerebro:editcerebro,alert:1,tError:error});
  }
});

router.get('/delete/:id', async function(req,res){
  var ecerebro = await cerebro.findById(req.params.id);
  res.render('cerebros/delete',{ecerebro:ecerebro});
});

router.post('/delete/:id',async function(req,res){
  try{
    var dcerebro =await cerebro.findById(req.params.id);
    fs.unlink('C:/Users/weyma/Desktop/generador/public/images/'+dcerebro.picture, (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });
    dcerebro.remove();
    res.redirect('/cerebro');
  }catch(e){
    res.render('cerebros/edit',{ecerebro:editcerebro,alert:1,tError:e});
  }
});

module.exports = router;
