// Forbinder til databasen
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
// Hvad skal vi bruge fra/af databasen
const DBnavn = 'kulturhuset';
const CollectionNavn = 'general_data';

function getOne() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // find titel på hjemmesiden
                dbo.collection(CollectionNavn).findOne({}, (err, result) => {
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

function updateOne(gammelTitel, nyTitel) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // opdaterer titlen på hjemmesiden
                dbo.collection(CollectionNavn).updateOne(gammelTitel, nyTitel, {upsert:true}, (err, result) => {
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

//########################## Side opdeler ##################################

// Her exportere vi navnet på vores funktion så det kan bruges andre steder.
// HUSK!! require denne fil, hvor den skal bruges.
module.exports = {
    getOne,
    updateOne,
}
