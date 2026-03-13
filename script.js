// ==========================================
// 1. PREMENNÉ - NAČÍTANIE HTML ELEMENTOV
// ==========================================

const diceBox = document.getElementById("diceBox");
const diceEmoji = document.getElementById("diceEmoji");
const diceNumber = document.getElementById("diceNumber");

const rollBtn = document.getElementById("rollBtn");
const clearBtn = document.getElementById("clearBtn");

const historyCount = document.getElementById("historyCount");
const historyList = document.getElementById("historyList");

let rolls = [];

// ==========================================
// 2. FUNKCIA NA GENEROVANIE NÁHODNÉHO ČÍSLA
// ==========================================

function generateRandomRoll() {
  const random = Math.floor(Math.random() * 6) + 1;
  return random;
}

// ==========================================
// 3. FUNKCIA NA ZMENU ZOBRAZENIA KOCKY
// ==========================================

function updateDiceFace(roll) {
  switch (roll) {
    case 1:
      diceEmoji.textContent = "⚀";
      break;

    case 2:
      diceEmoji.textContent = "⚁";
      break;

    case 3:
      diceEmoji.textContent = "⚂";
      break;

    case 4:
      diceEmoji.textContent = "⚃";
      break;

    case 5:
      diceEmoji.textContent = "⚄";
      break;

    case 6:
      diceEmoji.textContent = "⚅";
      break;
  }
}

// ==========================================
// 4. FUNKCIA NA VYKRESLENIE HISTÓRIE
// ==========================================

function renderHistory() {
  historyList.innerHTML = "";

  if (rolls.length === 0) {
    historyList.innerHTML = `
    <li class="empty-state">
    <span class="empty-icon">🎯</span>
    <div>
    <p class="empty-title">No rolls yet</p>
    <p class="empty-text">Your latest dice results will appear here.</p>
    </div>
    </li>`;

    historyCount.textContent = "0 rolls";
    return;
  }

  for (let i = rolls.length - 1; i >= 0; i--) {
    historyList.innerHTML += `
    <li class="history-item">
    <div class="history-left">
   <div class="history-roll-icon">🎲</div> 
   <div class="history-roll-info">
   <p>Roll #${i + 1}</p>
   <p>Dice result saved</p>
   </div>
    </div>
    <div class="history-value">${rolls[i]}</div>
    </li>`;
  }

  historyCount.textContent =
    rolls.length === 1 ? "1 roll" : `${rolls.length} rolls`;
}

// ==========================================
// 5. FUNKCIA ANIMACIE
// ==========================================

function animateDice() {
  diceBox.classList.remove("roll-animation");

  setTimeout(() => {
    diceBox.classList.add("roll-animation");
  }, 10);

  setTimeout(() => {
    diceBox.classList.remove("roll-animation");
  }, 450);
}

// ==========================================
// 6. FUNKCIA PRE HOD KOCKOU
// ==========================================

function rollDice() {
  const roll = generateRandomRoll();

  animateDice();

  diceNumber.textContent = roll;
  updateDiceFace(roll);

  rolls.push(roll);

  renderHistory();
}

// ==========================================
// 7. FUNKCIA NA VYMAZANIE HISTÓRIE
// ==========================================

function clearHistory() {
  rolls = [];

  diceNumber.textContent = "-";
  diceEmoji.textContent = "🎲";

  renderHistory();
}

// ==========================================
// 8. EVENT LISTENERS
// ==========================================

rollBtn.addEventListener("click", rollDice);
clearBtn.addEventListener("click", clearHistory);

// ==========================================
// 9. ÚVODNÉ ZOBRAZENIE
// ==========================================

renderHistory();
