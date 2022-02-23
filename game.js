var buttonColors = ["red", "blue", "yellow", "green"];

var gamePattern = [];
var userClickedPattern = [];



var started = false;
var level = 0;

//detect keydown and start new game
$(document).keypress(function() {
  if (started == false) {
    $("h1").text("LEVEL " + level);
    nextSequence();
    started = true;
  }
});



//detect clicked button and add the color to userClickPattern[]
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



//check clicked parttern and game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else {
    console.log("fail");
    playSoundWrong();
    animateGameOver();
    startOver();
  }
}

//functions
//add a new button color to game pattern[]
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("LEVEL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = (buttonColors[randomNumber]);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];

}

//play sound
function playSound(chosenColor) {
  new Audio("sounds/" + chosenColor + ".mp3").play();
}

function playSoundWrong() {
  new Audio("sounds/wrong.mp3").play();
}



//play animation
function animatePress(chosenColor) {
  $("#" + chosenColor).fadeOut(100).fadeIn(100);
  $("#" + chosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + chosenColor).removeClass("pressed");
  }, 100);

}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
}
