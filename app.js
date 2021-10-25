// Configuration
const APIKey = "YOUTUBE_DATA_V3_API_KEY_GOES_HERE";
const youtubeId = "CHANNEL_ID_GOES_HERE";
const updateIntervalInHours = 1;

const subCount = document.querySelector(".sub-count");
const viewsCount = document.querySelector(".views-count");
const videosCount = document.querySelector(".videos-count");
const imgPlaceHolder = document.getElementById('avatar-place-holder');

const hoursInMillis = 1000 * 60 * 60;

const getYouTubeStats = async () => {
    const getData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeId}&key=${APIKey}`);

    const ytSubs = getData.data.items[0].statistics.subscriberCount;
    const ytViews = getData.data.items[0].statistics.viewCount;
    const ytVideos = getData.data.items[0].statistics.videoCount;

    subCount.innerHTML = ytSubs;
    viewsCount.innerHTML = ytViews;
    videosCount.innerHTML = ytVideos;
};

const getChannelLogo = async () => {
    const getAvatarData = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${youtubeId}&fields=items%2Fsnippet%2Fthumbnails&key=${APIKey}`);
    const ytImgUrl = getAvatarData.data.items[0].snippet.thumbnails.high;
    imgPlaceHolder.src = ytImgUrl.url;
}

function refreshStats() {
    console.log('starting refresh of youtube stats');
    getYouTubeStats(); // runs in the background
    getChannelLogo(); // runs in the background
    console.log('finished refresh of youtube stats');
}

// main entry point
refreshStats(); // initial load
setInterval(getYouTubeStats(), updateIntervalInHours * hoursInMillis); // timed refresh of stats