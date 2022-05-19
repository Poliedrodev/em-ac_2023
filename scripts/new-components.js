$(document).ready(function() {    
    if (location.href.indexOf('file') != -1) {
        fullPopup();
        centerPopup();
        videoPopup();
        audioPlayer();
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
    var popupCenter = $('.image_popup_center');

    popupCenter.addClass('__ready');

    $('.image_popup_center').each(function(){
        if($(this).find('.image_popup__final-content a img').attr('src') == "") {
            var oneStep = $(this).find('.image_popup__img').attr('style').substring(23)
            var lastStep = oneStep.substring(0, 13);
            var textImg = $(this).find('.image_popup__text').text();
            var rndInt = Math.floor(Math.random() * 9738) + 1;

            console.log(rndInt);
            console.log(lastStep);
            console.log(textImg);

            $(this).find('.image_popup__final-content').attr('id', 'lightgallery' + rndInt);
            $(this).find('.thumb-popup-img').attr('href', lastStep);
            $(this).find('.thumb-popup-img img').attr('src', lastStep);
            //$(this).find('.thumb-popup-img img').attr('alt', textImg);
            $(this).find('.desc-img').text(textImg);            

            lightGallery(document.getElementById('lightgallery' + rndInt), {
                download: false,
                share: false,
                lgComment: true
            });
        } else {
            console.log('JA TEM IMAGEM');
        }
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