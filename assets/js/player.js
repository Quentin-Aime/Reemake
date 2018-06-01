var player = document.querySelector('.player > .video > video');
var playerDIV = document.querySelector('.player');
var controlBar = document.querySelector('.control-panel');
var playerTitle = document.querySelector('.player-title');
var pauseScreen = document.querySelector('.pause-screen');

// Buttons

var btnPlay = document.querySelector('.btn-play');
var btnPause = document.querySelector('.btn-pause');
var btnStop = document.querySelector('.btn-stop');
var btnRepeat = document.querySelector('.btn-repeat');
var btnVolumeOn = document.querySelector('.btn-volumeon');
var btnVolumeOff = document.querySelector('.btn-volumeoff');
var btnFullscreen = document.querySelector('.btn-fullscreen');

// Valeurs

var statePlay = false;
var stateVolume = true;
var stateFullscreen = false;
var lastVolume = 0;
var stateVideo = true;

// Play/Pause

btnPlay.addEventListener("click", playpause);
btnPause.addEventListener("click", playpause);

player.addEventListener("click", playpause);
pauseScreen.addEventListener("click", playpause);

function playpause() {
    if (statePlay == true) {
        btnPlay.classList.add('hide');
        btnPause.classList.remove('hide');
        pauseScreen.classList.remove('hide');
        statePlay = false;
        player.classList.add('video-pause');
        player.classList.remove('video-play');
        player.pause();

    } else {
        btnPlay.classList.remove('hide');
        btnPause.classList.add('hide');
        pauseScreen.classList.add('hide');
        statePlay = true;
        player.classList.remove('video-pause');
        player.classList.add('video-play');
        player.play();
    }
}

// Time


function formatTime(s, m) {
    s = Math.floor(s);
    m = Math.floor(s / 60);
    m = m >= 10 ? m : '0' + m;
    s = Math.floor(s % 60);
    s = s >= 10 ? s : '0' + s;
    return m + ':' + s;
}

// Progress Bar
var ntm = 0
player.ontimeupdate = function () {
    ntm = (player.currentTime / player.duration) * 100;
    document.querySelector('#video-control').value = ntm;
    document.querySelector('.progress-bar').style.width = ntm + "%";
    document.querySelector('.control-time').innerHTML = formatTime(player.currentTime) + " / " + formatTime(player.duration); // Time
};

function SetVideo(val) {
    var vald = (val * player.duration) / 100;
    player.currentTime = vald;
    if (stateVideo == false) {
        btnRepeat.classList.add('hide');
        playpause();
        stateVideo = true;
    }
}

// Volume

btnVolumeOn.addEventListener("click", mute);
btnVolumeOff.addEventListener("click", mute);

function mute() {
    if (stateVolume == true) {
        player.volume = 0;
        stateVolume = false;
        lastVolume = document.querySelector('#volume-control').value;
        document.querySelector('#volume-control').value = '0';
        btnVolumeOn.classList.add('hide');
        btnVolumeOff.classList.remove('hide');
    } else {
        stateVolume = true;
        player.volume = lastVolume / 100;
        document.querySelector('#volume-control').value = lastVolume;
        btnVolumeOff.classList.add('hide');
        btnVolumeOn.classList.remove('hide');
    }
}


document.querySelector('.control-volume').addEventListener("mouseover", volumeControlOn);
document.querySelector('.control-volume').addEventListener("mouseover", volumeControlOn);

document.querySelector('.control-volume').addEventListener("mouseout", volumeControlOff);
document.querySelector('.control-volume').addEventListener("mouseout", volumeControlOff);


function volumeControlOn() {
    document.querySelector('#volume-control').style.opacity = "1";
}

function volumeControlOff() {
    document.querySelector('#volume-control').style.opacity = "0";
}

function SetVolume(val) {
    var kaaris = val / 100;
    player.volume = kaaris;
    if (kaaris == 0) {
        btnVolumeOn.classList.add('hide');
        btnVolumeOff.classList.remove('hide');
        stateVolume = false;
    } else {
        btnVolumeOn.classList.remove('hide');
        btnVolumeOff.classList.add('hide');
        stateVolume = true;
    }
}


// Fullscreen

btnFullscreen.addEventListener("click", launchFullscreen);

player.addEventListener('dblclick', launchFullscreen);
pauseScreen.addEventListener('dblclick', launchFullscreen);


window.addEventListener('keydown', keyPressed);



