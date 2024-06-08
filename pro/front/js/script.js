window.onload = function() {
    displayPosts();
  };
  
  function displayPosts() {
    let postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; 
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(function(post, index) {
        let postIt = document.createElement('div');
        postIt.className = 'post-it';
  
        let num = document.createElement('div');
        num.className = 'num';
        num.textContent = index + 1;
        postIt.appendChild(num);
  
        let name = document.createElement('div');
        name.className = 'name';
        name.textContent = post.name;
        postIt.appendChild(name);
  
        let message = document.createElement('div');
        message.className = 'message';
        message.textContent = post.message;
        postIt.appendChild(message);
  
        let date = document.createElement('div');
        date.className = 'date';
        date.textContent = new Date(post.date).toLocaleString();
        postIt.appendChild(date);
  
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = "삭제";
        deleteBtn.onclick = function() {
            deletePost(index);
        };
        postIt.appendChild(deleteBtn);
  
        postsContainer.appendChild(postIt);
    });
  }
  
  function deletePost(postIndex) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(postIndex, 1); 
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts(); 
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var openModalBtn = document.getElementById("openModalBtn");
    var closeModalBtn = document.getElementById("closeModalBtn");
    var guestbookForm = document.getElementById("guestbookForm");
  
    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }
  
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }
  
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
  
    guestbookForm.onsubmit = function(event) {
        event.preventDefault();
  
        var name = document.getElementById("name").value;
        var message = document.getElementById("message").value;
        var posts = JSON.parse(localStorage.getItem('posts')) || [];
  
        posts.push({
            name: name,
            message: message,
            date: new Date().toISOString()
        });
  
        localStorage.setItem('posts', JSON.stringify(posts));
  
        guestbookForm.reset();
        modal.style.display = "none";
        displayPosts();
    }
  });