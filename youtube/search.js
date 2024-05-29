// bruh can i die
let currentPage = 1;
let searchQuery = '';
function searchVideos(query, page = 1) {
    const searchUrl = `https://vid.puffyan.us/api/v1/search?q=${encodeURIComponent(query)}&page=${page}&type=all`;

    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        const searchResults = document.getElementById('search-results');

        if (page === 1) {
        searchResults.innerHTML = '';
        }

        data.forEach(result => {
        if (result.type === 'video') {
            const videoElement = document.createElement('div');
            videoElement.classList.add('member-card', 'p-3', 'mb-4');

            videoElement.innerHTML = `
            <div class="row g-4">
                <div class="col-md-4">
                <img src="${result.videoThumbnails[0].url}" alt="${result.title}" class="img-fluid rounded mb-3">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${result.title}</h5>
                    <p class="card-text mb-1">By: ${result.author}</p>
                    <p class="card-text mb-1">Views: ${result.viewCount}</p>
                    <p class="card-text mb-3">Published: ${result.publishedText}</p>
                    <a href="viewer.html?id=${result.videoId}" class="btn btn-outline-light">Watch</a>
                </div>
                </div>
            </div>
            `;

            searchResults.appendChild(videoElement);
        } else if (result.type === 'playlist') {
            const playlistElement = document.createElement('div');
            playlistElement.classList.add('member-card', 'p-3', 'mb-4');

            playlistElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${result.playlistThumbnail}" alt="${result.title}" class="img-fluid rounded mb-3">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${result.title}</h5>
                    <p class="card-text mb-1">By: ${result.author}</p>
                    <p class="card-text mb-1">Video Count: ${result.videoCount}</p>
                    <a href="#" class="btn btn-outline-light">View Playlist</a>
                </div>
                </div>
            </div>
            `;

            searchResults.appendChild(playlistElement);
        } else if (result.type === 'channel') {
            const channelElement = document.createElement('div');
            channelElement.classList.add('member-card', 'p-3', 'mb-4');

            channelElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${result.authorThumbnails[0].url}" alt="${result.author}" class="img-fluid rounded mb-3">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${result.author}</h5>
                    <p class="card-text mb-1">Subscriber Count: ${result.subCount}</p>
                </div>
                </div>
            </div>
            `;

            searchResults.appendChild(channelElement);
        }
        });

        if (searchResults.innerHTML === '') {
        searchResults.innerHTML = '<p>No results found.</p>';
        }

        if (data.length > 0) {
        document.getElementById('load-more-button').style.display = 'block';
        } else {
        document.getElementById('load-more-button').style.display = 'none';
        }
    })
    .catch(error => console.error('Error fetching the data:', error));
}

document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-input').value.trim();
    if (searchQuery !== '') {
    currentPage = 1;
    searchVideos(searchQuery, currentPage);
    }
});


document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
    const searchQuery = document.getElementById('search-input').value.trim();
    if (searchQuery !== '') {
        currentPage = 1;
        searchVideos(searchQuery, currentPage);
    }
    }
});

document.getElementById('load-more-button').addEventListener('click', function() {
    const currentQuery = document.getElementById('search-input').value.trim();
    if (currentQuery !== '') {
    searchQuery = currentQuery;
    currentPage++;
    searchVideos(searchQuery, currentPage);
    }
});

document.getElementById('load-more-button').style.display = 'none';