let visMenuKnap = document.querySelector('#visMenuKnap');
let gemMenuKnap = document.querySelector('#gemMenuKnap');
let menuRamme = document.querySelector('#menuPanelet');

visMenuKnap.addEventListener('click', visMenuRammen);
gemMenuKnap.addEventListener('click', gemMenuRammen);

function visMenuRammen() {
    visMenuKnap.style.display = 'none';
    menuRamme.className = 'show';
    gemMenuKnap.style.display = 'block';
};

function gemMenuRammen() {
    gemMenuKnap.style.display = 'none';
    menuRamme.className = 'hide';
    visMenuKnap.style.display = 'block';
};