function launchFullscreen() {
    if (stateFullscreen == false) {
        launchIntoFullscreen();
        stateFullscreen = true;
        document.querySelector('#volume-control').style.marginLeft = "8%";
    } else if (stateFullscreen == true) {
        exitFullscreen();
        stateFullscreen = false;
        document.querySelector('#volume-control').style.marginLeft = "";
    }
}

if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);
}

function exitHandler() {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
        document.querySelector('.player').classList.toggle('player-fullscreen');
    }
}

function launchIntoFullscreen() {
    if (document.querySelector('.player').requestFullscreen) {
        document.querySelector('.player').requestFullscreen();
    } else if (document.querySelector('.player').mozRequestFullScreen) {
        document.querySelector('.player').mozRequestFullScreen();
    } else if (document.querySelector('.player').webkitRequestFullscreen) {
        document.querySelector('.player').webkitRequestFullscreen();
    } else if (document.querySelector('.player').msRequestFullscreen) {
        document.querySelector('.player').msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Repeat

player.onended = function () {
    if (player.ended == true) {
        btnPlay.classList.add('hide');
        btnPause.classList.add('hide');
        btnRepeat.classList.remove('hide');
        statePlay = false;
        stateVideo = false;
    }
}

btnRepeat.addEventListener('click', function () {
    stateVideo = true;
    btnRepeat.classList.add('hide');
    playpause();
})

// Stop

btnStop.addEventListener('click', stopPlayer);

function stopPlayer() {
    player.currentTime = 0;
    statePlay = true;
    playpause();
};

// Mouse move

var timeout;
player.onmousemove = function mouseMove() {
    clearTimeout(timeout);
    controlBar.classList.remove('control-panel-off')
    controlBar.classList.add('control-panel-on')
    playerDIV.classList.remove('cursor-hide');
    playerTitle.classList.remove('title-off');
    playerTitle.classList.add('title-on');
    if (statePlay == true) {
        timeout = setTimeout(function () {
            controlBar.classList.add('control-panel-off')
            controlBar.classList.remove('control-panel-on')
            playerDIV.classList.add('cursor-hide');
            playerTitle.classList.remove('title-on');
            playerTitle.classList.add('title-off');
        }, 3000);
    }
}

// Key Press

var notRecording = true;

function keyPressed(event) {
    var khey = event.keyCode;
    
    if (notRecording == true) {
        
    } else {
        if (khey == 27 && stateFullscreen == true) {
            exitFullscreen();
            stateFullscreen = false;
        }
        if (khey == 32) {
            var spacebar;
            document.body.style.overflowY = "hidden";
            playpause();
            spacebar = setTimeout(function () {
                document.body.style.overflowY = "";
            }, 1);
        }
        if (khey == 36) {
            stopPlayer();
        }
        if (khey == 37) {
            player.currentTime = player.currentTime - 5;
            setTimeout(function () {
            }, 300);
        }
        if (khey == 39) {
            player.currentTime = player.currentTime + 5;
            setTimeout(function () {
            }, 300);
        }
        if (khey == 70) {
            launchFullscreen();
        }
        if (khey == 27 || khey == 32 || khey == 36 || khey == 37 || khey == 39 || khey == 70) {
            controlBar.classList.remove('control-panel-off')
            controlBar.classList.add('control-panel-on')
            playerTitle.classList.remove('title-off');
            playerTitle.classList.add('title-on');
            if (statePlay == true) {
                timeout = setTimeout(function () {
                    controlBar.classList.add('control-panel-off')
                    controlBar.classList.remove('control-panel-on')
                    playerDIV.classList.add('cursor-hide');
                    playerTitle.classList.remove('title-on');
                    playerTitle.classList.add('title-off');
                }, 3000);
            }
        }
    }
}

// Input focused

var username = document.querySelector('.input-username');
var comment = document.querySelector('.textarea-comment');

var usernameIndex = false;
var commentIndex = false;

username.addEventListener('focus', function(){
    usernameIndex = true;
    checknotRecording();
})

username.addEventListener('blur', function(){
    usernameIndex = false;
    checknotRecording();
})

comment.addEventListener('focus', function(){
    commentIndex = true;
    checknotRecording();
})

comment.addEventListener('blur', function(){
    commentIndex = false;
    checknotRecording();
})


function checknotRecording(){
    if(commentIndex == true || usernameIndex == true){
        notRecording = true;
    } else {
        notRecording = false;
    }   
}