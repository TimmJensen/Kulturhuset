module.exports = function (app) {
	require('./index')(app);
	require('./admin')(app);
};
