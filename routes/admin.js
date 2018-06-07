module.exports = function(app) {

    const findTitel = require('../services/titel');
    const findMenuer = require('../services/menu');

    /* Indlæser admin siden */
    app.get('/admin', async (req, res, next) => {
        try {
            titel = await findTitel.getOne();
            menu = await findMenuer.getAll();
            res.render('pages/adminpanel/admin', {
                titel: titel.titel,
                menu: menu,
                besked: ''
            });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    });

    //########################## Opdeler ##################################

    const opdaterTitel = require('../services/titel');

    /* Opdatere titlen på siden */
    app.post('/opdater-titel', async (req, res, next) => {
        try {

            let post = req.body;
            let titelInput = post.titelInput;

            titel = await findTitel.getOne();
            menu = await findMenuer.getAll();

            let gammelTitel = {
                titel: titel.titel,
                logo: titel.logo
            };
            let nyTitel = { $set: {
                titel: titelInput,
                logo: ''
            } };

            nyTitel2 = await opdaterTitel.updateOne(gammelTitel, nyTitel);

            if (nyTitel2.modifiedCount == 0) {
                let besked = "Ser ud til titlen er ens med dit ønske";
                res.render('pages/adminpanel/admin', {
                    titel: titel.titel,
                    menu: menu,
                    besked: besked
                });
            } else if (nyTitel2.modifiedCount == 1) {
                let besked = "Titlen blev gemt og er nu opdateret :)";
                res.render('pages/adminpanel/admin', {
                    titel: titelInput,
                    menu: menu,
                    besked: besked
                });
            } else if (nyTitel2.modifiedCount == undefined || nyTitel2.modifiedCount == null) {
                let besked = `Der skete en fejl, kontakt supporten med koden: ${res.statusCode}`;
                res.render('pages/adminpanel/admin', {
                    titel: titel.titel,
                    menu: menu,
                    besked: besked
                });
            }
        } catch (err) {
            res.send(err);
        }
    });

    //########################## Opdeler ##################################

}; // End of: module.exports
