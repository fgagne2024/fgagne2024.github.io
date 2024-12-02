const cards = document.querySelectorAll('.memory-card');
let commencer = false;
let nbCarteTourne = 0;
let nbCarteDecouvert = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    nbCarteTourne++;
    console.log(nbCarteTourne);
    AfficherScore();
    if(!commencer){
      setInterval(Temps, 1000);
      commencer=true;
    }
    
    return;
  }

  // second click
  secondCard = this;
  nbCarteTourne++;
  console.log(nbCarteTourne);
  AfficherScore();
  
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  nbCarteDecouvert++;
  console.log("carte"+nbCarteDecouvert);
  VerifierTermine();

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));




//************************************************ */
const bouttonFermer = document.getElementById("fermerDialog");
const nePlusAfficher = document.getElementById("nePlusAfficher");
const finPartie = document.getElementById("finDePartie");
let termine = false;

/**
 * au demarrage il montre la fenetre si le stockage 
 * ne lui dit pas le contraire 
 */
window.onload = function(){
  
  if(localStorage.getItem('plusAfficher') != 'true'){
    let dialog =document.getElementById("dialog");
    dialog.showModal();  
  }
  
}

//ferme le dialogue quand le bouton est clique
bouttonFermer.addEventListener("click", () => {
  dialog.close();
});


nePlusAfficher.addEventListener("click", PlusAfficher);

/**
 * ferme le dialogue et prend en memoire qu'il ne veux plus afficher
 */
function PlusAfficher(){
  localStorage.setItem('plusAfficher', 'true');
  dialog.close();
}

/**
 * supprime le stockage local
 */
function EffacerStockage(){
  localStorage.clear();
  window.location.reload();
}


const message = document.getElementById("message");
/**
 * si il a trouver les 6 duo de carte il affiche le score
 * et montre le dialogue de fin de partie
 */
function VerifierTermine(){
  if(nbCarteDecouvert>=6){

    if(localStorage.getItem('record')>nbCarteTourne){

      localStorage.setItem('record', nbCarteTourne);
      message.style.display = "block"

    } 
    else{

      message.style.display = "none"
    }   
    
    AfficherScore();
    finPartie.showModal();
    termine = true;


  }
}

/**
 * Reactualise la page
 */
function Recommencer(){
  window.location.reload();
}


const point = document.getElementById("point");
const pointCompteur = document.getElementById("carteCompteur");
const tempsCompteur = document.getElementById("TempsCompteur");
const recordCompteur = document.getElementById("recordCompteur");
const recordFinPartie = document.getElementById("record");
recordCompteur.innerText ="Record : "+localStorage.getItem('record');

/**
 * affiche les valeurs des variables dans le html 
 */
function AfficherScore(){
  point.innerText = nbCarteTourne;
  pointCompteur.innerText = "Carte tournée : " + nbCarteTourne;
  recordFinPartie.innerText = localStorage.getItem('record');
}


let temps = 0;
let minutes = 0;
let secondes = 0;



/**
 * Calcule le temps et et l'affiche a l'ecran
 * @returns bloque la fonction pour que le temps arrete
 */
function Temps(){
  if(termine){
    return;
  }
  temps++;
  minutes = parseInt(temps/ 60, 10);
  secondes = parseInt(temps % 60,10);
  tempsCompteur.innerText = "Temps : "+minutes+":"+secondes;

}

//cree un stockage local pour le record si il n'existe pas deja 
if(localStorage.getItem('record')===null){
 localStorage.setItem('record', 100);
}
