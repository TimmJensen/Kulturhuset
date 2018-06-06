document.addEventListener('DOMContentLoaded', function () {
	// Sætter sidens titel til den nuværende.
	titel = sideTitel.innerText;
});

// Sidens titel.
let titel;
// Fanger siden's titel i navbar.
let sideTitel = document.querySelector('#sideTitel');
// Fanger Input feltet til ændring af sidens titel.
let titelInput = document.querySelector('#titelInput');
// Fanger knappen til at gemme ændringerne til siden's titel.
let titelKnap = document.querySelector('#titelKnap');

// Lytter på om der er trykket på en tast, inden i inputfeltet.
titelInput.addEventListener('keyup', function () {
	sideTitel.innerText = titelInput.value;
	changeStatus();
});

function changeStatus() {
	if (titelInput.value !== titel && titelInput.value != "") {
		titelKnap.setAttribute('class', 'btn btn-outline-primary');
	} else {
		titelKnap.setAttribute('class', 'btn btn-outline-secondary disabled');
	}
}
