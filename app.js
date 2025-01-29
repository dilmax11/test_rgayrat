const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const ressultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function setAvailabeQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// set question number and question and options
function getNewQuestion() {
    //set question number
    questionNumber.innerHTML = "Savollar:  " + (questionCounter + 1) + " / " + quiz.length;

    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the position of 'questionIndex' from the availableQuestion Array 
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the 'questionIndex'  from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1, 1);

    // set otions
    // get the length of otions
    const optionLen = currentQuestion.options.length
        // push options into availableOptions Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in html
    for (let i = 0; i < optionLen; i++) {
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optonIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the 'optonIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2, 1);

        // console.log(optonIndex)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++
}
// get the result of current attempt question
function getResult(element) {
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log(correctAnswers)
    } else {
        // set the red color to the incorrect option
        element.classList.add("wrong");
        // add the indicator to wrong mark
        updateAnswerIndicator("wrong");
        // if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

// make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}

function next() {
    if (questionCounter === quiz.length) {
        console.log("Test tuugadi");
        quizOver();
    } else {
        getNewQuestion();
    }
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function quizOver() {
    // hide quizBox
    quizBox.classList.add("hide");
    // show result Box
    ressultBox.classList.remove("hide");
    quizResult();
}

// get the quiz Result
function quizResult() {
    ressultBox.querySelector(".total-question").innerHTML = quiz.length;
    ressultBox.querySelector(".total-attempt").innerHTML = attempt;
    ressultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    ressultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    ressultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) + " %";
    ressultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function tryAgainQuiz() {
    // hide the ressultBox
    ressultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome() {
    // hide result Box
    ressultBox.classList.add("hide");
    // show home Box
    homeBox.classList.remove("hide");
    resetQuiz();
}

//  ### STARTING POINT  #####
function startQuiz() {
    //  hide homeBox
    homeBox.classList.add("hide");
    // show quiz Box
    quizBox.classList.remove("hide");
    // first we will set all questions in availableQuestions Array
    setAvailabeQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
    // to create indicator of answers
    answersIndicator();
}

window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}