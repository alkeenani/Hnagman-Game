//? DOM Elements Selection
const latters = document.querySelector(".latters");
const CategorieSpan = document.querySelector(".Categorie");
let wrongAttempts = 0;
const thedraw = document.querySelector(".Hangman-draw");
const RateWin = document.querySelector(".RateWin");
const RateLose = document.querySelector(".RateLose");
let lose = 0;
let win = 0;
let winLocal = Number(localStorage.getItem("Rate Win")) || 0;
let loseLocal = Number(localStorage.getItem("Rate Lose")) || 0;
RateWin.textContent = winLocal;
RateLose.textContent = loseLocal;
const imageInput = document.querySelector("#imageInput");
const preview = document.querySelector("#preview");

document.querySelector(".imge").addEventListener("click", (e) => {
  if (e.target === imageInput) return;
  imageInput.click();
});

const savedImage = localStorage.getItem("Imge Profile");

if (savedImage) {
  preview.src = savedImage;
}

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      preview.src = reader.result;

      localStorage.setItem("Imge Profile", reader.result);
    };

    reader.readAsDataURL(file);
  }
});
//? Generate Letter Buttons (A - Z)
function generateLetters() {
  for (let i = 65; i <= 90; i++) {
    const letter = document.createElement("button");

    letter.textContent = String.fromCharCode(i);

    letter.classList.add(`letter-box`);

    latters.appendChild(letter);
  }
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
  jobs: [
    "TEACHER",
    "ENGINEER",
    "DOCTOR",
    "LAWYER",
    "PILOT",
    "CHEF",
    "FARMER",
    "DENTIST",
    "NURSE",
    "POLICE OFFICER",
    "ARCHITECT",
    "DESIGNER",
    "PROGRAMMER",
    "PHOTOGRAPHER",
    "JOURNALIST",
  ],

  vehicles: [
    "CAR",
    "BUS",
    "TRAIN",
    "AIRPLANE",
    "HELICOPTER",
    "MOTORCYCLE",
    "BICYCLE",
    "TRUCK",
    "SHIP",
    "BOAT",
    "SUBMARINE",
    "TRACTOR",
    "AMBULANCE",
    "FIRE TRUCK",
    "TAXI",
  ],

  nature: [
    "MOUNTAIN",
    "RIVER",
    "OCEAN",
    "FOREST",
    "DESERT",
    "WATERFALL",
    "VOLCANO",
    "ISLAND",
    "VALLEY",
    "CLOUD",
    "RAINBOW",
    "SUNSET",
    "THUNDER",
    "FLOWER",
    "TREE",
  ],

  games: [
    "MINECRAFT",
    "FORTNITE",
    "VALORANT",
    "TETRIS",
    "FIFA",
    "PUBG",
    "ROBLOX",
    "OVERWATCH",
    "PORTAL",
    "HALO",
    "DOOM",
    "SKYRIM",
    "GTA",
    "PAC MAN",
    "SONIC",
  ],

  space: [
    "PLANET",
    "GALAXY",
    "STAR",
    "MOON",
    "SUN",
    "ASTEROID",
    "COMET",
    "ROCKET",
    "SATELLITE",
    "ASTRONAUT",
    "UNIVERSE",
    "BLACK HOLE",
    "SPACE SHIP",
    "METEOR",
    "NEBULA",
  ],
};

let wordToGuess;

//? Generate Random Word From Random Category
function generateRandomWord() {
  let Categorie = Object.keys(words);

  let wordCategorie = Categorie[Math.floor(Math.random() * Categorie.length)];

  CategorieSpan.textContent = wordCategorie;

  wordToGuess =
    words[wordCategorie][
      Math.floor(Math.random() * words[wordCategorie].length)
    ];

  console.log(wordToGuess);
}

//? Generate Word Boxes
function generateWordSpans() {
  const inputFeild = document.querySelector(".input-feild");

  inputFeild.innerHTML = "";

  for (let i = 0; i < wordToGuess.length; i++) {
    let input = document.createElement("span");

    if (wordToGuess[i] === " ") {
      input.classList.add("with-space");
    }

    inputFeild.appendChild(input);
  }
}

