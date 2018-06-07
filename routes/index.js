module.exports = function(app) {

    const findTitel = require('../services/titel');
    const findMenuer = require('../services/menu');

    /* Indlæser forsiden */
    app.get('/', async (req, res, next) => {
        try {
            titel = await findTitel.getOne();
            menu = await findMenuer.getAll();
            res.render('pages/index', {
                titel: titel.titel,
                menu: menu
            });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    });

}; // End of: module.exports
