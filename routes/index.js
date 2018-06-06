module.exports = function(app) {

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

/* Indlæs forsiden */
app.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("kulturhuset");
        dbo.collection("general_data").findOne({}, function(err, titel) {
            dbo.collection("hoved_menu").find({}).toArray(function(err, menu) {
                if (err) throw err;
                res.render('pages/index', {
                    titel: titel.titel,
                    menu: menu,
                });
                db.close();
            });
            db.close();
        });
    });
});

}; // End of: module.exports
