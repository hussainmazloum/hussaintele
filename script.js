const mainContainer = document.getElementById("container");

function createPost(name, url, icon, type) {
  const postContainer = document.createElement("div");
  const postTitle = document.createElement("h3");
  const postIcon = document.createElement("img");

  postTitle.textContent = name;

  postIcon.src = icon;
  postIcon.alt = name;
  postIcon.width = 100;

  postContainer.classList.add("post-container");

  postContainer.appendChild(postTitle);
  postContainer.appendChild(postIcon);

  postContainer.addEventListener("click", () => {
    
    if (type === "youtube") {
      playYoutube(url);
    } else {
      playStream(url);
    }
  });

  mainContainer.appendChild(postContainer);
}

posts.forEach(post => {
  createPost(post.name, post.url, post.icon, post.type);
});

function playYoutube(videoId) {
  const video = document.getElementById("video");
  const playerContainer = document.getElementById("player-container");
  const player = document.getElementById("youtubePlayer");

  // Stopp HLS
  video.pause();
  video.src = "";
  video.style.display = "none";

  // Play youtube me en gang
  playerContainer.style.display = "block";

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`;

  playerContainer.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function playStream(streamUrl) {
  const video = document.getElementById("video");
  const playerContainer = document.getElementById("player-container");
  const player = document.getElementById("youtubePlayer");

  // Stoppe YouTube
  player.src = "";
  playerContainer.style.display = "none";

  // Vise  video HLS
  video.style.display = "block";

  if (Hls.isSupported()) {
    const hls = new Hls();

    hls.loadSource(streamUrl);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      
      video.play();
    });

  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
  }

  if  (video.canPlayType("application/vnd.apple.mpegurl")) {
               video.src = streamUrl;
                video.play();
          } else if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
          }

  video.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

    
}