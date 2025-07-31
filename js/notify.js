
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBdPuebdQh5m7GoPfUyG-dtL0eCbqE1BtE",
    authDomain: "blog-bd628.firebaseapp.com",
    projectId: "blog-bd628",
    storageBucket: "blog-bd628.appspot.com",
    messagingSenderId: "548493041269",
    appId: "1:548493041269:web:07460e97568e656a57623c",
    measurementId: "G-RCBHBBJWJD"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // ✅ Fetch all published blog posts
  async function loadAllPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];

    querySnapshot.forEach(docSnap => {
      const post = docSnap.data();
      const category = (post.category || 'blog').toLowerCase();

      if (post.published && category === 'blog') {
        posts.push({ ...post, id: docSnap.id });
      }
    });

    // Sort newest first
    posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));


    updateNotificationDropdown(posts);
  }


  // ✅ Get and update read post IDs in localStorage
  function getReadPosts() {
    return JSON.parse(localStorage.getItem('readPostIds') || '[]');
  }

  function markPostAsRead(postId) {
    const read = getReadPosts();
    if (!read.includes(postId)) {
      read.push(postId);
      localStorage.setItem('readPostIds', JSON.stringify(read));
    }
  }

  // ✅ Update the notification bell dropdown
  function updateNotificationDropdown(posts) {
    const notifContainer = document.getElementById('notification-posts');
    const badge = document.getElementById('notificationBadge');

    const readPosts = getReadPosts();
    const unreadPosts = posts.filter(post => !readPosts.includes(post.id));

    // Show count (even if 0)
    badge.textContent = unreadPosts.length;
    badge.style.display = 'inline-block';

    // Clear current dropdown
    notifContainer.innerHTML = '';

    if (unreadPosts.length === 0) {
      notifContainer.innerHTML = `<small class="text-muted">No new articles</small>`;
      return;
    }

    // Render each unread post
    unreadPosts.forEach(post => {
      const link = document.createElement('a');
      link.href = `blog-single.html?id=${post.id}`;
      link.className = 'text-decoration-none text-dark d-block small mb-2';
      link.innerHTML = `
        🆕 <strong>${post.title}</strong><br>
        <span class="text-muted">${post.topic} &nbsp; Date: ${post.date}</span>
      `;

      // Mark as read when clicked
      link.addEventListener('click', () => {
        markPostAsRead(post.id);
      });

      notifContainer.appendChild(link);
    });
  }

  // ✅ Load posts when page is ready
  window.addEventListener('DOMContentLoaded', loadAllPosts);
