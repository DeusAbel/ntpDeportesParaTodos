var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NTP DEPORTE PARA TODOS' });
});

var ctrlUsuarios = require('../controllers/usuarios');
router.get('/usuarios/about', ctrlUsuarios.about);
router.get('/usuarios/login', ctrlUsuarios.login);

/*
router.get('/', function(req, res, next) {
  res.render('about', { title: 'NAcerca de nosotros' });
});
*/
 /*
 var handlebars = require('handlebars'),
  fs = require('fs');

var data = {
  title: 'NTP DEPORTE PARA TODOS',
  author: 'Ntp',
  tags: ['express', 'node', 'javascript']
}
data.body = process.argv[2];

fs.readFile('login.jade', 'utf-8', function(error, source){
  handlebars.registerHelper('custom_title', function(title){
    var words = title.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 4) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);  
      }
    }
    title = words.join(' ');
    return title;
  })
  var template = handlebars.compile(source);
  var html = template(data);
  console.log(html)
});
 */

 

module.exports = router;
