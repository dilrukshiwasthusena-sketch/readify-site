document.addEventListener("DOMContentLoaded", () => {
  renderBooks();

});


const books = [

  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Fantasy",
    image: "assets/books/book1.jpg",
    synopsis: "A young wizard discovers his magical destiny.",
    series: ["Chamber of Secrets", "Prisoner of Azkaban"],
    reviews: [
      { name: "Anna", rating: "5/5", comment: "Amazing!" },
      { name: "John", rating: "4.5/5", comment: "Magical story" }
    ]
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Classic",
    image: "assets/books/book2.jpg",
    synopsis: "A dystopian future ruled by surveillance.",
    series: [],
    reviews: [
      { name: "Sara", rating: "5/5", comment: "Very deep" }
    ]
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    image: "assets/books/book3.jpg",
    synopsis: "A battle for control over a desert planet.",
    series: ["Dune Messiah", "Children of Dune"],
    reviews: [
      { name: "Mike", rating: "4/5", comment: "Epic sci-fi" }
    ]
  }
];

function renderBooks() {
  const bookGrid = document.getElementById("bookGrid");
  if (!bookGrid) return;

  bookGrid.innerHTML = "";

  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
    `;

    card.addEventListener("click", () => {
      alert(book.title + " clicked");
    });

    bookGrid.appendChild(card);
  });
}
const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

function displayBooks(list) {
  grid.innerHTML = "";
  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.image}">
      <div class="info">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
      </div>
    `;
    card.onclick = () => openModal(book);
    grid.appendChild(card);
  });
}

function openModal(book) {
  document.getElementById("bookModal").style.display = "flex";
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = book.author;
  document.getElementById("modalSynopsis").textContent = book.synopsis;

  const series = document.getElementById("modalSeries");
  series.innerHTML = "";
  book.series.length
    ? book.series.forEach(s => series.innerHTML += `<li>${s}</li>`)
    : series.innerHTML = "<li>None</li>";

  const reviews = document.getElementById("modalReviews");
  reviews.innerHTML = "";
  book.reviews.forEach(r => {
    reviews.innerHTML += `<tr><td>${r.name}</td><td>${r.rating}</td><td>${r.comment}</td></tr>`;
  });
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("bookModal").style.display = "none";
};

function filterBooks() {
  const text = searchInput.value.toLowerCase();
  const genre = genreFilter.value;

  const filtered = books.filter(b =>
    (b.title.toLowerCase().includes(text) || b.author.toLowerCase().includes(text)) &&
    (genre === "all" || b.genre === genre)
  );
  displayBooks(filtered);
}

searchInput.addEventListener("input", filterBooks);
genreFilter.addEventListener("change", filterBooks);

displayBooks(books);
