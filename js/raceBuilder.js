/*

This file contains all of the code running in the background that makes raceBuilder.js

*/

/*
These are HTML strings. Using JavaScript functions
replace the %data% placeholder 
*/

$(document).ready(function(){
$('button').click(function() {

        $('#container').empty();                                                    
       // var row = prompt("How many rows are desired?");
        var row =2;
        var col = prompt("How many columns are desired?");
        for (var j=0; j<row; j++) {  
          for (var i=0; i<col; i++) {
            $('#container').append('<div class="grid-box"></div>');
            };
            $('#container').append('<div class="next-col"></div>');
        };
        $('.grid-box').mouseenter(function() {
            $(this).css('background-color', "red");
        });
    });
})