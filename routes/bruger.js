module.exports = function(app) {

    const findTitel = require('../services/titel');
    const findMenuer = require('../services/menu');
	const events = require('../services/events');
    const nyBruger = require('../services/bruger');

    /* Indlæser log ind siden */
    app.get('/logind', async (req, res, next) => {
        try {
            titel = await findTitel.getOne();
            menu = await findMenuer.getAll();
            kategorier = await events.getAll('event_kategorier');
            res.render('pages/logind', {
                titel: titel.titel,
                menu: menu,
                kategorier: kategorier,
                besked: ''
            });
        } catch (err) {
            res.send(err);
        }
    });

    //########################## Opdeler ##################################

    /* Logger brugeren ind */
    app.post('/log-ind', async (req, res, next) => {
        try {
            titel = await findTitel.getOne();
            menu = await findMenuer.getAll();
            kategorier = await events.getAll('event_kategorier');

            let post = req.body;
            let tjekBruger = { email: post.email, adgangskode: post.adgangskode };

            findesBruger = await nyBruger.getOne(tjekBruger);
            if (findesBruger.length) {
                besked = "Du er logget ind :)";
                res.render('pages/adminpanel/admin', {
                    titel: titel.titel,
                    menu: menu,
                    kategorier: kategorier,
                    besked: besked
                });
            } else {
                besked = "Log ind fejlede, tjek dine oplysninger og prøv igen!";
                res.render('pages/logind', {
                    titel: titel.titel,
                    menu: menu,
                    kategorier: kategorier,
                    besked: besked
                });
            }
        } catch (err) {
            res.send(err);
        }
    });

    //########################## Opdeler ##################################

    /* Opretter ny profil */
    app.post('/opret-profil', async (req, res, next) => {
        try {
            titel = await findTitel.getOne();
            menu = await findMenuer.getAll();
            kategorier = await events.getAll('event_kategorier');

            let post = req.body;
            let tjekEmail = { email: post.email };
            let info = { email: post.email, adgangskode: post.adgangskode, oprettet: new Date() };

            findesBruger = await nyBruger.getOne(tjekEmail);
            if (findesBruger.length) {
                besked = "Email allerede i brug!";
                res.render('pages/logind', {
                    titel: titel.titel,
                    menu: menu,
                    kategorier: kategorier,
                    besked: besked
                });
            } else {
                info = await nyBruger.insertOne(info);
                besked = "Du er nu oprettet og kan logge ind :)";
                res.render('pages/logind', {
                    titel: titel.titel,
                    menu: menu,
                    kategorier: kategorier,
                    besked: besked
                });
            }
        } catch (err) {
            res.send(err);
        }
    });

    //########################## Opdeler ##################################

}; // End of: module.exports
