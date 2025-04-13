const cardsContainer = document.querySelector('.cards');
const buttons = document.querySelectorAll('.grid');

const cardItems = [
  '🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥝', '🍍',
  '🍑', '🥥', '🥑', '🌽', '🍅', '🍆', '🥕', '🥔',
  '🧄', '🧅', '🍞', '🧀', '🍗', '🍖', '🥩', '🍔',
  '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🥙', '🍳'
];

let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;
let tries = 0;
let totalPairs = 0;

function createCards(gridSize) {
  cardsContainer.innerHTML = ''; 
  flippedCards = [];
  lockBoard = false;
  matchedPairs = 0;
  tries = 0;
  const totalCards = gridSize * gridSize;
  totalPairs = totalCards / 2;
  const neededItems = shuffle(cardItems).slice(0, totalPairs);
  const duplicatedItems = shuffle([...neededItems, ...neededItems]); 

  duplicatedItems.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="display: flex; justify-content: center; align-items: center; font-size: 2rem; background-color: white;">${symbol}</div>
      </div>
    `;
    card.addEventListener('click', () => handleCardClick(card));
    cardsContainer.appendChild(card);
  });

  cardsContainer.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;

  let baseWidth = 40;
  if (gridSize === 6) baseWidth = 40 + 15;
  else if (gridSize === 8) baseWidth = 40 + 30;
  cardsContainer.style.width = baseWidth + '%';
}

function handleCardClick(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    tries++;
    const [first, second] = flippedCards;
    if (first.dataset.symbol === second.dataset.symbol) {
      flippedCards = [];
      matchedPairs++;
      if (matchedPairs === totalPairs) {
        setTimeout(() => {
          alert(`You win with ${tries} tries!`);
        }, 500);
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (btn.id === 'four') createCards(4);
    else if (btn.id === 'six') createCards(6);
    else if (btn.id === 'eight') createCards(8);
  });
});

createCards(4);