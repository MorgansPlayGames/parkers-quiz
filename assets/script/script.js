//global buttons
var startButton = document.querySelector("#startButton");

//All boxes that need modification
var qBox = document.getElementById("question");
var aBox1 = document.getElementById("aBox1");
var aBox2 = document.getElementById("aBox2");
var aBox3 = document.getElementById("aBox3");
var aBox4 = document.getElementById("aBox4");
var aBoxEl = document.getElementById("choices");
var timeEl = document.getElementById("hBox2");
var scoreEl = document.getElementById("hBox3");
var scoreBtn = document.getElementById("saveScore")
qBox.style.display = "none";
aBoxEl.style.display = "none";
timeEl.style.display = "none";
scoreEl.style.display = "none";
scoreBtn.style.display = "none";

//timer
var timeLeft = 60;
var timeElapsed;
var timer;

//var answer
var correctAnswer = 1;
var points = 0;
var questionIndex = 0;

var questionList = [];
var scoreTotal;


//Start function
function startGame(){
    qBox.style.display = "block";
    aBoxEl.style.display = "block";
    timeEl.style.display = "block";
    scoreEl.style.display = "block";
    

    startTimer();
    points = 0;
    initializeQuestions();
    questionIndex = 0;
    newQuestion();
    timeElapsed = 0;
    startButton.style.display = "none";
    
}

//timer Functions
function startTimer(){
    timer = setInterval(tick, 1000);
}

//every second do this
function tick(){
    timeElapsed++;
    //end timer
    if(timeElapsed+1>timeLeft){
        endGame();
    }
    updateTimer();
}

//change the time left on screen
function updateTimer(){
    var currentTime = timeLeft - timeElapsed
    timeEl.textContent = currentTime;
}

//On click to answer boxes, do something
function submitAnswer(choice){
    //if choice is correct give 5 points
    if(choice === correctAnswer){
        points = points + 5;
    }else{
        //do something on incorrect
        timeElapsed += 5;
        updateTimer();
    }
    scoreEl.textContent = "Score: " + points;
    newQuestion();
}

//array of questions to put into questionList and shuffle them.
function initializeQuestions(){
    questionList[0] = ["What is my name?", "Parker", "Joel", "Matthew", "Jimmothy"];
    questionList[1] = ["A string is a:", "Series of characters", "Function that goes to another function", "A cat toy", "good album"];
    questionList[2] = ["The answer is 'C'", "C", "A", "B", "D"];
    questionList[3] = ["What is your response to World of Warcraft?", "For the Horde!", "For the Alliance...", "What is World of Warcraft?", "I play League of Legends"];
    questionList[4] = ["Metal (genre) is:", "A diverse genre of music", "just nonesense screaming", "a bad thing", "for scary people"]
    questionList[5] = ["The most popular pokemon is:", "Pikachu", "Mewtwo", "Jigglypuff", "Missingno"];

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
        //console.log(questionIndex);
    questionIndex++;

    }else{
        //when questions are out
        endGame();
    }
}

//On game end do this
function endGame(){
    startButton.style.display = "block";
    qBox.style.display = "none";
    aBoxEl.style.display = "none";
    clearInterval(timer);
    getScore();
}

//arbitirary score function score is time left + score value
function getScore(){
    var timeTotal = timeLeft - timeElapsed;
    scoreTotal = points + timeLeft - timeElapsed;
    scoreEl.textContent = "Total Score: " + scoreTotal;
    timeEl.style.display = "none";
    scoreBtn.style.display = "block";
}

function saveScore(){
    var HSInitials = prompt("Enter your initials:");

    //Do nothing if canceled or none
    if(HSInitials === "" || HSInitials === null){
        return;
    }
    //hide score button on a correct submit
    scoreBtn.style.display = "none";

    //Way to store my list of arrays
    var HSScoreInit = {
        name : HSInitials,
        score : scoreTotal
    };

    var HSList = localStorage.getItem("scoreList");

    //if none in storage set up storage
    if(HSList === null){
        HSList = [HSScoreInit];
    }else{  //Get high score list and add the users score
        HSList = JSON.parse(HSList);
        //add the latest score
        HSList.push(HSScoreInit);
        //sort list by highest score
        HSList.sort(compare)
    }
    //set score list to local storage
    localStorage.setItem('scoreList', JSON.stringify(HSList));
}
//Sort the list by high score
function compare(a, b){
    if(a.score > b.score) return -1;
    if(a.score < b.score) return 1;
    return 0;
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

//Submit score button
scoreBtn.addEventListener('click', saveScore)
//button that gets choice
aBoxEl.addEventListener('click', function(event){
    var choice = event.target.getAttribute('id');
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