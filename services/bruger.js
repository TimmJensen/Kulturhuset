// Forbinder til databasen
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
// Hvad skal vi bruge fra/af databasen
const DBnavn = 'kulturhuset';
const CollectionNavn = 'bruger_logind';

function getOne(tjekEmail, tjekBruger) {
    // console.log("getOne(tjekEmail): ", tjekEmail);
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // Sørger efter en specifik email
                dbo.collection(CollectionNavn).find(tjekEmail, tjekBruger).toArray((err, result) => {

                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

//########################## Opdeler ##################################

function insertOne(info) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // Opretter brugeren med indtastede informationer
                dbo.collection(CollectionNavn).insertOne(info, (err, result) => {

                    db.close();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

//########################## Opdeler ##################################

// Her exportere vi navnet på vores funktion så det kan bruges andre steder.
// HUSK!! require denne fil, hvor den skal bruges.
module.exports = {
    getOne,
    insertOne,
}
