// const quotesList = [
//     'Believe you can and you\'re halfway there. - Theodore Roosevelt',
//     'The only way to do great work is to love what you do. - Steve Jobs',
//     'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
//     'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson',
//     'You miss 100% of the shots you don\'t take. - Wayne Gretzky',
//     'I have not failed. I\'ve just found 10,000 ways that won\'t work. - Thomas Edison',
//     'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
//     'It does not matter how slowly you go as long as you do not stop. - Confucius',
//     'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
//     'The best way to predict your future is to create it. - Abraham Lincoln',
//     'Happiness is not something ready made. It comes from your own actions. - Dalai Lama',
//     'The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius',
//     'Happiness is a choice. Choose wisely. - Unknown',
//     'The happiest people don\'t have the best of everything, they just make the best of everything. - Unknown',
//     'Happiness is not something you postpone for the future; it is something you design for the present. - Jim Rohn',
//     'Keep your eyes on the stars, and your feet on the ground. - Theodore Roosevelt',
//     'You don\'t have to be great to start, but you have to start to be great. - Zig Ziglar',
//     'Do something today that your future self will thank you for. - Unknown',
//     'The biggest risk is not taking any risk. - Mark Zuckerberg',
//     'You are never too young to lead and never too old to learn. - Unknown',
//     'The best revenge is massive success. - Frank Sinatra',
//     'Do not let what you cannot do interfere with what you can do. - John Wooden',
//     'You miss 100% of the shots you don\'t take. - Wayne Gretzky',
//     'I have not failed. I\'ve just found 10,000 ways that won\'t work. - Thomas Edison',
//     'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
//     'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
//     'It does not matter how slowly you go as long as you do not stop. - Confucius',
//     'You don\'t have to be great to start, but you have to start to be great. - Zig Ziglar',
//     'Do something today that your future self will thank you for. - Unknown',
//     'The biggest risk is not taking any risk. - Mark Zuckerberg',
//     'You are never too young to lead and never too old to learn. - Unknown',
//     'The best revenge is massive success. - Frank Sinatra',
//     'Do not let what you cannot do interfere with what you can do. - John Wooden',
//     'Keep your eyes on the stars, and your feet on the ground. - Theodore Roosevelt',
//     'Believe you can and you\'re halfway there. - Theodore Roosevelt',
//     'The only way to do great work is to love what you do. - Steve Jobs',
//     'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
//     'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson',
//     'You miss 100% of the shots you don\'t take. - Wayne Gretzky',
//     'I have not failed. I\'ve just found 10,000 ways that won\'t work. - Thomas Edison',
//     'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
//     'It does not matter how slowly you go as long as you do not stop. - Confucius',
//     'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
//     'The best way to predict your future is to create it. - Abraham Lincoln',
//     'Happiness is not something ready made. It comes from your own actions. - Dalai Lama',
//     'The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius',
//     'Happiness is a choice. Choose wisely. - Unknown',
//     'The happiest people don\'t have the best of everything, they just make the best of everything. - Unknown',
//     'Happiness is not something you postpone for the future; it is something you design for the present. - Jim Rohn',
//     'Keep your eyes on the stars, and your feet on the ground. - Theodore Roosevelt',
//     'You don\'t have to be great to start, but you have to start to be great. - Zig Ziglar',
//     'Do something today that your future self will thank you for. - Unknown',
//     'The biggest risk is not taking any risk. - Mark Zuckerberg',
//     'You are never too young to lead and never too old to learn. - Unknown',
//     'The best revenge is massive success. - Frank Sinatra',
//     'Do not let what you cannot do interfere with what you can do. - John Wooden',
//     'You miss 100% of the shots you don\'t take. - Wayne Gretzky',
//     'I have not failed. I\'ve just found 10,000 ways that won\'t work. - Thomas Edison'
// ];
// const quoteDiv = document.getElementById('quote');
// const authorDiv = document.getElementById('author');
// const generateButton = document.getElementById('generate');

// generateButton.addEventListener('click', () => {
//     const randomIndex = Math.floor(Math.random() * quotesList.length);
//     const quote = quotesList[randomIndex];
//     const [quoteText, author] = quote.split(' - ');
//     quoteDiv.textContent = `"${quoteText}"`;
//     authorDiv.textContent = `— ${author}`;
// });


const generators = {
    quote: {
        // Quote generator code here
    },
    word: {
        // Word generator code here
    },
    password: {
        // Password generator code here
    },
    joke: {
        // Joke generator code here
    },
    // Add more generators here
};

const generatorSelect = document.getElementById('generator-select');
const generateBtn = document.getElementById('generate-btn');
const fullScreenBtn = document.getElementById('full-screen-btn');
const generatedContent = document.getElementById('generated-content');

generateBtn.addEventListener('click', () => {
    const selectedGenerator = generatorSelect.value;
    const generator = generators[selectedGenerator];
    const generatedContentHtml = generator.generate();
    generatedContent.innerHTML = generatedContentHtml;
});

fullScreenBtn.addEventListener('click', () => {
    const fullScreenContent = generatedContent.innerHTML;
    const fullScreenHtml = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; padding: 20px;">
            ${fullScreenContent}
        </div>
    `;
    document.body.innerHTML = fullScreenHtml;
});