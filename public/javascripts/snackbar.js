fetch('http://localhost:3000/opdater-titel')
	.then(function (data) {
		console.log(data);
		
	});


function snackbar() {
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);
}