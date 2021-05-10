const fav_tweets = ["1390528212250238976", "1390630145300439045", "1390609266772365319", "1390607462089183235"];

window.onload = (function(){

    $(window).on('scroll resize', check_if_in_view);
    $(window).trigger('scroll');

    $('.ham').click(function() {
        $('.menu').toggleClass('opened');
        $(this).toggleClass('opened');
        if ($('.menu').hasClass('opened')) {
            $('header').css('background', $('.menu.opened').css('background'));
        } else {
            $('header').css('background', '');
        }
    })

    var tweets = document.getElementsByClassName("tweet");
    for (let index = 0; index < tweets.length; index++) {
        const tweet = tweets[index];
        var id = tweet.getAttribute("tweetID");
        $('.tweet').addClass('animate-in');
    
        twttr.widgets.createTweet(
        id, tweet,
        {
            conversation : 'none',    // or all
            cards        : 'hidden',  // or visible
            linkColor    : '#cc0000', // default is blue
            theme        : 'light',   // or dark
            lang         : 'ja'
        });
    }

    setInterval(function(){ 
    var tweets = document.getElementsByClassName("tweet");
    for (let index = 0; index < tweets.length; index++) {
        $('.tweet').removeClass('animate-out');
        $('.tweet').removeClass('animate-in');
        $('.tweet').addClass('animate-out');

        setTimeout(function(){
            const tweet = tweets[index];
            var id = fav_tweets[Math.floor((Math.random() * (fav_tweets.length - 1)) + 0)];

            tweet.innerHTML = "";
        
            twttr.widgets.createTweet(
                id, tweet,
                {
                conversation : 'none',    // or all
                cards        : 'hidden',  // or visible
                linkColor    : '#cc0000', // default is blue
                theme        : 'light',   // or dark
                lang         : 'ja'
                });
                $('.tweet').addClass('animate-in');
        }, 1500)
    }
    }, 10000);

    $('.disco').hover(
        function(){ 
            $(this).parent().addClass('expand');
            const target = $(this);
            var target_index;
            target_index = $('.disco').index(this);
            $('.disco').eq(target_index-1).parent().addClass('shrink')
            $('.disco').eq(target_index+1).parent().addClass('shrink')
            $('.disco').not(this).parent().addClass('overlayed')
        },
        function(){
            $(this).parent().removeClass('expand');
            const target = $(this);
            var target_index;
            target_index = $('.disco').index(this);
            $('.disco').eq(target_index-1).parent().removeClass('shrink')
            $('.disco').eq(target_index+1).parent().removeClass('shrink')
            $('.disco').not(this).parent().removeClass('overlayed')

            $(this).parent().css('z-index', 5);
            setTimeout(function() {$(this).parent().css('z-index', 3);}, 300)
        }
    )
});

function check_if_in_view() {
    var window_height = $(window).height();
    var window_top_position = $(window).scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $('.animation-element').each(function() {
        var element_height = $(this).outerHeight();
        var element_top_position = $(this).offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            var animate_index = (window_bottom_position - element_top_position)/((window_bottom_position - window_top_position) * .3);
            if (animate_index > 1) {
                animate_index = 1;
            }
            if ($(this).hasClass('catch-text')) {
                $(this).css('opacity', animate_index);
                $(this).css('transform', 'translateY(' + ((1-animate_index)*60) + 'px)translateX(-50%)');
            }
            if ($(this).hasClass('date')) {
                animate_index = (window_bottom_position - element_top_position)/((window_bottom_position - window_top_position) * .6);
                if (animate_index > 1) {
                    animate_index = 1;
                }
                $(this).css('opacity', animate_index);
                if ($(this).parent().parent().hasClass('column-left')) {
                    $(this).css('transform', 'translateX(' + ((1-animate_index)*20) + 'px)');
                } else {
                    $(this).css('transform', 'translateX(-' + ((1-animate_index)*20) + 'px)');
                }
            }
        }
    })
}