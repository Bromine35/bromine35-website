function embedVideo(videoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center;">
        <div style="position: relative; padding-bottom: 56.25%; width: 100%; max-width: 1280px;">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
  }
  window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');
    if (videoId) {
      embedVideo(videoId);
    }
  };

  document.getElementById('fetch-video').addEventListener('click', function() {
    const videoId = document.getElementById('youtube-id').value;
    if (videoId) {
      embedVideo(videoId);
    } else {
      alert('Please enter a valid YouTube ID.');
    }
  });