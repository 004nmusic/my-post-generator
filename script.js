const tmdbApiKey = "2c28925ee1fb74cc1d60a3d08185f47e";
const omdbApiKey = "79e75c27";

function fetchMovieData() {
    let imdbId = document.getElementById("imdbIdInput").value.trim();
    let tmdbId = document.getElementById("tmdbIdInput").value.trim();

    if (!imdbId && !tmdbId) {
        return alert("Please enter an IMDb or TMDB ID!");
    }

    // Fetch full movie details from IMDb (OMDb API)
    if (imdbId.startsWith("tt")) {
        fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${omdbApiKey}`)
            .then(response => response.json())
            .then(data => updateMovieDetails(data))
            .catch(error => console.error("Error fetching IMDb data:", error));
    }

    // Fetch only images, budget, and keywords from TMDB
    if (tmdbId) {
        fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${tmdbApiKey}&append_to_response=images`)
            .then(response => response.json())
            .then(data => {
                updateMovieImages(data);
                updateMovieExtraDetails(tmdbId); // Fetch keywords separately
            })
            .catch(error => console.error("Error fetching TMDB data:", error));
    }
}

function updateMovieDetails(movie) {
    if (!movie || movie.Response === "False") {
        alert("Movie not found on IMDb!");
        return;
    }

    // Fill Movie Information
    document.getElementById("movieName").value = movie.Title || "Unknown";
    document.getElementById("movieStory").value = movie.Plot || movie.Overview || "No Description Available";
    document.getElementById("releaseDate").value = formatDate(movie.Released);
    document.getElementById("genre").value = movie.Genre || "Unknown";
    document.getElementById("rating").value = movie.imdbRating || "N/A";
    document.getElementById("language").value = movie.Language || "Multi-Dubbed";
    document.getElementById("director").value = movie.Director || "Unknown";
    document.getElementById("cast").value = movie.Actors || "Unknown";
    document.getElementById("imdbId").value = movie.imdbID;
    document.getElementById("runtime").value = movie.Runtime || "Unknown";
    document.getElementById("year").value = movie.Year;
}

function updateMovieImages(movie) {
    if (!movie || !movie.images || !movie.images.backdrops || movie.images.backdrops.length === 0) {
        alert("No images found on TMDB!");
        return;
    }

    let posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    let backdrops = movie.images.backdrops;
    let backdrop1Path = backdrops.length > 2 ? `https://image.tmdb.org/t/p/w780${backdrops[2].file_path}` : posterPath;
    let backdrop2Path = backdrops.length > 3 ? `https://image.tmdb.org/t/p/w780${backdrops[3].file_path}` : backdrop1Path;

    document.getElementById("posterUrl").value = posterPath;
    document.getElementById("posterPreview").src = posterPath;
    document.getElementById("backdrop1Url").value = backdrop1Path;
    document.getElementById("backdrop1Preview").src = backdrop1Path;
    document.getElementById("backdrop2Url").value = backdrop2Path;
    document.getElementById("backdrop2Preview").src = backdrop2Path;

    // Budget from TMDB
    document.getElementById("budget").value = movie.budget ? `$${movie.budget.toLocaleString()}` : "Unknown";
}