//? New Game Button
const newGamebtn = document.querySelector(".newGame");
let theStatus = false;

//? Check Letter On Click
function checkLetter() {
  document.addEventListener("click", (e) => {
    const spans = document.querySelectorAll(".input-feild span");

    if (e.target.classList.contains("letter-box")) {
      e.target.classList.add("checked");

      theStatus = false;

      const clickWord = e.target.textContent;

      //? Check If Letter Exists In The Word
      Array.from(wordToGuess).forEach((wordRandom, wordIndex) => {
        if (clickWord === wordRandom) {
          spans[wordIndex].textContent = clickWord;

          theStatus = true;
        }
      });

      //? Handle wrong attempts and check for game over
      const gameOver = HandleWrong();

      if (gameOver) return;

      //? Handle Win
      HandleWin();
    }
  });
}

//? Handle Wrong And Correct Attempts
function HandleWrong() {
  if (theStatus !== true) {
    wrongAttempts++;

    thedraw.classList.add(`wrong-${wrongAttempts}`);

    document.getElementById("fail").currentTime = 0;
    document.getElementById("fail").play();

    if (wrongAttempts === 8) {
      latters.classList.add("finished");
      document.getElementById("gameOver").currentTime = 0;
      document.getElementById("gameOver").play();

      endGamepop(
        "Game Over ",
        "The Word Is",
        wordToGuess[0] + wordToGuess.slice(1).toLowerCase(),
      );
      // console.log(lose);
      loseLocal++;
      localStorage.setItem("Rate Lose", loseLocal);

      RateLose.textContent = loseLocal;

      newGamebtn.classList.add("show");

      return true;
    }
  } else {
    //? Handle Correct Attempt
    document.getElementById("success").currentTime = 0;
    document.getElementById("success").play();
  }

  return false;
}

//? Handle Win
function HandleWin() {
  const spans = document.querySelectorAll(".input-feild span");

  const isWin = Array.from(spans).every((span) => {
    return span.classList.contains("with-space") || span.textContent !== "";
  });

  if (isWin) {
    latters.classList.add("finished");
    winLocal++;
    localStorage.setItem("Rate Win", winLocal);

    RateWin.textContent = winLocal;

    if (wrongAttempts === 0) {
      endGamepop("GG!", "You won! 🔥 Your level is Legendary", "");
    } else if (wrongAttempts <= 2) {
      endGamepop("Congratulations!", "You won! 🏆 Your level is Master", "");
    } else if (wrongAttempts <= 4) {
      endGamepop("Well played!", "👏 Your level is Expert", "");
    } else if (wrongAttempts <= 6) {
      endGamepop("Good job!", "😎 Your level is Pro", "");
    } else {
      endGamepop("You won!", "💪 Your level is Beginner", "");
    }

    document.getElementById("Win").currentTime = 0;
    document.getElementById("Win").play();

    newGamebtn.classList.add("show");
  }
}

//? Start A New Game
newGamebtn.addEventListener("click", () => {
  latters.classList.remove("finished");

  document.querySelectorAll(".latters .letter-box").forEach((el) => {
    if (el.classList.contains("checked")) {
      el.classList.remove("checked");
    }
  });

  for (let i = 1; i <= 8; i++) {
    thedraw.classList.remove(`wrong-${i}`);
  }

  wrongAttempts = 0;
  theStatus = false;

  generateRandomWord();

  generateWordSpans();

  newGamebtn.classList.remove("show");
});

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
    overlay.classList.add("is-visible");
    containerPopUp.classList.add("is-open");
  });

  //? Close Popup Function
  function closePopup() {
    overlay.classList.remove("is-visible");
    containerPopUp.classList.add("is-closed");

    setTimeout(() => {
      overlay.remove();
      containerPopUp.remove();
    }, 350);
  }

  //? Close Popup Event Listeners
  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);
}

//? Initialize The Game
generateLetters();
generateRandomWord();
generateWordSpans();
checkLetter();
