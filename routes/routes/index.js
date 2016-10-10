var express = require('express');
var router = express.Router();
var ctrlUsuarios = require('../controllers/usuarios');
//var ctrlNoticias = require('../controllers/noticias');

/* Locations pages */
/*router.get('/', ctrlLocations.homelist);*/
router.get('/', function (req, res, next) {
    res.render('index', { title: 'xEventGO' });
});
router.get('/usuarios/registro', ctrlUsuarios.registro);
router.get('/usuarios/login', ctrlUsuarios.login);

/* Other pages */
//router.get('/about', ctrlOthers.about);

module.exports = router;
