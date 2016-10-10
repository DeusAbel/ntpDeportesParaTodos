module.exports.login = function(req, res) {
    res.render('login', {
        title: 'xEventGo',
        pageHeader: {
            title: 'xEventGo',
            strapline: 'Organice u encuentre eventos'
        },
        sidebar: "Ingreso"
    });
};

/* GET 'Register user' page */
module.exports.about = function(req, res) {
    res.render('about', {
        title: 'Registro de nuevo Usuario',
        pageHeader: {
            title: 'about'
        },
        sidebar: {
            context: 'Por favor llene todo el formulario',
            //callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        }        
    });
};