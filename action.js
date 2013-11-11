

$(document).ready(function() {
    //populate coin boxes
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    $('body').width(screenWidth);
    $('.wrapper').width(screenWidth);


    var numBoxes = Math.floor(screenWidth/65);
    var answer = Math.floor(Math.random()*numBoxes);
    var lastGuess = 0;
    for ( var i = 0; i < numBoxes; i++ ) {
      $('<img/>', {
        'id':'coinBox',
        'src':'img/coinBox.gif',
      }).appendTo('#coinBoxes');
    }   


    $(document).keydown(function(key) {
      var marioPos = $('#mario').position();
      $('.oneup').css({display:'none'});
      $('#win').css({display:'none'});
      switch(parseInt(key.which,10)) {
        //left
        case 65:
          if (marioPos.left > 30){
            $('#mario').animate({left: "-=30px"}, 1).addClass('mario-left');
            $('#mario-jump').addClass('mario-jump-left');
          };
          break;
        //right
        case 68:
          if (marioPos.left < (screenWidth-80)){
            $('#mario').animate({left: "+=30px"}, 1).removeClass('mario-left');
            $('#mario-jump').removeClass('mario-jump-left');
          };
          break;
        //Jump
        case 87:
          $('.coin').css({display:'none'});
          $('#mario').fadeOut(10);
          $('#mario-jump').css({display:'inline', top: marioPos.top-10, left: marioPos.left-10, position:'absolute'});

          $('#mario-jump').animate({top: "-=185px"}, 400);
          var boxAt = Math.round(marioPos.left/65);
          $("#coinBoxes").children().eq(parseInt(boxAt)).delay(400).animate({top: "-=10px"}, 300);
          $("#coinBoxes").children().eq(parseInt(boxAt)).animate({top: "+=10px"}, 'slow');
          //hit coin here
          $('#mario-jump').animate({top: "+=185px"}, 300).delay(1).fadeOut(10);
          $('#mario').delay(700).fadeIn(10);
          var boxPosition = $("#coinBoxes").children().eq(parseInt(boxAt)).offset();

          
          if(boxAt != answer){
            if (lastGuess == 0 || lastGuess == boxAt || (Math.abs(boxAt-answer) < Math.abs(lastGuess-answer))){ // Red Coin
              $('<img/>', {
                'class':'coin',
                'src':'img/red_coin.png',
              }).appendTo('body'); 
            } else {// Blue Coin
              $('<img/>', {
                'class':'coin',
                'src':'img/blue_coin.png',
              }).appendTo('body');
            }
            $('.coin').delay(700).css({top: boxPosition.top-70, left: boxPosition.left, position:'absolute'}).fadeIn(10); 
            var toGo = 400*(Math.abs(boxAt-answer)/numBoxes);
            $('.coin').animate({top: "-="+ toGo+"px"}, 100);
          // Gold Coin
          } else if (boxAt == answer){

            $('<img/>', {
              'class':'oneup',
              'src':'img/1up.png',
            }).appendTo('body');

            $('.oneup').delay(700).css({top: boxPosition.top-70, left: boxPosition.left-10, position:'absolute', width: 80}).fadeIn(10);
            $('.oneup').animate({top: "-=125px"}, 300);

            $('#win').delay(300).fadeIn(3000);
          }
          //$( "#marioPos" ).text( "distance: " + toGo);

          
          lastGuess = boxAt;
          break;
        default:
          break;
      }
    });
});