// const MarketTipsCategoryID = 14;

//   // Fetch the main category posts (up to 5)
//   const apiURL = `https://wordpress-fa022.wasmer.app/wp-json/wp/v2/posts?categories=${MarketTipsCategoryID}&per_page=5&_embed`;

//   fetch(apiURL)
//     .then(response => response.json())
//     .then(posts => {
//       let output = '<div class="row g-4">';

//       posts.forEach(post => {
//         let imgSrc = '';
//         if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
//           imgSrc = post._embedded['wp:featuredmedia'][0].source_url;
//         }
//         let authorName = post._embedded?.author?.[0]?.name || 'Unknown';
//         let categoryName = '';
//         if (post._embedded?.['wp:term']?.[0]) {
//           const foundCat = post._embedded['wp:term'][0].find(cat => cat.id === MarketTipsCategoryID);
//           if (foundCat) {
//             categoryName = foundCat.name;
//           }
//         }
//         let publishedDate = new Date(post.date).toLocaleDateString('bg-BG', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric'
//         });

//         output += `
//           <div class="col-md-12 my-3">
//             <div class="cardPass h-100 shadow-sm">
//               ${imgSrc ? `<img src="${imgSrc}" class="card-img-top" alt="${post.title.rendered}">` : ''}
//               <div class="card-body">
//                 <p class="sub-para my-3">${categoryName}</p>
//                 <h4 class="text-head-text-9">
//                   <a href="${post.link}" target="_blank">${post.title.rendered}</a>
//                 </h4>
//               </div>
//               <ul class="blog-author-date mt-4 px-0">
//                 <li class="author">By ${authorName} &nbsp; Date: <strong>${publishedDate}</strong></li>
//               </ul>
//             </div>
//           </div>
//         `;
//       });

//       output += '</div>';
//       document.getElementById('blog-posts').innerHTML = output;
//     })
//     .catch(error => {
//       console.error('Error fetching News posts:', error);
//       document.getElementById('blog-posts').innerHTML = '<p>Неуспешно зареждане на новините.</p>';
//     });


//   // --- RELATED POSTS SECTION ---

//   // Shuffle function
//   function shuffle(array) {
//     let currentIndex = array.length, randomIndex;

//     while (currentIndex != 0) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
//       [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
//     return array;
//   }

//   // Fetch more posts (20) to pick random 4 for related posts
//   const relatedApiURL = `https://wordpress-fa022.wasmer.app/wp-json/wp/v2/posts?per_page=20&_embed`;

//   fetch(relatedApiURL)
//     .then(response => response.json())
//     .then(posts => {
//       const shuffled = shuffle(posts);
//       const relatedPosts = shuffled.slice(0, 4);

//       let output = '<div class="row g-4">';

//       relatedPosts.forEach(post => {
//         let imgSrc = '';
//         if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
//           imgSrc = post._embedded['wp:featuredmedia'][0].source_url;
//         }

//         let publishedDate = new Date(post.date).toLocaleDateString('bg-BG', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric'
//         });

//         output += `
//           <div class="col-md-12">
//             <div class="cardPass h-100 shadow-sm">
//               ${imgSrc ? `<img src="${imgSrc}" class="card-img-top" alt="${post.title.rendered}">` : ''}
//               <div class="card-body">
//                 <h5 class="sub-para my-3">
//                   <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title.rendered}</a>
//                 </h5>
//               </div>
//             </div>
//           </div>
//         `;
//       });

//       output += '</div>';
//       document.getElementById('related-posts').innerHTML = output;
//     })
//     .catch(error => {
//       console.error('Error fetching related posts:', error);
//       document.getElementById('related-posts').innerHTML = '<p>Неуспешно зареждане на свързаните публикации.</p>';
//     });



