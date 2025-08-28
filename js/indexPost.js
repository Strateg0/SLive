// * Catches the latest post from the blog Category Only | As requested * //
  async function loadLatestPost() {
    try {
      const response = await fetch(
        `https://strategma.bg/content/?rest_route=/wp/v2/posts&categories=21&per_page=5&_embed`
      );
      const posts = await response.json();

      if (posts.length > 0) {
        renderLatestPost(posts[0]);
      } else {
        document.getElementById('blog-posts').innerHTML = '<p>No posts found in this category.</p>';
      }
    } catch (error) {
      console.error("Error loading latest post:", error);
      document.getElementById('blog-posts').innerHTML =
        '<p>Failed to load latest article.</p>';
    }
  }

  function renderLatestPost(post) {
    const container = document.getElementById('blog-posts');

    let imgSrc = '';
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      imgSrc = post._embedded['wp:featuredmedia'][0].source_url;
    }

    const authorName = post._embedded?.author?.[0]?.name || 'Unknown';
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || '';
    const publishedDate = new Date(post.date).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const postHTML = `
      <a href="${post.link}" class="latest-blog-post" target="_blank" rel="noopener noreferrer">
        <div class="blog-post mb-0 d-block d-md-block d-lg-block d-xl-flex flex-lg-nowrap align-items-center">
          <div class="post-image me-4 mb-3 mb-md-0" style="flex: 0 0 200px;">
            ${imgSrc ? `<img src="${imgSrc}" class="card-img-top" alt="${post.title.rendered}">` : ''}
          </div>
          <div class="post-content flex-grow-1">
            <p class="sub-para my-3 fw-bold">${categoryName}</p>
            <h4 class="text-head-text-9 fw-bold">${post.title.rendered}</h4>
            <ul class="blog-author-date mt-4 px-0">
              <li class="author fw-bold">By ${authorName} &nbsp; Date: <strong>${publishedDate}</strong></li>
            </ul>
          </div>
        </div>
      </a>
    `;

    container.innerHTML = postHTML;
  }

  loadLatestPost();