function updateMovieExtraDetails(tmdbId) {
    // Fetch Keywords from TMDB
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/keywords?api_key=${tmdbApiKey}`)
        .then(response => response.json())
        .then(keywordData => {
            let keywords = keywordData.keywords.map(kw => kw.name).join(", ");
            document.getElementById("keywords").value = keywords || "No keywords available";
        })
        .catch(error => console.error("Error fetching TMDB keywords:", error));
}

function formatDate(dateString) {
    if (!dateString) return "N/A";
    let date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
}

function generateDetails() {
    let postContent = `
Movie Name: ${document.getElementById("movieName").value}
Story: ${document.getElementById("movieStory").value}
Release Date: ${document.getElementById("releaseDate").value}
Genre: ${document.getElementById("genre").value}
IMDB Rating: ${document.getElementById("rating").value}
Year: ${document.getElementById("year").value}
Language: ${document.getElementById("language").value}
Director: ${document.getElementById("director").value}
Cast: ${document.getElementById("cast").value}
IMDB ID: ${document.getElementById("imdbId").value}
Runtime: ${document.getElementById("runtime").value}
Budget: ${document.getElementById("budget").value}
Keywords: ${document.getElementById("keywords").value}
Video Source: https://player.autoembed.cc/embed/movie/${document.getElementById("imdbId").value}
Poster: ${document.getElementById("posterUrl").value}
Screenshot 1: ${document.getElementById("backdrop1Url").value}
Screenshot 2: ${document.getElementById("backdrop2Url").value}
Download Link: https://example.video.dw
Show on Poster: <!--Additional Information-->
`;

    document.getElementById("generatedDetails").value = postContent;
}

// **ONLY Works on the Generated Post Box**
function copyToClipboard() {
    let copyText = document.getElementById("generatedDetails");
    copyText.select();
    document.execCommand("copy");
    alert("Copied to Clipboard!");
}

function clearPostBox() {
    document.getElementById("generatedDetails").value = "";
}

function restorePostBox() {
    generatePost();
}

////////////////////Blogger Post Code Generator////////////////////////

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
    <a href="${poster}${document.getElementById("posterUrl").value}">
        <img alt="Movie Poster" border="0" src="${poster}${document.getElementById("posterUrl").value}" />
    </a>
</div>

<!--Video Player Section-->
<div id="playlist-one"></div>
<script>
    playlists = 
    [{ src: "https://player.autoembed.cc/embed/movie/${imdbID}${document.getElementById("imdbId").value}" }];
    
    [{ src: "${videoSrc}" }];
</script>

<!--Movie Details Section-->
<div class="moviewrap">
    <div style="text-align: left;"><br /></div><h1>Movie Summary</h1>
    <p>${summary} ${document.getElementById("movieStory").value}</p><p><br /></p>

<!--Movie Information-->
    <h2>Movie Details</h2><div class="info-container"><ul class="movie-details">
            <li><strong>Movie Name:</strong> ${title}${document.getElementById("movieName").value}</li>
            <li><strong>Genre:</strong> ${genre}</li>
            <li><strong>IMDB Rating:</strong>&nbsp;<a href="http://imdb.com/title/${imdbID}${document.getElementById("imdbId").value}" target="_blank"> ${imdb} ${document.getElementById("rating").value}</a></li>
            <li><strong>Quality:</strong> ${quality}</li>
            <li><strong>Released:</strong> ${releaseDate}</li>
            <li><strong>Size:</strong> ${fileSize}</li>
            <li><strong>Language:</strong> ${language}</li>
            <li><strong>Actors:</strong> ${actors}${document.getElementById("cast").value}</li>
        </ul>

        <!--Right Side: Movie Poster-->
        <div class="info-poster" style="text-align: center;">
            <a href="${poster}${document.getElementById("posterUrl").value}">
                <img alt="Movie Poster" height="200" src="${poster}${document.getElementById("posterUrl").value}" width="180" />
            </a>
        </div>
    </div>

<!--Screenshots-->
    <div style="text-align: left;"><br /></div><h2>Screenshots</h2>
    <div class="screenshots" style="text-align: center;">
    <img alt="Screenshot 1" height="200" src="${screenshot1}${document.getElementById("backdrop1Url").value}" width="300" />        
    <img alt="Screenshot 2" height="200" src="${screenshot2}${document.getElementById("backdrop2Url").value}" width="300" />
  </div>
  
<!--Website Info-->
    <div class="site-desc"><b class="url"><br /></b></div><div class="site-desc">
        <b class="url"><a href="https://cinexfy.blogspot.com/">CinexFy</a></b> Provides Fast and Secure HD Movies for Free Watch and Downloads.
    </div><div class="site-desc"><br /></div>
  
<!--Download Section-->
    <h3 style="text-align: left;">Download Full Movie</h3><div><p>Click The Download Button&nbsp;<b>${title}${document.getElementById("movieName").value}</b>&nbsp;Full HD Movie with High-speed Links.</p></div><div><br /></div>
    <div class="download-section">
        <a class="btn dl red" href="${downloadLink}" rel="nofollow" target="_blank">
            <i class="fa fa-magnet"></i>  Download</a>
    </div>

<!--Additional Information-->
    <b>{rating}=${imdb}${document.getElementById("rating").value}</b>
    <b>{type}=${quality}</b>
    <b>{khdub}</b>
    <b>{year}=${document.getElementById("year").value}</b>
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