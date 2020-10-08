//global buttons
var startButton = document.querySelector("#startButton");

//All boxes that need modification
    //mainContent not needed?
var content = document.getElementById("mainContent")
var qBox = document.getElementById("question");
var aBox1 = document.getElementById("aBox1");
var aBox2 = document.getElementById("aBox2");
var aBox3 = document.getElementById("aBox3");
var aBox4 = document.getElementById("aBox4");
var aBoxEl = document.getElementById("choices");
var timeEl = document.getElementById("hBox2");
var scoreEl = document.getElementById("hBox3");

//timer
var timeLeft = 5;
var timeElapsed;
var timer;

//var answer
var correctAnswer = 1;
var points = 0;
var questionIndex = 0;

var questionList = [];


//Start function
function startGame(){
    console.log("Hello!");
    startTimer();
    points = 0;
    initializeQuestions()

}

//timer Functions
function startTimer(){
    timer = setInterval(tick, 1000);
    timeElapsed = 0;
    initializeQuestions();
    questionIndex = 0;
    newQuestion();
    
}

//every second do this
function tick(){
    timeElapsed++;
    //console.log(timeElapsed)
    //end timer
    if(timeElapsed+1>timeLeft){
        clearInterval(timer);
    }
    updateTimer();
}

//change the time left
function updateTimer(){
    var currentTime = timeLeft - timeElapsed
    timeEl.textContent = currentTime;
}

//On click to answer boxes, do something
function submitAnswer(choice){
    //console.log(choice);
    //if choice is correct give 5 points
    if(choice === correctAnswer){
        console.log("correct");
        points = points + 5;
    }else{
        //do something on incorrect
        console.log("incorrect");
    }
    console.log("points " + points);
    scoreEl.textContent = "Score: " + points;
    newQuestion();
}

//array of questions to put into questionList
function initializeQuestions(){
    questionList[0] = ["What is my name?", "Parker", "Joel", "Matthew", "Jimmothy"];
    questionList[1] = ["A string is a:", "Series of characters", "Function that goes to another function", "A cat toy", "good album"];
    questionList[2] = ["The answer is 'C'", "C", "A", "B", "D"];
    shuffle(questionList);
}

function newQuestion(){
    //if there are questions left
    if(questionIndex < questionList.length){
    qBox.textContent = questionList[questionIndex][0];
    
    //Shuffle and populate answers assign correct answer to global
    var numbs = [1, 2, 3, 4]
    shuffle(numbs);
    var a = numbs[0];
    if(a === 1){correctAnswer = 1}
    var b = numbs[1];
    if(b === 1){correctAnswer = 2}
    var c = numbs[2];
    if(c === 1){correctAnswer = 3}
    var d = numbs[3];
    if(d === 1){correctAnswer = 4}
    aBox1.textContent = questionList[questionIndex][a];
    aBox2.textContent = questionList[questionIndex][b];
    aBox3.textContent = questionList[questionIndex][c];
    aBox4.textContent = questionList[questionIndex][d];
        console.log(questionIndex);
    questionIndex++;

    }else{
        //when questions are out
        endGame();
    }
}

//On game end do this
function endGame(){
    console.log("good job");
}


//Shuffle function found to add randomness
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


//buttons
startButton.addEventListener("click", startGame);
//button that gets choice
aBoxEl.addEventListener('click', function(event){
    var choice = event.target.getAttribute('id');
    //console.log(choice);
    if(choice === "aBox1"){
        submitAnswer(1);
    }
    if(choice === "aBox2"){
        submitAnswer(2);
    }
    if(choice === "aBox3"){
        submitAnswer(3);
    }
    if(choice === "aBox4"){
        submitAnswer(4);
    }

});