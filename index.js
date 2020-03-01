
var buttonColors=["red","green","blue","yellow"];
var gamePattern=[]; // Empty Array
var userClickedPattern=[]; // Empty Array

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
function  nextSequence() {
   userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber]
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}
var level =0;
var game = false;


  $(document).keydown(function(){
    if(!game)
    {
      $("h1").text("Level" + level)
      nextSequence();
      game = true;
    }
  });
  function startOver() {
    level = 0;
    gamePattern = [];
    game = false;
  }
