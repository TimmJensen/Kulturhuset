// Forbinder til databasen
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
// Hvad skal vi bruge fra/af databasen
const DBnavn = 'kulturhuset';
const CollectionNavn = 'hoved_menu';

function findMenuer() {
    // console.log("Jeg er inde i getAll funktionen :)");
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                // console.log(err);
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // find alle studenter sorter efter navn
                dbo.collection(CollectionNavn).find().toArray((err, result) => {
                    // console.log("getAll(): ", result);

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
module.exports = { findMenuer }
