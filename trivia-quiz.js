// One Piece Trivia Quiz Data with Progressive Difficulty
const quizData = [
    // Easy Questions (1-3)
    {
        question: "Who is the captain of the Straw Hat Pirates?",
        options: ["Zoro", "Luffy", "Sanji", "Nami"],
        answer: "Luffy",
        difficulty: "easy"
    },
    {
        question: "What is the name of Luffy's signature attack?",
        options: ["Gomu Gomu Pistol", "Haki Strike", "Fire Fist", "Razor Wind"],
        answer: "Gomu Gomu Pistol",
        difficulty: "easy"
    },
    {
        question: "Which island is known as the 'City of Water'?",
        options: ["Alabasta", "Water 7", "Skypiea", "Drum Island"],
        answer: "Water 7",
        difficulty: "easy"
    },
    // Medium Questions (4-7)
    {
        question: "What is the name of the sword Zoro wields that is said to be cursed?",
        options: ["Wado Ichimonji", "Sandai Kitetsu", "Enma", "Shusui"],
        answer: "Sandai Kitetsu",
        difficulty: "medium"
    },
    {
        question: "Which Yonko did Luffy defeat to become an Emperor of the Sea?",
        options: ["Big Mom", "Kaido", "Blackbeard", "Shanks"],
        answer: "Kaido",
        difficulty: "medium"
    },
    {
        question: "What is the name of the ancient weapon associated with Poseidon?",
        options: ["Pluton", "Poseidon", "Uranus", "Noah"],
        answer: "Poseidon",
        difficulty: "medium"
    },
    {
        question: "Which member of the Straw Hats is a skilled sniper?",
        options: ["Usopp", "Chopper", "Robin", "Franky"],
        answer: "Usopp",
        difficulty: "medium"
    },
    // Hard Questions (8-10)
    {
        question: "What is the real name of the character known as 'Dragon'?",
        options: ["Monkey D. Dragon", "Gol D. Roger", "Portgas D. Ace", "Sabo"],
        answer: "Monkey D. Dragon",
        difficulty: "hard"
    },
    {
        question: "In which arc does Luffy first use Gear Fifth?",
        options: ["Wano Country Arc", "Whole Cake Island Arc", "Dressrosa Arc", "Marineford Arc"],
        answer: "Wano Country Arc",
        difficulty: "hard"
    },
    {
        question: "What is the full name of the island where the One Piece is rumored to be?",
        options: ["Laugh Tale", "Raftel", "Treasure Island", "Final Island"],
        answer: "Laugh Tale",
        difficulty: "hard"
    }
];

let currentQuestion = 0;
let score = 0;
const totalQuestions = quizData.length;
let selectedAnswers = new Array(totalQuestions);

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-question-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${currentQuiz.question}`;
    optionsElement.innerHTML = '';

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(button);
    });

    resultElement.style.display = 'none';
    scoreElement.style.display = 'none';
    nextButton.disabled = !selectedAnswers[currentQuestion];
}

function selectOption(selected) {
    const optionButtons = optionsElement.getElementsByClassName('option-btn');
    for (let button of optionButtons) {
        button.classList.remove('selected');
        button.disabled = true;
    }
    const selectedButton = Array.from(optionButtons).find(btn => btn.textContent === selected);
    selectedButton.classList.add('selected');
    selectedAnswers[currentQuestion] = selected;
    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    questionElement.textContent = 'Quiz Completed!';
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';

    // Calculate score
    score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === quizData[index].answer) score++;
    });

    // Display results
    resultElement.style.display = 'block';
    resultElement.innerHTML = `Your Results:<br>`;
    quizData.forEach((q, index) => {
        resultElement.innerHTML += `${index + 1}. ${q.question}<br> Your Answer: ${selectedAnswers[index] || 'None'}<br> Correct Answer: ${q.answer}<br><br>`;
    });
    resultElement.innerHTML += `Total Correct: ${score} out of ${totalQuestions}`;
    scoreElement.style.display = 'block';
    scoreElement.textContent = `Final Score: ${score}/${totalQuestions}`;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswers = new Array(totalQuestions);
    scoreElement.style.display = 'none';
    nextButton.style.display = 'inline-block';
    nextButton.disabled = true;
    loadQuestion();
}

// Start the quiz
resetQuiz();