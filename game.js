//
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

var userClickedPattern = [];

$(".btn").click(function() {
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    gameOver();

  }

}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var number = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColors[number];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver(){
  started = false;
  gamePattern = [];
  level = 0;
}


function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}


function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);

}
