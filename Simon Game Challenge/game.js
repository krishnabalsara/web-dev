

buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];

var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

var level = 0;  //start with level 0

//using jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keypress(function(){
    if(!started){

        //when the game is started title changes from "Press A Key to Start" -> "Level 0"
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



//detecting when any buttons are clicked & trigger a handler function
$(".btn").click(function(){

    //store id of button that got clicked
    var userChosenColour = $(this).attr("id");

    //add it into the pattern 
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //calling checkAnswer() after user has clicked & chosen ans, passing index of last ans in user's sequence
    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel){

    //writing if stat to check if the pattern matches (game pattern = user recent ans)
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //if the recent ans is right then check if they have finished their sequence
        if(userClickedPattern.length.length === gamePattern.length){

            //call nextSequence() after 1000ms delay
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function nextSequence(){

    //once nextSequence() is triggered, reset userClickedPattern to empty array ready for next level
    userClickedPattern = [];

    //increase level by 1 every time nextSequence() is called
    level++;

    //update h1 with this change of level upgradation
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //making button flash using jQuery
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //playing sound for the button wrt color selected
    playSound(randomChosenColour);
}

function playSound(name){

    //playing sound for the button wrt color selected
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentColour){

    //adding pressed class to the button that gets clicked inside animatePress()
    $("#" + currentColour).addClass("pressed");

    //removing the pressed class after 100 milliseconds
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function startOver(){

    //reset the values
    level = 0;
    gamePattern = [];
    started = false;
}