// * Fetching data from Strategma Blog - Generated in new.html Page * //
document.addEventListener('DOMContentLoaded', function() {
  const MarketTipsCategoryID = 21; // Category ID for your new URL
  const container = document.getElementById('blog-posts');

  if (!container) {
    console.error('Container #blog-posts not found');
    return;
  }

  // WordPress REST API URL with ?rest_route=
  const apiURL = `https://strategma.bg/content/?rest_route=/wp/v2/posts&categories=${MarketTipsCategoryID}&per_page=5&_embed`;

  // AllOrigins proxy can be reomoved just testing
  const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiURL);

  fetch(proxyUrl)
    .then(response => response.json())
    .then(data => {
      let posts;
      try {
        posts = JSON.parse(data.contents);
      } catch (err) {
        console.error('Failed to parse JSON from proxy:', data.contents);
        container.innerHTML = '<p>Неуспешно зареждане на новините.</p>';
        return;
      }

      if (!Array.isArray(posts) || posts.length === 0) {
        container.innerHTML = '<p>Няма новини за показване.</p>';
        return;
      }

      let output = '<div class="row g-4">';
      posts.forEach(post => {
        const imgSrc = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        const authorName = post._embedded?.author?.[0]?.name || 'Unknown';
        let categoryName = '';
        if (post._embedded?.['wp:term']?.[0]) {
          const foundCat = post._embedded['wp:term'][0].find(cat => cat.id === MarketTipsCategoryID);
          if (foundCat) categoryName = foundCat.name;
        }
        const publishedDate = new Date(post.date).toLocaleDateString('bg-BG', {
          year: 'numeric', month: 'long', day: 'numeric'
        });

        output += `
          <div class="col-md-12 my-3">
            <div class="cardPass h-100 shadow-sm">
              ${imgSrc ? `<img src="${imgSrc}" class="card-img-top" alt="${post.title.rendered}">` : ''}
              <div class="card-body">
                <p class="sub-para my-3">${categoryName}</p>
                <h4 class="text-head-text-9">
                  <a href="${post.link}" target="_blank">${post.title.rendered}</a>
                </h4>
              </div>
              <ul class="blog-author-date mt-4 px-0">
                <li class="author">By ${authorName} &nbsp; Date: <strong>${publishedDate}</strong></li>
              </ul>
            </div>
          </div>
        `;
      });
      output += '</div>';
      container.innerHTML = output;
    })
    .catch(error => {
      console.error('Error fetching posts via proxy:', error);
      container.innerHTML = '<p>Неуспешно зареждане на новините.</p>';
    });
});


  // --- RELATED POSTS SECTION ---
 // Shuffle helper
  function shuffle(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  // Fetch up to 20 posts (can go higher, e.g. 100, if your WP allows)
  const relatedApiURL = `https://strategma.bg/content/?rest_route=/wp/v2/posts&per_page=20&_embed`;

  fetch(relatedApiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(posts => {
      if (!posts.length) {
        document.getElementById('related-posts').innerHTML =
          '<p>Няма свързани публикации.</p>';
        return;
      }

      // Shuffle all available posts
      const shuffled = shuffle(posts);

      // Pick 4 random ones (or fewer if less exist)
      const relatedPosts = shuffled.slice(0, Math.min(4, shuffled.length));

      let output = '<div class="row g-4">';

      relatedPosts.forEach(post => {
        let imgSrc = '';
        if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
          imgSrc = post._embedded['wp:featuredmedia'][0].source_url;
        }

        let publishedDate = new Date(post.date).toLocaleDateString('bg-BG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        output += `
          <div class="col-md-12">
            <div class="cardPass h-100 shadow-sm">
              ${imgSrc ? `<img src="${imgSrc}" class="card-img-top" alt="${post.title.rendered}">` : ''}
              <div class="card-body">
                <h5 class="sub-para my-3">
                  <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title.rendered}</a>
                </h5>
                <p class="text-muted"><small>${publishedDate}</small></p>
              </div>
            </div>
          </div>
        `;
      });

      output += '</div>';
      document.getElementById('related-posts').innerHTML = output;
    })
    .catch(error => {
      console.error('Error fetching related posts:', error);
      document.getElementById('related-posts').innerHTML =
        '<p>Неуспешно зареждане на свързаните публикации.</p>';
    });