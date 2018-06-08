module.exports = function(app) {

    const findTitel = require('../services/titel');
    const findMenuer = require('../services/menu');
	const events = require('../services/events');

    /* Indlæser forsiden */
    app.get('/', async (req, res, next) => {
        try {
            titel = await findTitel.getOne();
			menu = await findMenuer.getAll();

            arrangementer = await events.getAll('event_arrangementer');
			kategorier = await events.getAll('event_kategorier');

            res.render('pages/index', {
                titel: titel.titel,
				menu: menu,
				arrangementer: arrangementer,
                kategorier: kategorier
            });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    });

}; // End of: module.exports
