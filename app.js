const qwerty = document.getElementById("qwerty");
const phraseElement = document.getElementById("phrase");
const keyboardButtons = document.querySelector(".keyrow").children;
let missed = 0;

document.querySelector(".btn__reset").addEventListener("click", () => {
  document.querySelector("#overlay").style.display = "none";
});

const phrases = [
  "test",
  // "test",
  // "a drop in the ocean",
  // "never give up",
  // "and still i rise",
  // "believe in yourself",
  // "never look back",
];

function getRandomPhraseAsArray(arr) {
  const ranNum = Math.floor(Math.random() * arr.length);
  return arr[ranNum].split("");
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");

    li.textContent = arr[i];
    arr[i] === " "
      ? (li.className = "phrase-word-gap")
      : (li.className = "phrase-holder");

    phraseElement.appendChild(li);
  }
}

const randomPhrase = getRandomPhraseAsArray(phrases);
console.log(randomPhrase);
addPhraseToDisplay(randomPhrase);

function checkLetter(button) {
  const letters = document.querySelectorAll(".phrase-holder");
  let letterFound;
  for (let i = 0; i < letters.length; i++) {
    const curr = letters[i].textContent;

    if (curr === button) {
      letters[i].classList.add("show");
      letterFound = curr;
    }
  }
  return letterFound;
}

function checkWin() {
  const showLen = document.querySelectorAll(".show").length;
  const phraseHolLen = document.querySelectorAll(".phrase-holder").length;

  if (showLen === phraseHolLen && missed <= 5) {
    document.querySelector("#overlay").style.display = "flex";
    document.querySelector("#overlay").classList.add("win");
    document.querySelector(".btn__reset").classList.add("win-a");
    document.querySelector(".btn__reset").textContent = "Re-match";
    const p = document.createElement("p");
    p.textContent = "Yuppie you win!";
    document.querySelector("#overlay").appendChild(p);
  } else if (missed === 5) {
    document.querySelector("#overlay").style.display = "flex";
    document.querySelector("#overlay").classList.add("lose");
    document.querySelector(".btn__reset").classList.add("lose-a");
    document.querySelector(".btn__reset").textContent = "Retry";
    const p = document.createElement("p");
    p.textContent = "Oops You lost!";
    document.querySelector("#overlay").appendChild(p);
  }
}

qwerty.addEventListener("keydown", (e) => {
  const userKey = e.target.textContent;
  e.target.disabled = true;
  const letter = checkLetter(userKey);
  if (letter) {
    e.target.className = "correct";
  } else {
    e.target.className = "choosen";
    missed++;
    console.log(missed);
    const hearts = document.querySelectorAll(".tries img");
    hearts[missed - 1].src = "images/lostHeart.png";
    console.log(hearts[missed - 1]);
  }

  checkWin();
});
