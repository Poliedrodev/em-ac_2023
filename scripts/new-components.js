$(document).ready(function() {
    //[variables] btn close for popup and popup center

    if (location.href.indexOf('file') != -1) {
        
        fullPopup();
        centerPopup();
        videoPopup();
        audioPlayer();
        
    } else {        
        console.log('rodando na wooding');
    }   
});

function fullPopup() {   
    var popup = $('.image_popup');
    var btnCloseModal = $('.image_popup .image_popup__content a');

    popup.addClass('__ready');

    $('.articleContent').each(function(){
        var triggerPopup = $('.trigger_popup'); 

        triggerPopup.on('click', function(){
            popup.addClass('popup_actived');
        });        

        btnCloseModal.on('click', function(){
            popup.removeClass('popup_actived');
        });
    });
}

function centerPopup() {
    var btnCloseModalCenter = $('.image_popup_center .image_popup__content a');
    var popupCenter = $('.image_popup_center');    

    popupCenter.addClass('__ready');

    $('.articleContent').each(function(){
        popupCenter.on('click', function(){
            $(this).addClass('popup_actived');
        }); 

        btnCloseModalCenter.on('click', function(){
            popupCenter.removeClass('popup_actived');
            return false;
        });
    });
}

function videoPopup() {
    $('.content-video__url').addClass('none');
    var popupVideo = $('.video_popup_center');
    var btnCloseModalVideoCenter = $('.video_popup_center .video_popup__content a');

    var urlVideo = $('.content-video__url').text();
    console.log(urlVideo);

    var playerDefault = $('#playerDefault');
    var playerYoutube = $('#playerYoutube');
    var iframeYoutube = $('#playerYoutube iframe');

    var screem = $(window).height() - 150;

    $('.video_popup_center').addClass('__ready');

    $('.articleContent').each(function(){
        if(urlVideo.indexOf("youtube")>-1 ) {
            console.log('é video do youtube');
            playerYoutube.addClass('show');
            iframeYoutube.attr('src', urlVideo);
            iframeYoutube.attr('height', screem);

            btnCloseModalVideoCenter.on('click', function(){
                popupVideo.removeClass('popup_actived');
    
                iframeYoutube[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                return false;
            });

        } else {
            console.log('qualquer outro video');
            playerDefault.addClass('show');
            playerDefault.html("<source src='" + urlVideo + "' type='video/mp4' />");

            btnCloseModalVideoCenter.on('click', function(){
                popupVideo.removeClass('popup_actived');

                playerDefault.get(0).pause();
                playerDefault.get(0).currentTime = 0;

                return false;
            });
        }

        popupVideo.on('click', function(){
            $(this).addClass('popup_actived');
        });
    });
}

function audioPlayer() {
    $('.audio__url').addClass('none');
    var buttonPlayer = $('.icon_player');
    var stopPlayer = $('.icon_stop');
    
    $('.articleContent').each(function(){
        buttonPlayer.on('click', function(e){
            var urlAudio = $(this).parent().find('.audio__url').text()
            console.log(urlAudio);

            if($(this).parent().find('audio').attr('src') == '') {
                $(this).parent().find('audio').attr('src', urlAudio);
            } else {
                console.log('ja tem link de audio');
            }

            e.preventDefault();
            var song = $(this).parent().find('audio').get(0);
            
            if(song.paused) {
                song.play();
                $(this).addClass("icon_pause");
            } else {
                song.pause();
                $(this).removeClass("icon_pause");
            }
        });

        
        stopPlayer.on('click', function(e){
            e.preventDefault();
            var song = $(this).parent().find('audio').get(0);

            $(this).prev().removeClass("icon_pause");
            song.pause();
            song.currentTime = 0;
        });
    });
}


