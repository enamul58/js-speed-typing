const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
 
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayInput = quoteInputElement.value.split("");
 
  let newString = true;
  arrayQuote.forEach((arrayQuoteValue, index) => {
 
    const characterArrayInput = arrayInput[index];

    if (characterArrayInput == null) {
      arrayQuoteValue.classList.remove("incorrect");
      arrayQuoteValue.classList.remove("correct");
      newString = false;
    } else if (characterArrayInput === arrayQuoteValue.innerText) {
      arrayQuoteValue.classList.add("correct");
      arrayQuoteValue.classList.remove("incorrect");
    } else {
      arrayQuoteValue.classList.add("incorrect");
      arrayQuoteValue.classList.remove("correct");
      newString = false;
    }
  });
  if (newString) renderNewQuote();
});

function getRandomQoute() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQoute();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpna = document.createElement("span");
    characterSpna.innerText = character;
    quoteDisplayElement.appendChild(characterSpna);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = countSecond();
  }, 1000);
}

function countSecond() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
