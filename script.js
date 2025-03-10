let lastGeneratedPost = ""; // To store the last generated post for restore function

function generatePost() {
  let title = document.getElementById("movieTitle").value;
  let summary = document.getElementById("movieSummary").value;
  let videoSrc = document.getElementById("videoSource").value;
  let poster = document.getElementById("moviePoster").value;
  let imdb = document.getElementById("imdbRating").value;
  let imdbID = document.getElementById("imdbID").value;
  let genre = document.getElementById("genre").value;
  let quality = document.getElementById("quality").value;
  let releaseDate = document.getElementById("releaseDate").value;
  let fileSize = document.getElementById("fileSize").value;
  let language = document.getElementById("language").value;
  let actors = document.getElementById("actors").value;
  let screenshot1 = document.getElementById("screenshot1").value;
  let screenshot2 = document.getElementById("screenshot2").value;
  let downloadLink = document.getElementById("downloadLink").value;
  let showonposter = document.getElementById("showonposter").value;

  let postHTML = `
<!--Movie Poster-->
<div class="separator" style="clear: both; text-align: center;">
    <a href="${poster}">
        <img alt="Movie Poster" border="0" src="${poster}" />
    </a>
</div>

<!--Video Player Section-->
<div id="playlist-one"></div>
<script>
    playlists = [{ src: "${videoSrc}" }];
</script>

<!--Movie Details Section-->
<div class="moviewrap">
    <div style="text-align: left;"><br /></div><h1>Movie Summary</h1>
    <p>${summary}</p><p><br /></p>

<!--Movie Information-->
    <h2>Movie Details</h2><div class="info-container"><ul class="movie-details">
            <li><strong>Movie Name:</strong> ${title}</li>
            <li><strong>Genre:</strong> ${genre}</li>
            <li><strong>IMDB Rating:</strong>&nbsp;<a href="http://imdb.com/title/${imdbID}" target="_blank"> ${imdb}</a></li>
            <li><strong>Quality:</strong> ${quality}</li>
            <li><strong>Released:</strong> ${releaseDate}</li>
            <li><strong>Size:</strong> ${fileSize}</li>
            <li><strong>Language:</strong> ${language}</li>
            <li><strong>Actors:</strong> ${actors}</li>
        </ul>

        <!--Right Side: Movie Poster-->
        <div class="info-poster" style="text-align: center;">
            <a href="${poster}">
                <img alt="Movie Poster" height="200" src="${poster}" width="180" />
            </a>
        </div>
    </div>

<!--Screenshots-->
    <div style="text-align: left;"><br /></div><h2>Screenshots</h2>
    <div class="screenshots" style="text-align: center;">
    <img alt="Screenshot 1" height="200" src="${screenshot1}" width="300" />        
    <img alt="Screenshot 2" height="200" src="${screenshot2}" width="300" />
  </div>
  
<!--Website Info-->
    <div class="site-desc"><b class="url"><br /></b></div><div class="site-desc">
        <b class="url"><a href="https://cinexfy.blogspot.com/">CinexFy</a></b> Provides Fast and Secure HD Movies for Free Watch and Downloads.
    </div><div class="site-desc"><br /></div>
  
<!--Download Section-->
    <h3 style="text-align: left;">Download Full Movie</h3><div><p>Click The Download Button&nbsp;<b>${title}</b>&nbsp;Full HD Movie with High-speed Links.</p></div><div><br /></div>
    <div class="download-section">
        <a class="btn dl red" href="${downloadLink}" rel="nofollow" target="_blank">
            <i class="fa fa-magnet"></i>  Download</a>
    </div>

<!--Additional Information-->
    <b>{rating}=${imdb}</b>
    <b>{type}=${quality}</b>
    <b>{khdub}</b>
    <b>{year}=2025</b>
    ${showonposter}

</div>

<!--CSS for Styling-->
<style>
    .moviewrap {
        max-width: 800px;
        margin: 0 auto;
        text-align: left;
    }

    .info-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
    }

    .movie-details {
        list-style: none;
        padding: 0;
        flex: 1;
    }

    .info-poster {
        max-width: 200px;
    }

    .info-poster img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }

    .screenshots img {
        max-width: 45%;
        margin: 5px;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }

    .download-section {
        text-align: center;
    }

    .btn.dl.red {
        background-color: #d32f2f;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
    }

    .btn.dl.red:hover {
        background-color: #b71c1c;
    }

    /* Responsive Design for Mobile */
    @media (max-width: 768px) {
        .info-container {
            flex-direction: column;
            align-items: center;
        }

        .info-poster {
            order: 1; /* Moves the poster below movie details */
            max-width: 100%; /* Makes it responsive */
            text-align: center;
        }

        .info-poster img {
            max-width: 80%; /* Adjust width for better display */
        }

        .movie-details {
            order: 0; /* Ensures movie details stay above */
            text-align: left;
        }
    }
</style>
`;
  
  lastGeneratedPost = postHTML; // Save for restore
  document.getElementById("generatedPost").value = postHTML;
}

// Copy to Clipboard
function copyPost() {
  let textArea = document.getElementById("generatedPost");
  textArea.select();
  document.execCommand("copy");
  alert("Post copied to clipboard!");
}

// Clear Generated Post
function cleanPost() {
  document.getElementById("generatedPost").value = "";
}

// Restore Last Generated Post
function restorePost() {
  document.getElementById("generatedPost").value = lastGeneratedPost;
}