document.querySelector('#start-btn').addEventListener('click', function () {
    document.querySelector('#start-screen').classList.remove('active');
    document.querySelector('#quiz-screen').classList.add('active');
});

const questions = [{
    questionText: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2
},
{
    questionText: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1
},
{
    questionText: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3
}, {
    questionText: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    correctAnswer: 0
}, {
    questionText: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Fe', 'Pb'],
    correctAnswer: 0
}
]

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    document.querySelector('#quiz-screen')
        .innerHTML =
        `<div class="quiz-header">
                <h2 id="question-text">${question.questionText}</h2>
                <div class="quiz-info">
                    <p>
                        Question <span id="current-question">${currentQuestionIndex + 1}</span> of <span id="total-questions">5</span>
                    </p>
                    <p>
                        Score: <span id="score">${score}</span>
                    </p>
                </div>
            </div>

            <div class="answer-container">
                <button data-index=0 class="data-0 btn-style">${question.options[0]}</button>
                <button data-index=1 class="data-1 btn-style">${question.options[1]}</button>
                <button data-index=2 class="data-2 btn-style">${question.options[2]}</button>
                <button data-index=3 class="data-3 btn-style">${question.options[3]}</button>
            </div>

            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
        `;
    selectAnswer();

    function selectAnswer() {
        const answerButtons = document.querySelectorAll('.btn-style').forEach((button) => {
            button.addEventListener('click', (event) => {
                const selectedIndex = Number(event.target.dataset.index);
                const correctIndex = questions[currentQuestionIndex].correctAnswer;

                if (selectedIndex === correctIndex) {
                    score++;
                    document.querySelector('#score').textContent = score;
                    document.querySelector(`.data-${selectedIndex}`).classList.add('correct');
                } else {
                    event.target.classList.add('incorrect');
                    document.querySelector(`.data-${correctIndex}`).classList.add('correct');
                }
                currentQuestionIndex++;
                updateProgressBar();
                setTimeout(() => {
                    if (currentQuestionIndex < questions.length) {
                        showQuestion();
                    } else {
                        document.querySelector('.quiz-time').classList.remove('active')
                        document.querySelector('.result-page').classList.add('active')
                        document.querySelector('.result-score').innerHTML = `<p>Your final score is: <span id="final-score">${score}</span></p>`;
                        score=0;
                        currentQuestionIndex=0;
                        restartQuiz();
                        showQuestion();
                    }
                }, 1000)
            }
            )
        })
    }
};

function updateProgressBar() {
    const completedQuestions = currentQuestionIndex + 1;
    const progressPercent = (completedQuestions / questions.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
}

function restartQuiz() {
    const restartButton = document.querySelector('#restart-btn');
    restartButton.addEventListener('click', () => {
    document.querySelector('.result-page').classList.remove('active');
    document.querySelector('#start-screen').classList.add('active');
    updateProgressBar();
    });
}

showQuestion();



