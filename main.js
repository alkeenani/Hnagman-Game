//? DOM Elements Selection
const latters = document.querySelector(".latters");
const CategorieSpan = document.querySelector(".Categorie");
let WorngAttempts = 0;
const thedraw = document.querySelector(".Hangman-draw");

//? Generate Letter Buttons Using charCode
for (let i = 65; i <= 90; i++) {
  const letter = document.createElement("button");
  letter.textContent = String.fromCharCode(i);
  letter.classList.add(`letter-box`);
  latters.appendChild(letter);
}

//? Words Object With Categories
const words = {
  programming: [
    "JAVASCRIPT",
    "PYTHON",
    "DATABASE",
    "FUNCTION",
    "VARIABLE",
    "ALGORITHM",
    "COMPUTER",
    "NETWORK",
    "HTML",
    "CSS",
    "GITHUB",
    "PROGRAMMING",
  ],

  animals: [
    "ELEPHANT",
    "GIRAFFE",
    "KANGAROO",
    "DOLPHIN",
    "TIGER",
    "LION",
    "MONKEY",
    "PENGUIN",
    "POLAR BEAR",
    "SEA TURTLE",
    "WILD HORSE",
    "BLUE WHALE",
  ],

  countries: [
    "EGYPT",
    "FRANCE",
    "GERMANY",
    "CANADA",
    "BRAZIL",
    "JAPAN",
    "MEXICO",
    "TURKEY",
    "SOUTH KOREA",
    "UNITED STATES",
    "UNITED KINGDOM",
    "SAUDI ARABIA",
  ],

  sports: [
    "FOOTBALL",
    "BASKETBALL",
    "TENNIS",
    "CRICKET",
    "BOXING",
    "SWIMMING",
    "VOLLEYBALL",
    "BASEBALL",
    "TABLE TENNIS",
    "ICE HOCKEY",
    "FORMULA ONE",
    "HORSE RACING",
  ],

  food: [
    "PIZZA",
    "BURGER",
    "CHICKEN",
    "SANDWICH",
    "PANCAKE",
    "SPAGHETTI",
    "CHEESE",
    "CHOCOLATE",
    "ICE CREAM",
    "FRENCH FRIES",
    "HOT DOG",
    "CHICKEN NUGGETS",
  ],

  movies: [
    "AVATAR",
    "TITANIC",
    "GLADIATOR",
    "INCEPTION",
    "JOKER",
    "FROZEN",
    "BATMAN",
    "IRON MAN",
    "SPIDER MAN",
    "HARRY POTTER",
    "THE DARK KNIGHT",
    "THE GODFATHER",
  ],

  technology: [
    "MOBILE",
    "LAPTOP",
    "KEYBOARD",
    "MONITOR",
    "INTERNET",
    "ROBOT",
    "CAMERA",
    "PRINTER",
    "SMART WATCH",
    "VIDEO GAME",
    "ARTIFICIAL INTELLIGENCE",
    "VIRTUAL REALITY",
  ],

  names: [
    "MOHAMED",
    "AHMED",
    "OMAR",
    "YOUSEF",
    "ALI",
    "KHALED",
    "HASSAN",
    "IBRAHIM",
    "JOHN",
    "MICHAEL",
    "DAVID",
    "JAMES",
  ],

  famous_people: [
    "ELON MUSK",
    "BILL GATES",
    "STEVE JOBS",
    "MARK ZUCKERBERG",
    "CRISTIANO RONALDO",
    "LIONEL MESSI",
    "MICHAEL JORDAN",
    "LEBRON JAMES",
    "TOM CRUISE",
    "JACKIE CHAN",
    "WILL SMITH",
    "MR BEAST",
  ],

  places: [
    "NEW YORK",
    "LOS ANGELES",
    "LONDON",
    "PARIS",
    "TOKYO",
    "DUBAI",
    "CAIRO",
    "NEW YORK CITY",
    "LAS VEGAS",
    "DISNEY LAND",
    "EIFFEL TOWER",
    "GREAT WALL",
  ],

  characters: [
    "SUPERMAN",
    "BATMAN",
    "SPIDER MAN",
    "IRON MAN",
    "HULK",
    "THOR",
    "HARRY POTTER",
    "HERMIONE",
    "SHREK",
    "MICKEY MOUSE",
    "DONALD DUCK",
    "SPONGEBOB",
  ],
};

