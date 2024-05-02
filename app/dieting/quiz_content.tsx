const quizContent = [
    // Has to start and end with 'info' type content
    {
        quizId: 'calories_quiz', // Unique identifier for this quiz
        content: [
            {
                type: 'info',
                text: 'Calories are units of energy. Here’s an overview of calories and their importance in diet.',
            },
            {
                type: 'quiz',
                question: 'Which is a higher source of calories?',
                options: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins'],
                correctAnswer: 'Fats',
            },
            {
                type: 'info',
                text: 'Fats contain more calories per gram than carbohydrates and proteins.',
            },
            {
                type: 'quiz',
                question: 'Which is not a calorie-dense food?',
                options: ['Avocado', 'Nuts', 'Leafy greens', 'Cheese'],
                correctAnswer: 'Leafy greens',
            },
            {
                type: 'info',
                text: 'Aha',
            },
        ],
    },

    {
        quizId: 'carbs_quiz', // Another unique identifier for a different quiz
            content: [
            {
                type: 'info',
                text: 'Carbohydrates are an essential macronutrient. Learn more about them.',
            },
            {
                type: 'quiz',
                question: 'Which of these is a complex carbohydrate?',
                options: ['Bread', 'Banana', 'Rice', 'Whole grains'],
                correctAnswer: 'Whole grains',
            },
            {
                type: 'info',
                text: 'Whole grains are rich in complex carbohydrates, providing longer-lasting energy.',
            },
        ],
    },
// Add more quizzes with their unique identifiers
];

export default quizContent;
