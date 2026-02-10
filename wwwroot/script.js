const operationEl = document.getElementById('operation');
const form = document.getElementById('quiz-form');
const answerInput = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next');

let currentLeft = 0;
let currentRight = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newOperation() {
  currentLeft = randomInt(1, 10);
  currentRight = randomInt(1, 10);
  operationEl.textContent = `${currentLeft} × ${currentRight}`;
  answerInput.value = '';
  feedback.textContent = '';
  feedback.className = 'feedback';
  answerInput.focus();
}

async function checkAnswer(answer) {
  const response = await fetch('/api/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ left: currentLeft, right: currentRight, answer })
  });

  if (!response.ok) {
    throw new Error('Erreur serveur');
  }

  return response.json();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const answer = Number(answerInput.value);

  if (Number.isNaN(answer)) {
    feedback.textContent = 'Merci de saisir un nombre.';
    feedback.className = 'feedback error';
    return;
  }

  try {
    const result = await checkAnswer(answer);
    feedback.textContent = result.message;
    feedback.className = `feedback ${result.isCorrect ? 'success' : 'error'}`;
  } catch {
    feedback.textContent = 'Impossible de vérifier la réponse pour le moment.';
    feedback.className = 'feedback error';
  }
});

nextBtn.addEventListener('click', newOperation);

newOperation();
