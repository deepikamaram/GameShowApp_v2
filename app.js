const qwerty = document.getElementById("qwerty");
const phraseElement = document.getElementById("phrase");
const overlay = document.querySelector("#overlay");
const btnReset = document.querySelector(".btn__reset");
let missed = 0;

btnReset.addEventListener("click", () => {
  if (btnReset.textContent === "Start Game") {
    overlay.style.display = "none";
  }
  if (
    btnReset.textContent === "Play Again" ||
    btnReset.textContent === "Retry"
  ) {
    overlay.classList.remove("win");
    btnReset.classList.remove("win-a");
    overlay.classList.remove("lose");
    btnReset.classList.remove("lose-a");
    document.querySelector("h2").textContent = "Wheel of Success";
    btnReset.textContent = "Start Game";
    missed = 0;
  }
});

const phrases = [
  "test",
  "a drop in the ocean",
  "never give up",
  "and still i rise",
  "believe in yourself",
  "never look back",
];

function getRandomPhraseAsArray(arr) {
  const ranNum = Math.floor(Math.random() * arr.length);
  return arr[ranNum].split("");
}

const randomPhrase = getRandomPhraseAsArray(phrases);

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

  if (showLen === phraseHolLen && missed < 5) {
    overlay.style.display = "flex";
    overlay.classList.add("win");
    btnReset.classList.add("win-a");
    btnReset.textContent = "Play Again";
    document.querySelector("h2").textContent = "You Won!";
    // const p = document.createElement("p");
    // p.textContent = "Yuppie you win!";
    // overlay.appendChild(p);
  } else if (missed === 5) {
    overlay.style.display = "flex";
    overlay.classList.add("lose");
    btnReset.classList.add("lose-a");
    btnReset.textContent = "Retry";
    document.querySelector("h2").textContent = "You Lost!";
    // const p = document.createElement("p");
    // p.textContent = "Oops You lost!";
    // overlay.appendChild(p);
  }
}

window.addEventListener("keypress", (e) => {
  const userKey = e.key;
  const letter = checkLetter(userKey);

  if (!letter) {
    missed++;
    const hearts = document.querySelectorAll(".tries img");
    hearts[missed - 1].src = "images/lostHeart.png";
  }

  const btns = document.getElementsByTagName("button");
  for (let i = 0; i < btns.length; i++) {
    const key = btns[i];

    if (letter === key.textContent) {
      key.className = "correct";
      key.disabled = true;
    } else if (userKey === key.textContent) {
      key.className = "wrong";
      key.disabled = true;
    }
  }

  checkWin();
});
