module.exports = function(app) {

    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/";

    /* Indlæser admin siden */
    app.get('/admin', function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db("kulturhuset");
            dbo.collection("general_data").findOne({}, function(err, titel) {
                dbo.collection("hoved_menu").find({}).toArray(function(err, menu) {
                    if (err) throw err;
                    res.render('pages/adminpanel/admin', {
                        titel: titel.titel,
                        menu: menu,
                        besked: ''
                    });
                    db.close();
                });
                db.close();
            });
        });
    });

    //########################## Side opdeler ##################################

    /* opdatere titlen på siden */
    app.post('/opdater-titel', function(req, res, next) {
        // console.log(req.body.titel);

        let post = req.body;
        let titel = post.titelInput;

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("kulturhuset");
            // Her henter vi alle dataer fra databasen og ligger ned i en variabel (resultat)
            dbo.collection("general_data").find({}).toArray(function(err, titelNu) {
                // console.log(resultat[0].titel);
                // For at kunne opdatere, skal man bruge den nuværende data fra databasen
                // og erstatte med den nye data man ønsker i stedet
                let gammelTitel = {
                    titel: titelNu[0].titel,
                    logo: titelNu[0].logo
                };
                let nyTitel = { $set: {
                    titel: titel,
                    logo: ''
                } };
                // Her opdatere vi den gamle data med den nye i databasen
                dbo.collection("general_data").updateOne(gammelTitel, nyTitel, function(err, resultat) {
                    dbo.collection("hoved_menu").find({}).toArray(function(err, menu) {

                        console.log(resultat);

                        if (err) throw err;
                        // Vi laver en simpel validering her for at se om brugerens indtastninger er gået korrekt
                        // igennem til databasen, og udskriver derefter følgende resultat til brugeren på siden
                        if (res.statusCode == 404 || res.statusCode == 500) {
                            // TODO: Her beder vi brugeren om at kontakte supporten.
                            console.log("Du fik en", res.statusCode, "fejl");
                            let besked = "Der opstod en fejl, kontakt vores support for udbedring af fejlen.";
                            res.render('pages/adminpanel/admin', {
                                titel: resultat.titel,
                                menu: menu,
                                besked: besked
                            });
                        } else if (res.statusCode == 302 || res.statusCode == 304) {
                            // TODO: Her udskriver vi at der skete en fejl til brugeren.
                            console.log("Du fik en", res.statusCode, "fejl");
                            let besked = "Titlen blev ikke gemt, prøv igen!";
                            res.render('pages/adminpanel/admin', {
                                titel: resultat.titel,
                                menu: menu,
                                besked: besked
                            });
                        } else if (res.statusCode == 200) {
                            console.log("resultatet er: ", resultat);

                            // TODO: Her udskriver vi en besked til brugeren om success.
                            console.log("Grønt lys:", res.statusCode);
                            let besked = "Titlen blev gemt og er nu opdateret :)";
                            res.render('pages/adminpanel/admin', {
                                titel: titel,
                                menu: menu,
                                besked: besked
                            });
                        }
                        db.close();
                    });
                    db.close();
                });
            });
        });
    });

}; // End of: module.exports
