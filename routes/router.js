module.exports = function (app) {
	require('./index')(app);
	require('./bruger')(app);
	require('./admin')(app);
};
