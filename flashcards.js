let cards = [];
let currentTopic = "All";
let filteredCards = [];
let currentIndex = 0;
let showingAnswer = false;

// Load cards from JSON
fetch("flashcards.json")
  .then(res => res.json())
  .then(data => {
    cards = data;
    filteredCards = [...cards];
    showCard();
  });

// Topic change
function changeTopic() {
  currentTopic = document.getElementById("topicSelect").value;
  filteredCards = currentTopic === "All"
    ? [...cards]
    : cards.filter(card => card.topic === currentTopic);
  currentIndex = 0;
  showCard();
}

// Show current card
function showCard() {
  const text = document.getElementById("card-text");
  const progress = document.getElementById("progress");
  const fill = document.getElementById("progressFill");
  const card = document.getElementById("card");

  if (filteredCards.length === 0) {
    text.textContent = "No cards in this topic";
    progress.textContent = "";
    fill.style.width = "0%";
    return;
  }

  showingAnswer = false;
  card.classList.remove("flipped");

  text.textContent = filteredCards[currentIndex].question;
  progress.textContent =
    `Card ${currentIndex + 1} of ${filteredCards.length}`;

  fill.style.width =
    ((currentIndex + 1) / filteredCards.length) * 100 + "%";
}

// Flip card
function flipCard() {
  if (filteredCards.length === 0) return;

  const card = document.getElementById("card");
  const text = document.getElementById("card-text");
  const current = filteredCards[currentIndex];

  showingAnswer = !showingAnswer;
  card.classList.toggle("flipped");

  text.textContent = showingAnswer
    ? current.answer
    : current.question;
}

// Next/Prev card
function nextCard() {
  if (filteredCards.length === 0) return;
  currentIndex = (currentIndex + 1) % filteredCards.length;
  showCard();
}

function prevCard() {
  if (filteredCards.length === 0) return;
  currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;
  showCard();
}

// Shuffle
function shuffleCards() {
  filteredCards.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  showCard();
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") flipCard();
  if (e.code === "ArrowRight") nextCard();
  if (e.code === "ArrowLeft") prevCard();
  if (e.key.toLowerCase() === "s") shuffleCards();
});
