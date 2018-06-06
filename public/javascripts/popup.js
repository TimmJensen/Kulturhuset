document.addEventListener('DOMContentLoaded', function() {
    if (besked.innerHTML != "" && besked.innerHTML != undefined) {
        popup();
    } else {
        // console.log("popup er tom!");
    }
    // console.log("Besked: ", besked.innerHTML);
});

let besked = document.querySelector('#popup');

function popup() {
    besked.className = "show";
    setTimeout(function(){ sletIndhold(); besked.className = besked.className.replace("show", ""); }, 3000);
}

function sletIndhold() {
    besked.innerHTML = "";
    // console.log("Slet besked: ", besked.innerHTML);
};
