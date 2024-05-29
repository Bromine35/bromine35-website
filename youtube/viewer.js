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
  
    // Fetch video details from the API
    fetch(`https://vid.puffyan.us/api/v1/videos/${videoId}`)
      .then(response => response.json())
      .then(data => {
        const videoDetails = document.getElementById('video-details');
        const descriptionLines = data.description.split('\n');
        const formattedDescription = descriptionLines.map(line => `<p>${line}</p>`).join('');
  
        videoDetails.innerHTML = `
        <div class="video-details-card p-4">
            <div class="video-details-header mb-4">
            <h3 class="video-title mb-1">${data.title}</h3>
            <div class="video-published text-muted mb-2">📅 ${new Date(data.published * 1000).toLocaleString()}</div>
            <div class="separator mb-3"></div>
            </div>
            <div class="video-description mb-4">
            ${formattedDescription}
            </div>
            <div class="separator mb-3"></div>
            <div class="video-stats d-flex align-items-center">
            <div class="view-count me-4">
                <span class="view-count-icon">👁️‍🗨️</span>
                <span class="view-count-value">${data.viewCount.toLocaleString()}</span>
            </div>
            <div class="like-count me-4">
                <span class="like-count-icon">👍</span>
                <span class="like-count-value">${data.likeCount}</span>
            </div>
            <div class="dislike-count">
                <span class="dislike-count-icon">👎</span>
                <span class="dislike-count-value">${data.dislikeCount}</span>
            </div>
            </div>
        </div>
        `;
      })
      .catch(error => console.error('Error fetching video details:', error));
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