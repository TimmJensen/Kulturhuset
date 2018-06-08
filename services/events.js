// Forbinder til databasen
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
// Hvad skal vi bruge fra/af databasen
const DBnavn = 'kulturhuset';
const CollectionNavn = 'event_arrangementer';

function getAll() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let dbo = db.db(DBnavn);
                // find alle studenter sorter efter navn
                dbo.collection(CollectionNavn).find().toArray((err, result) => {

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
    getAll,
}
