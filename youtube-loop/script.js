let player;

function onYouTubeIframeAPIReady() {
}

function loadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
        if (player) {
            player.loadVideoById(videoId);
        } else {
            player = new YT.Player('player', {
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    } else {
        alert('正しいYouTubeのURLを入力してください');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function playVideo() {
    if (player) {
        player.playVideo();
    }
}

function pauseVideo() {
    if (player) {
        player.pauseVideo();
    }
}

function stopVideo() {
    if (player) {
        player.stopVideo();
    }
}

function changeVolume() {
    const volume = document.getElementById('volumeSlider').value;
    if (player) {
        player.setVolume(volume);
    }
}

function seekTo() {
    const seekValue = document.getElementById('seekSlider').value;
    if (player) {
        const duration = player.getDuration();
        const seekTime = (seekValue / 100) * duration;
        player.seekTo(seekTime, true);
    }
}
