// $("h1") == jQuery("h1")

// vanila js
/*
for(var i = 0; i<5; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        document.querySelector("h1").style.color = "purple";
    });
}
*/


// jQuery
// no need of for loop as $ will go thru each and all "button" or "h1"
/*
$("button").click(function(){
    $("h1").css("color", "purple");
});
*/


$("button").on("click",function() {
    $("h1").animate({opacity: 0.5});    //in animate() u can only change the properties that have numerical value, ie. u can't change color in animate()
});