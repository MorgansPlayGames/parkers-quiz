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


//Start function
function startGame(){
    console.log("Hello!");
    startTimer();
    points = 0;
}

//timer Functions
function startTimer(){
    timer = setInterval(tick, 1000);
    timeElapsed = 0;
}

function tick(){
    timeElapsed++;
    console.log(timeElapsed)
    //end timer
    if(timeElapsed+1>timeLeft){
        clearInterval(timer);
    }
    updateTimer();
}

function updateTimer(){
    var currentTime = timeLeft - timeElapsed
    timeEl.textContent = currentTime;
}

//On click to answer boxes, do something
function submitAnswer(choice){
    console.log(choice);
    if(choice === correctAnswer){
        console.log("correct");
        points = points + 5;
    }else{
        console.log("incorrect");
    }
    console.log("points " + points);
    scoreEl.textContent = "Score: " + points;
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