/* NAVIGATION */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

/* BOOK QUOTES */
const bookQuotes = [
  {
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    book: "Pride and Prejudice",
    author: "Jane Austen"
  },
  {
    text: "Not all those who wander are lost.",
    book: "The Lord of the Rings",
    author: "J.R.R. Tolkien"
  },
  {
    text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    book: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling"
  },
  {
    text: "Big Brother is Watching You.",
    book: "1984",
    author: "George Orwell"
  }
];

let quoteIndex = 0;

function rotateQuote() {
  const q = bookQuotes[quoteIndex];
  document.getElementById("quoteText").textContent = `"${q.text}"`;
  document.getElementById("quoteSource").textContent = `— ${q.author}, ${q.book}`;
  quoteIndex = (quoteIndex + 1) % bookQuotes.length;
}

rotateQuote();
setInterval(rotateQuote, 5000);

/* AUTHOR OF THE DAY */
const authors = [
  {
    name: "Jane Austen",
    desc: "Known for her romantic fiction and social commentary."
  },
  {
    name: "George Orwell",
    desc: "Famous for dystopian and political literature."
  },
  {
    name: "J.K. Rowling",
    desc: "Creator of the Harry Potter fantasy universe."
  }
];

const dayIndex = new Date().getDate() % authors.length;
document.getElementById("authorDayName").textContent = authors[dayIndex].name;
document.getElementById("authorDayDesc").textContent = authors[dayIndex].desc;

/* NEWSLETTER */
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value;
  localStorage.setItem("readifyNewsletter", email);
  alert("Thank you for subscribing!");
  this.reset();
});




/* RANDOM BOOK RECOMMENDER DATA */
const recommendBooks = [
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", length: "Medium" },
  { title: "1984", author: "George Orwell", genre: "Dystopian", length: "Medium" },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", length: "Long" },
  { title: "Animal Farm", author: "George Orwell", genre: "Dystopian", length: "Short" }
];

const pickBtn = document.getElementById("pickBookBtn");
const card = document.getElementById("recommendationCard");

if (pickBtn) {
  pickBtn.addEventListener("click", pickRandomBook);
}

function pickRandomBook() {
  const genre = document.getElementById("recGenre").value;
  const length = document.getElementById("recLength").value;

  let filtered = recommendBooks.filter(book =>
    (genre === "" || book.genre === genre) &&
    (length === "" || book.length === length)
  );

  if (filtered.length === 0) {
    alert("No books match your selection.");
    return;
  }

  const randomBook = filtered[Math.floor(Math.random() * filtered.length)];

  document.getElementById("recTitle").textContent = randomBook.title;
  document.getElementById("recAuthor").textContent = `by ${randomBook.author}`;
  document.getElementById("recGenreText").textContent = `Genre: ${randomBook.genre}`;
  document.getElementById("recLengthText").textContent = `Length: ${randomBook.length}`;

  card.style.display = "block";
}

/* PICK AGAIN */
document.getElementById("pickAgainBtn")?.addEventListener("click", pickRandomBook);

/* SAVE TO READING LIST */
document.getElementById("saveRecBtn")?.addEventListener("click", () => {
  const title = document.getElementById("recTitle").textContent;
  let list = JSON.parse(localStorage.getItem("readingList")) || [];

  if (!list.includes(title)) {
    list.push(title);
    localStorage.setItem("readingList", JSON.stringify(list));
    alert("Book saved to your reading list!");
  } else {
    alert("This book is already in your reading list.");
  }
});

function saveDailyGoal() {
  var minutes = document.getElementById("dailyMinutes").value;
  var message = document.getElementById("goalMessage");

  if (minutes === "" || minutes <= 0) {
    message.textContent = "Please enter a valid number.";
    return;
  }

  localStorage.setItem("dailyGoal", minutes);
  message.textContent = "Daily goal saved: " + minutes + " minutes";
}

/* FEEDBACK FORM */
var form = document.getElementById("feedbackForm");

if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var confirm = document.getElementById("confirmMessage");

    if (name === "" || email === "" || message === "") {
      confirm.textContent = "Please fill in all fields.";
      return;
    }

    var feedback = {
      name: name,
      email: email,
      message: message
    };

    localStorage.setItem("feedback", JSON.stringify(feedback));
    confirm.textContent = "Thank you for your feedback!";
    form.reset();
  };
}

/* FAQ ACCORDION */
var questions = document.getElementsByClassName("faq-question");

for (var i = 0; i < questions.length; i++) {
  questions[i].onclick = function () {
    var answer = this.nextElementSibling;
    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
  };
}