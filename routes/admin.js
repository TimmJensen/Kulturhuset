const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

module.exports = function (app) {

	/* GET admin siden - Rendere siden. */
	app.get('/admin', function (req, res, next) {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;

			// Databasen som vi henter fra
			const dbo = db.db('kulturhuset');

			// Henter de generalle data til siden
			dbo.collection('general_data').findOne({}, function (err, data) {
				if (err) throw err;
				// Henter alle menupunkter til siden
				dbo.collection('hoved_menu').find({}).toArray(function (err, menu) {
					if (err) throw err;

					// Rendere siden
					res.render('pages/adminpanel/admin', {
						titel: data.titel,
						menu: menu,
						statusCode: ''
					});
					db.close();
				});
				db.close();
			});
		});
	});

	/* POST admin siden - billede upload*/
	app.post('/opdater-billede', function (req, res) { 

	});

	/* POST admin siden - Opdater titel */
	app.post('/opdater-titel', function (req, res) {

		// Fanger alt i "Request" - Body 
		let post = req.body;
		// Ligger value af inputTitel (Input med name=inputTitel), ned i titel.
		let titel = post.titelInput;

		// console.log(post);

		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("kulturhuset");

			dbo.collection('hoved_menu').find({}).toArray(function (err, menu) {
				if (err) throw err;

				dbo.collection("general_data").find({}).toArray(function (err, dbTitel) {

					var gammelTitel = {
						titel: dbTitel[0].titel
					};

					var nyTitel = {
						$set: {
							titel: titel
						}
					};

					dbo.collection("general_data").updateOne(gammelTitel, nyTitel, {
						upsert: false
					}, function (err, respond) {
						if (err) throw err;


						let output = {
							titel: titel,
							menu: menu,
							statusCode: "Succes! titlen blev opdateret!"
						};


						res.status(200).render('pages/adminpanel/admin', output);
						db.close();
					});

				});

			});
		});
	});

}; // End of: module.exports