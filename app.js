// Get references to HTML elements

const levelBtnsDiv = document.querySelector(".level-buttons");
const startLevelOne = document.querySelector(".level1");
const startLevelTwo = document.querySelector(".level2");
const startLevelThree = document.querySelector(".level3");
const studentImg = document.querySelector("img");
const optionBtnContainer = document.querySelector("#options");
const optionButtons = document.querySelectorAll(".option");
const optionBtn1 = document.querySelector("#option1");
const optionBtn2 = document.querySelector("#option2");
const optionBtn3 = document.querySelector("#option3");
const optionBtn4 = document.querySelector("#option4");
const scoreBtn = document.querySelector("#score-btn");
const getResultInfo = document.querySelector("#result-info");
const nextBtn = document.querySelector("#next");
const userScore = document.querySelector("#user-score");

// hide next, score and option buttons on startpage

nextBtn.classList.add("hide");
scoreBtn.classList.add("hide");

optionButtons.forEach((button) => {
  button.classList.add("hide");
});

// function to show them again in case I want to reuse in game
const showOptionsBtns = () => {
  optionButtons.forEach((button) => {
    button.classList.remove("hide");
  });
};

let numOfGuesses;
let score;
let correctAnswer;

// function to shuffle arrays

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// create clone from original array in order to not modify or change original

const newStudents = Array.from(flags);

// declare a variable for shuffled students

let shuffledStudents;

// keep track of current index of student when shuffled

let currentStudentIndex;

// create function to show next image and also answer options at the same time

const presentQuestion = (image) => {
  studentImg.setAttribute("src", image.image);
  correctAnswer = image.name;

  // use map to create array with only names before shuffling =>
  // use filter in order to not include the correct name using filter =>
  // because the correct name (answer) will always be placed in beginning array by using unshift!

  let options = shuffledStudents.map((student) => student.name);
  options = options.filter((names) => names !== correctAnswer);

  // create an array with rest of names from complete array

  // place correct answer at index 0 of answerOptions array to ensure that it's always included
  // shuffle again for more variety!
  shuffle(options);
  options.unshift(correctAnswer);

  // create mini-array with four names to output to option buttons

  let answerOptions = options.slice(0, 4);

  //shuffle AGAIN!
  shuffle(answerOptions);

  optionBtn1.innerHTML = answerOptions[0];
  optionBtn2.innerHTML = answerOptions[1];
  optionBtn3.innerHTML = answerOptions[2];
  optionBtn4.innerHTML = answerOptions[3];
};

// function to activate and de-activate option buttons so user can't cheat!

const toggleButtons = (disable) => {
  optionButtons.forEach((button) => {
    if (disable) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.removeAttribute("disabled");
    }
  });
};

// add eventlisteners to option button container
// keep track of score and if user answers correctly or not
// add clickevent to option buttons so it only targets button and not white space

optionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.style.backgroundColor = "#ffcc00";
    const clickedName = e.target.innerHTML;
    if (clickedName === correctAnswer) {
      score++;
      //disable buttons when answer is made
      toggleButtons(true);

      userScore.innerHTML = "You guessed the right name! 🎉 ";
    } else {
      toggleButtons(true);

      userScore.innerHTML = "Wrong answer 🙄 ";
    }
  });
});

//created a function for when game continues

const nextRound = () => {
  presentQuestion(shuffledStudents[currentStudentIndex]);

  numOfGuesses++;

  // When the last student is displayed:

  if (numOfGuesses === shuffledStudents.length) {
    scoreBtn.innerHTML = "Let's see how you did!";
    scoreBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
    getResultInfo.innerHTML =
      "🚨This is the last pic! Don't forget to click on a name before getting results!🚨";
  }
  scoreBtn.addEventListener("click", () => {
    userScore.innerHTML = "";
    getResultInfo.innerHTML = "";
    scoreBtn.innerHTML = `Total score is: <br> ${score} / ${shuffledStudents.length} points!`;
  });
};

nextBtn.addEventListener("click", () => {
  optionButtons.forEach((button) => {
    button.style.backgroundColor = "#ff7575";
  });
  userScore.innerHTML = "";
  currentStudentIndex++;

  // make buttons clickable again
  toggleButtons(false);
  // call next round function when button is clicked
  nextRound();
});

// create a function for start of game
// this happens when user clicks one of the level buttons

const startGame = () => {
  // HIDE level buttons and DISPLAY next button when game is started

  levelBtnsDiv.classList.add("hide");
  nextBtn.classList.remove("hide");

  showOptionsBtns();

  scoreBtn.innerHTML = "";

  numOfGuesses = 0;
  score = 0;
  shuffledStudents = shuffle(newStudents);
  currentStudentIndex = 0;
  // output image from newStudents to img src on page

  nextRound();
};

//Finally: add eventlisteners to startbuttons and invoke startGame!

// level 3 with all the students from shuffledStudents

startLevelThree.addEventListener("click", startGame);

// pick out 20 students from shuffledStudents array for level 2

startLevelTwo.addEventListener("click", () => {
  startGame();
  shuffledStudents = shuffledStudents.slice(0, 20);
});

// pick out 10 students from shuffledStudents array for level 1

startLevelOne.addEventListener("click", () => {
  startGame();
  shuffledStudents = shuffledStudents.slice(0, 10);
});