//? Generate Random Word From Random Category
let Categorie = Object.keys(words);
let wordCategorie = Categorie[Math.floor(Math.random() * Categorie.length)];
CategorieSpan.textContent = wordCategorie;
let wordToGuess =
  words[wordCategorie][
    [Math.floor(Math.random() * words[wordCategorie].length)]
  ];

//? Generate Input Field Spans For Each Letter
const inputFeild = document.querySelector(".input-feild");

for (let i = 0; i < wordToGuess.length; i++) {
  let input = document.createElement("span");
  if (wordToGuess[i] === " ") {
    input.classList.add("with-space");
  }
  inputFeild.appendChild(input);
  input.maxLength = 1;
}

//? Click Event Listener For Letter Buttons
const spans = document.querySelectorAll(".input-feild span");
//? New Game Button
const newGamebtn = document.querySelector(".newGame");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("letter-box")) {
    let theStatus = false;
    e.target.classList.add("checked");

    const clickWord = e.target.textContent;

    //? Check If Letter Exists In The Word
    Array.from(wordToGuess).forEach((wordRandom, wordIndex) => {
      if (clickWord === wordRandom) {
        spans[wordIndex].textContent = clickWord;
        theStatus = true;
      }
    });
    const isWin = Array.from(spans).every((span) => {
      return span.classList.contains("with-space") || span.textContent !== "";
    });

    //? Handle Wrong Attempt

    if (theStatus !== true) {
      WorngAttempts++;
      thedraw.classList.add(`worng-${WorngAttempts}`);
      document.getElementById("fail").currentTime = 0;
      document.getElementById("fail").play();
      if (WorngAttempts == 8) {
        latters.classList.add("finished");
        document.getElementById("gameOver").currentTime = 0;
        document.getElementById("gameOver").play();
        endGamepop(
          "Game Over ",
          "The Word Is",
          wordToGuess[0] + wordToGuess.slice(1).toLowerCase(),
        );
        newGamebtn.style.display = "block";

        NewGame();
      }
    } else {
      //? Handle Correct Attempt
      document.getElementById("success").currentTime = 0;
      document.getElementById("success").play();
    }
    if (isWin) {
      if (WorngAttempts === 0) {
        endGamepop("GG! You won! 🔥 Your level is Legendary");
      } else if (WorngAttempts <= 2) {
        endGamepop("Congratulations! You won! 🏆 Your level is Master");
      } else if (WorngAttempts <= 4) {
        endGamepop("Well played! 👏 Your level is Expert");
      } else if (WorngAttempts <= 6) {
        endGamepop("Good job! 😎 Your level is Pro");
      } else {
        endGamepop("You won! 💪 Your level is Beginner");
      }
      document.getElementById("Win").currentTime = 0;
      document.getElementById("Win").play();
      newGamebtn.style.display = "block";
      NewGame();
    }
  }
});

if (WorngAttempts === 8) {
}

//? Funcatin New Game
function NewGame() {
  newGamebtn.addEventListener("click", () => window.location.reload());
}
//? End Game Popup Function
function endGamepop(title, message, word) {
  const containerPopUp = document.createElement("div");
  const WordSpan = document.createElement("span");
  const closeBtn = document.createElement("button");
  const overlay = document.createElement("div");
  const heading = document.createElement("h2");
  const description = document.createElement("p");
  containerPopUp.classList.add("containerPopUp");
  overlay.classList.add("overlay");
  heading.classList.add("heading");
  description.classList.add("description");
  closeBtn.classList.add("closeBtn");
  WordSpan.classList.add("targetWord");
  heading.textContent = title;
  description.textContent = message;
  WordSpan.textContent = word;
  closeBtn.innerHTML = "&times;";

  //? Append Elements To Body
  document.body.append(overlay, containerPopUp);
  containerPopUp.append(heading, description, closeBtn, WordSpan);

  //? Animate Popup Open
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    containerPopUp.style.opacity = "1";
    containerPopUp.style.transform = "translate(-50%, -50%) scale(1)";
  });

  //? Close Popup Function
  function closePopup() {
    overlay.style.opacity = "0";
    containerPopUp.style.opacity = "0";
    containerPopUp.style.transform = "translate(-50%, -50%) scale(.8)";

    //? Remove Elements After Animation
    setTimeout(() => {
      overlay.remove();
      containerPopUp.remove();
    }, 350);
  }

  //? Close Popup Event Listeners
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);
}
