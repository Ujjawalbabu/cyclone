const STORAGE_KEY = "blogboard-posts";

const form = document.getElementById("blog-form");
const postsContainer = document.getElementById("posts");
const emptyState = document.getElementById("empty-state");
const clearButton = document.getElementById("clear-posts");
const template = document.getElementById("post-template");

const loadPosts = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const savePosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

const renderPosts = (posts) => {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const node = template.content.cloneNode(true);
    node.querySelector(".post-title").textContent = post.title;
    node.querySelector(".post-author").textContent = `By ${post.author}`;
    node.querySelector(".post-date").textContent = new Date(post.createdAt).toLocaleString();
    node.querySelector(".post-content").textContent = post.content;
    postsContainer.appendChild(node);
  });

  emptyState.classList.toggle("hidden", posts.length > 0);
};

let posts = loadPosts();
renderPosts(posts);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title").toString().trim();
  const author = formData.get("author").toString().trim();
  const content = formData.get("content").toString().trim();

  if (!title || !author || !content) {
    return;
  }

  posts.unshift({
    title,
    author,
    content,
    createdAt: new Date().toISOString(),
  });

  savePosts(posts);
  renderPosts(posts);
  form.reset();
});

clearButton.addEventListener("click", () => {
  posts = [];
  savePosts(posts);
  renderPosts(posts);
});
