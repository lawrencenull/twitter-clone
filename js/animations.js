$(function(){

    function resetInput(){
        $('.tweet-compose').delay(100).animate({height: '2.5em'}, 'fast');
        $('#char-count, #tweet-submit').fadeOut('fast');
    }

   $('#tweet-content>.tweet-compose').on('focus', function(){
       $(this).animate({height: '7.5em'}, 'fast');
       $('#char-count, #tweet-submit').fadeIn();
   })
       .on('focusout', function(){
           if($(this).val().length === 0){
               resetInput();
           }
       })
       .on('keyup', function(){
           var count = 140 - $(this).val().length;
           var $charCount = $('#char-count');
           $charCount.text(count);
           if(count <= 10 && count >= 0) {
               $charCount.css({color: 'red'});
               $('#tweet-submit').prop("disabled",false);
           } else if(count <0){
               $('#tweet-submit').prop("disabled",true);
           } else {
               $charCount.css({color:'black'});
               $('#tweet-submit').prop("disabled",false);
           }
       });

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $('#tweet-submit').on('click', function(){
        var date = new Date();
        var hour, ampm;

        if(date.getHours()>12){
            hour = date.getHours() - 12;
            ampm = 'PM';
        } else {
            hour = date.getHours();
            ampm = 'AM';
        }
        var tweet = $('.tweet-compose').val();
        var avatar = $('.avatar').prop('src');
        console.log(date);
        var name = $('#profile-summary p').text();
        var tweetStuff = '<div class="tweet">' +
            '<div class="content">' +
            '<img class="avatar" src="'+avatar+'" />' +
            '<strong class="fullname">' + name + '</strong>' +
            '<span class="username">@' + name.toLowerCase() + '</span>'+
            '<p class="tweet-text">' + tweet + '</p>' +
            '<div class="tweet-actions">' +
            '<ul>' +
                '<li><span class="icon action-reply"></span> Reply</li>' +
                '<li><span class="icon action-retweet"></span> Retweet</li>' +
                '<li><span class="icon action-favorite"></span> Favorite</li>' +
                '<li><span class="icon action-more"></span> More</li>' +
            '</ul>' +
            '</div>' +

            '<div class="stats">' +
                '<div class="retweets">' +
                '<p class="num-retweets">0</p>' +
                '<p>RETWEETS</p>' +
            '</div>' +
            '<div class="favorites">' +
                '<p class="num-favorites">0</p>' +
                '<p>FAVORITES</p>' +
            '</div>' +
            '<div class="users-interact">' +
                '<div>' +
                '</div>' +
            '</div>' +
            '<div class="time">' +
                hour + ':' + date.getMinutes() + ' ' + ampm + ' - ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + (date.getFullYear()-2000) +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('.tweet-compose').val('');
        $('#char-count').text('140');
        $('#stream').prepend(tweetStuff);
        resetInput();
    });

    $('.tweet-text').on('click', function(){
        $(this).closest('.tweet').find('.tweet-actions').fadeToggle('fast');
    });

    $('.action-reply').parent().on('click', function(){
        $(this).closest('.content').find('.reply').fadeToggle();
    })

});