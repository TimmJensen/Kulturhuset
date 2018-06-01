fetch('http://localhost:3000/admin')
.then(function(data) {
   console.log(data);
	snackbar();
});


function snackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}