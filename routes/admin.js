module.exports = function(app) {

    const findTitel = require('../services/findTitel');
    const findMenuer = require('../services/findMenuer');

    /* Indlæser admin siden */
    app.get('/admin', async (req, res, next) => {
        try {
            titel = await findTitel.findTitel();
            // console.log("finder titlen: ", titel);
            menu = await findMenuer.findMenuer();
            // console.log("finder alle menu punkter: ", menu);
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

    //########################## Side opdeler ##################################

    const opdaterTitel = require('../services/opdaterTitel');

    /* opdatere titlen på siden */
    app.post('/opdater-titel', async (req, res, next) => {
        try {

            let post = req.body;
            let titelInput = post.titelInput;

            // console.log("titelInput: ", titelInput);

            titel = await findTitel.findTitel();
            menu = await findMenuer.findMenuer();

            // console.log("udskriver titlen: ", titel);

            let gammelTitel = {
                titel: titel.titel,
                logo: titel.logo
            };
            let nyTitel = { $set: {
                titel: titelInput,
                logo: ''
            } };

            nyTitel2 = await opdaterTitel.opdaterTitel(gammelTitel, nyTitel);
            // console.log("opdateret titel: ", titelInput);

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
            console.log(err);
            res.send(err);
        }
    });

}; // End of: module.exports
