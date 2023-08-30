$(document).ready(function() {
  const apiUrl = "https://newsapi.org/v2/everything?q=apple&from=2023-08-07&to=2023-08-07&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb";

  $.get(apiUrl, function(data) {
    const articles = data.articles;
    const carouselInner = $(".carousel-inner");
    const carouselIndicators = $(".carousel-indicators");

    articles.forEach(function(article, index) {
      const isActive = index === 0 ? "active" : "";
      const carouselItem = `
        <div class="carousel-item ${isActive}">
          <img src="${article.urlToImage}" class="d-block" alt="Slide ${index + 1}">
          <div class="carousel-caption">
            <h5 class="text-white">${article.title}</h5>
            <p class="text-white">${article.description}</p>
          </div>
        </div>
      `;

      const indicator = `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="${isActive}" aria-label="Slide ${index + 1}"></button>`;

      carouselInner.append(carouselItem);
      carouselIndicators.append(indicator);
    });

    // Initialize the carousel
    new bootstrap.Carousel(document.querySelector('.carousel'), {
      interval: 5000, // Adjust the interval as needed
    });
  });
});



$(document).ready(function() {
  const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb';
  const cardsPerPage = 5; // Display 5 cards per page
  let currentPage = 1;

  function fetchDataFromAPI() {
    return $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json'
    });
  }

  function createCard(article) {
    return `
      <div class="col-md-12 mb-4">
        <div class="card h-100">
          <img src="${article.urlToImage}" class="card-img-top" alt="Card Image">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description}</p>
            <small class="text-muted">${formatDate(article.publishedAt)}</small>
          </div>
        </div>
      </div>
    `;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderCards(pageNumber, data) {
    const start = (pageNumber - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    for (let i = start; i < end && i < data.articles.length; i++) {
      const card = createCard(data.articles[i]);
      cardContainer.append(card);
    }
  }

  function createPaginationButtons(data) {
    const numPages = Math.ceil(data.articles.length / cardsPerPage);
    const pagination = $('#pagination .pagination');
    pagination.empty();

    const numButtonsToShow = 3; // Show only 3 pagination numbers

    const startPage = Math.max(1, currentPage - Math.floor(numButtonsToShow / 2));
    const endPage = Math.min(numPages, startPage + numButtonsToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      const liClass = i === currentPage ? 'page-item active' : 'page-item';
      const button = $(`<li class="${liClass}"><a class="page-link">${i}</a></li>`);
      pagination.append(button);

      button.click(function() {
        currentPage = i;
        renderCards(currentPage, data);
        renderPagination(data);
      });
    }
  }

  function renderPagination(data) {
    const pagination = $('#pagination .pagination');
    pagination.empty();

    createPaginationButtons(data);
  }

  fetchDataFromAPI()
    .done(function(data) {
      renderPagination(data);
      renderCards(currentPage, data);
    })
    .fail(function() {
      alert('Failed to fetch data from the API.');
    });
});




/*--------------*/

$(document).ready(function() {
    const apiUrl = "https://newsapi.org/v2/everything?q=apple&from=2023-08-05&to=2023-08-05&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb";

    $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function(data) {
            if (data.status === "ok") {
                const articles = data.articles;

                articles.forEach(function(article) {
                    const image = $("<img>").attr("src", article.urlToImage).addClass("news-image img-fluid rounded-circle col-5");
                    const title = $("<div>").text(article.title).addClass("news-title font-weight-bold");
                    const publishedAt = $("<div>").text(formatDate(article.publishedAt)).addClass("news-publishedAt small");

                    const details = $("<div>").addClass("news-details d-flex flex-column justify-content-between ms-4");
                    details.append(title, publishedAt);

                    const articleDiv = $("<div>").addClass("news-article d-flex align-items-start justify-content-between p-2 border-bottom");
                    articleDiv.append(image, details);

                    $("#newsContainer").append(articleDiv);
                });
            }

            function formatDate(dateStr) {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
        },
        error: function(error) {
            console.error("Error fetching data:", error);
        }
    });
});










  /* tag clouds*/
 // <!-- Make sure you have included the jQuery library before this code -->
 
 $(document).ready(function () {
     const apiUrl = "https://newsapi.org/v2/everything?q=apple&from=2023-08-05&to=2023-08-05&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb";
 
     $.ajax({
         url: apiUrl,
         method: "GET",
         dataType: "json",
         success: function (data) {
             if (data.status === "ok") {
                 const articles = data.articles;
 
                 let currentArticleIndex = 0;
                 const articlesPerPage = 1;
 
                 function showArticles(startIndex) {
                     $("#news-container").empty();
                     for (let i = startIndex; i < Math.min(startIndex + articlesPerPage, articles.length); i++) {
                         const article = articles[i];
                         const image = $("<img>").attr("src", article.urlToImage).addClass("news-image img-fluid rounded");
                         const title = $("<div>").text(article.title).addClass("news-title font-weight-bold");
                         const publishedAt = $("<div>").text(formatDate(article.publishedAt)).addClass("news-publishedAt text-muted small");
 
                         const details = $("<div>").addClass("news-details").append(title, publishedAt);
                         const articleDiv = $("<div>").addClass("news-article").append(image, details);
                         $("#news-container").append(articleDiv);
                     }
                 }
 
                 $("#prev-btn").on("click", function () {
                     if (currentArticleIndex >= articlesPerPage) {
                         currentArticleIndex -= articlesPerPage;
                         showArticles(currentArticleIndex);
                     }
                 });
 
                 $("#next-btn").on("click", function () {
                     if (currentArticleIndex + articlesPerPage < articles.length) {
                         currentArticleIndex += articlesPerPage;
                         showArticles(currentArticleIndex);
                     }
                 });
 
                 showArticles(currentArticleIndex);
             }
 
             function formatDate(dateStr) {
                 const date = new Date(dateStr);
                 return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
             }
         },
         error: function (error) {
             console.error("Error fetching data:", error);
         }
     });
 });
 
 











// bottom 


$(document).ready(function() {
  const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb';

  let currentIndex = 0;
  let imageUrls = [];

  function getImagesFromAPI() {
    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        if (data.status === 'ok' && data.articles) {
          imageUrls = data.articles.map(article => article.urlToImage);
          displayImages();
          setInterval(rotateImages, 5000); // Rotate every 5 seconds
        }
      },
      error: function(error) {
        console.log('Error fetching data from the API:', error);
      }
    });
  }

  function displayImages() {
    const carouselInner = $('#imageCarousel .carousel-inner');
    carouselInner.empty();

    // Display all sets of 5 images in the carousel
    for (let i = 0; i < imageUrls.length; i += 5) {
      const isActive = i === 0 ? 'active' : '';
      const carouselItem = `
        <div class="carousel-item ${isActive}">
          <div class="row">
            ${generateImageColumns(i)}
          </div>
        </div>
      `;
      carouselInner.append(carouselItem);
    }
  }

  function generateImageColumns(startIndex) {
    let columns = '';
    for (let i = startIndex; i < startIndex + 5 && i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const column = `
        <div class="col-sm-2">
          <img src="${imageUrl}" class="d-block w-100" style="width: 250px; height: 180px;" alt="Slide ${i + 1}">
        </div>
      `;
      columns += column;
    }
    return columns;
  }

  function rotateImages() {
    // No rotation needed as all sets of 5 images are displayed together
  }

  // Get images from the API and start the rotation
  getImagesFromAPI();
});