document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    const welcomeScreen = document.getElementById('welcome-screen');
    const questionnaireScreen = document.getElementById('questionnaire-screen');
    const resultsScreen = document.getElementById('results-screen');
    const calmingExerciseScreen = document.getElementById('calming-exercise-screen');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    const suggestionsElement = document.getElementById('suggestions');

    const phq9Questions = [
        {
            question: "1. Little interest or pleasure in doing things",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "2. Feeling down, depressed, or hopeless",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "3. Trouble falling or staying asleep, or sleeping too much",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "4. Feeling tired or having little energy",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "5. Poor appetite or overeating",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "6. Feeling bad about yourself or that you are a failure or have let yourself or your family down",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "7. Trouble concentrating on things, such as reading the newspaper or watching television",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "8. Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "9. Thoughts that you would be better off dead, or of hurting yourself",
            options: [
                "Not at all",
                "Several days",
                "More than half the days",
                "Nearly every day"
            ]
        },
        {
            question: "10. If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
            options: [
                "Not difficult at all",
                "Somewhat difficult",
                "Very difficult",
                "Extremely difficult"
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let answers = [];

    function showQuestion(index) {
        const question = phq9Questions[index];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `
                <input type="radio" name="question" value="${i}" id="option-${i}">
                <label for="option-${i}">${option}</label>
            `;
            optionsContainer.appendChild(optionElement);
        });
        if (answers[index] !== undefined) {
            document.getElementById(`option-${answers[index]}`).checked = true;
        }
    }

    function calculateScore() {
        return answers.slice(0, 9).reduce((acc, curr) => acc + curr, 0);
    }

    function showResults() {
        const score = calculateScore();
        scoreElement.textContent = score;
        let message = '';
        let suggestions = [];
        if (score <= 4) {
            message = "You are experiencing minimal symptoms of depression.";
            suggestions = [
                "Practice mindfulness and relaxation techniques.",
                "Stay connected with friends and family.",
                "Engage in regular physical activity."
            ];
        } else if (score <= 9) {
            message = "You are experiencing mild symptoms of depression.";
            suggestions = [
                "Consider speaking with a friend or family member about your feelings.",
                "Try journaling to express your thoughts and emotions.",
                "Seek support from a mental health professional."
            ];
        } else if (score <= 14) {
            message = "You are experiencing moderate symptoms of depression.";
            suggestions = [
                "Reach out to a mental health professional for guidance.",
                "Consider joining a support group.",
                "Practice self-care and relaxation techniques."
            ];
        } else if (score <= 19) {
            message = "You are experiencing moderately severe symptoms of depression.";
            suggestions = [
                "Seek professional help immediately.",
                "Consider therapy or counseling.",
                "Stay connected with trusted individuals."
            ];
        } else {
            message = "You are experiencing severe symptoms of depression.";
            suggestions = [
                "Seek professional help immediately.",
                "Consider inpatient treatment if necessary.",
                "Stay connected with trusted individuals."
            ];
        }
        messageElement.textContent = message;
        suggestionsElement.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('li');
            suggestionElement.textContent = suggestion;
            suggestionsElement.appendChild(suggestionElement);
        });
    }

    document.getElementById('start-button').addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        questionnaireScreen.classList.remove('hidden');
        showQuestion(currentQuestionIndex);
    });

    nextButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) {
            alert('Please select an option');
            return;
        }
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
        if (currentQuestionIndex < phq9Questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            questionnaireScreen.classList.add('hidden');
            resultsScreen.classList.remove('hidden');
            showResults();
        }
    });

    previousButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    document.getElementById('save-button').addEventListener('click', () => {
        localStorage.setItem('phq9Answers', JSON.stringify(answers));
        alert('Check-in saved');
    });

    document.getElementById('exercise-button').addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        calmingExerciseScreen.classList.remove('hidden');
    });

    document.getElementById('return-home-button').addEventListener('click', () => {
        calmingExerciseScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
    });

    // Function to retrieve and display saved data
    function displaySavedData() {
        const savedAnswers = JSON.parse(localStorage.getItem('phq9Answers'));
        if (savedAnswers) {
            console.log("Saved PHQ-9 Answers:", savedAnswers);
            // Display the saved data on the webpage if needed
        } else {
            console.log("No saved PHQ-9 answers found.");
        }
    }

    // Call this function if you need to display saved data on page load or on a specific event
    displaySavedData();
});