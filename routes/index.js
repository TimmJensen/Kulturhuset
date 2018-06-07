module.exports = function(app) {

    const findTitel = require('../services/findTitel');
    const findMenuer = require('../services/findMenuer');

    /* Indlæs forsiden */
    app.get('/', async (req, res, next) => {
        try {
            titel = await findTitel.findTitel();
            // console.log("finder titlen: ", titel);
            menu = await findMenuer.findMenuer();
            // console.log("finder alle menu punkter: ", menu);
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
