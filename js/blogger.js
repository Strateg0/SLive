
  // Save post to localStorage and update the UI
  function savePost() {
    const topic = document.getElementById('topic').value;
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const date = new Date().toLocaleDateString();

    const post = { topic, author, title, description, imageUrl, date };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    displayPosts();
    clearForm();
  }

//   function displayPosts() {
//     const posts = JSON.parse(localStorage.getItem('posts')) || [];
//     const container = document.getElementById('blog-posts');
//     container.innerHTML = '';

//     posts.forEach(post => {
//       container.innerHTML += `
//         <a href="blog-single.html" class="col-lg-6 blog-article-post">
//           <div class="blog-post d-flex flex-wrap align-description-between">
//             <div class="post-description">
//               <img src="${post.imageUrl}" class="img-fluid" alt="blog-post-image" />
//               <p class="sub-para my-3">${post.topic}</p>
//               <h4 class="text-head-text-9">${post.title}</h4>
//             </div>
//              <ul class="blog-author-date mt-4 px-0">
//               <li class="author">By ${post.author} &nbsp; Date: <strong>${post.date}</strong></li>
//             </ul>
//           </div>
//         </a>
//       `;
//     });
//   }

function displayPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const table = document.getElementById('archive-table');
  table.innerHTML = '';

  posts.forEach((post, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${post.title}</td>
        <td>${post.topic}</td>
        <td>${post.author}</td>
        <td>${post.date}</td>
        <td><a href="blog.html?id=${index}">View</a></td>
      </tr>
    `;
  });
}


  function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('imageUrl').value = '';
  }

  // Load posts on page load
  window.onload = displayPosts;

