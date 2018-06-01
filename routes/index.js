const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

module.exports = function (app) {

	/* GET home page. */
	app.get('/', function (req, res, next) {

		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db('kulturhuset');
			let titel;
			dbo.collection('general_data').findOne({}, function (err, data) {
				dbo.collection('hoved_menu').find({}).toArray(function (err, menu) {
					if (err) throw err;
					res.render('pages/index', {
						titel: data.titel,
						menu: menu
					});
					db.close();
				});
				db.close();
			});
		});
	});

}; // End of: module.exports