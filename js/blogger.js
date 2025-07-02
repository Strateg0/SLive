
  // Save post to localStorage and update the UI
  function savePost() {
    const topic = document.getElementById('topic').value;
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const date = new Date().toLocaleDateString();

    const post = { topic, author, title, content, imageUrl, date };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    displayPosts();
    clearForm();
  }

  function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const container = document.getElementById('blog-posts');
    container.innerHTML = '';

    posts.forEach(post => {
      container.innerHTML += `
        <a href="blog-single.html" class="col-lg-6 blog-article-post">
          <div class="blog-post d-flex flex-wrap align-content-between">
            <div class="post-content">
              <img src="${post.imageUrl}" class="img-fluid" alt="blog-post-image" />
              <p class="sub-para my-3">${post.topic}</p>
              <h4 class="text-head-text-9">${post.title}</h4>
            </div>
             <ul class="blog-author-date mt-4 px-0">
              <li class="author">By ${post.author} &nbsp; Date: <strong>${post.date}</strong></li>
            </ul>
          </div>
        </a>
      `;
    });
  }

  function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('imageUrl').value = '';
  }

  // Load posts on page load
  window.onload = displayPosts;

