var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 1;
$(document).keydown(nextSequence);

function nextSequence() {

    $("h1").text("Level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 200)
}

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern.length = 0;
        }
    } else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, press any key to restart");
        startOver();
    }
}

function startOver() {
    level = 1;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
}

