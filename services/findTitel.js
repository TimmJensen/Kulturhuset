// Forbinder til databasen
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
// Hvad skal vi bruge fra/af databasen
const DBnavn = 'kulturhuset';
const CollectionNavn = 'general_data';

function findTitel() {
    // console.log("Jeg er inde i getOne funktionen :)");
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                // console.log(err);
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // find titel på hjemmesiden
                dbo.collection(CollectionNavn).findOne({}, (err, result) => {
                    // console.log("getOne(): ", result);
                    db.close();
                    if (err) {
                        // console.log(err);
                        reject(err);
                    } else {
                        // console.log(result);
                        resolve(result);
                    }
                });
            }
        });
    });
}

// Her exportere vi navnet på vores funktion så det kan bruges andre steder.
// HUSK!! require denne fil, hvor den skal bruges.
module.exports = { findTitel }
