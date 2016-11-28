var express = require('express'); 
var router = express.Router(); 
var ctrlUsuarios = require('../controllers/usuarios');
var ctrlDeportes = require('../controllers/deportes');
var ctrlComentarios = require('../controllers/comentarios');
var ctrlNoticias = require('../controllers/noticias');
var ctrlEventos = require('../controllers/eventos');    

//Usuarios
router.get('/usuarios',                 ctrlUsuarios.usuariosList);
router.post('/usuarios',                ctrlUsuarios.usuariosCreate);
router.get('/usuarios/:usuario_id',     ctrlUsuarios.usuariosRead);
router.put('/usuarios/:usuario_id',     ctrlUsuarios.usuariosUpdate);
router.delete('/usuarios/:usuario_id',  ctrlUsuarios.usuariosDelete);

//Deportes
router.get('/deportes',                 ctrlDeportes.deportesList);
router.post('/deportes',                ctrlDeportes.deportesCreate);
router.get('/deportes/:deporte_id',     ctrlDeportes.deportesRead);
router.put('/deportes/:deporte_id',     ctrlDeportes.deportesUpdate);   
router.delete('/deportes/:deporte_id',  ctrlDeportes.deportesDelete);

//Comentarios
router.get('/comentarios',                      ctrlComentarios.comentariosList);
router.post('/comentarios',                     ctrlComentarios.comentariosCreate);
router.get('/comentarios/:comentario_id',       ctrlComentarios.comentariosRead);
router.put('/comentarios/:comentario_id',       ctrlComentarios.comentariosUpdate);
router.delete('/comentarios/:comentario_id',    ctrlComentarios.comentariosDelete);

//Noticias
router.get('/noticias',                   ctrlNoticias.noticiasList);
router.post('/noticias',                  ctrlNoticias.noticiasCreate);
router.get('/noticias/:noticia_id',       ctrlNoticias.noticiasRead);
router.put('/noticias/:noticia_id',       ctrlNoticias.noticiasUpdate);
router.delete('/noticias/:noticia_id',    ctrlNoticias.noticiasDelete);

//Eventos
router.get('/eventos',                  ctrlEventos.eventosList);
router.post('/eventos',                 ctrlEventos.eventosCreate);
router.get('/eventos/:evento_id',       ctrlEventos.eventosRead);
router.put('/eventos/:evento_id',       ctrlEventos.eventosUpdate);
router.delete('/eventos/:evento_id',    ctrlEventos.eventosDelete);

module.exports = router;