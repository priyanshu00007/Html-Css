const form = document.querySelector('form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const income = document.getElementById('income').value;
    const expenses = document.getElementById('expenses').value;
    const savings = document.getElementById('savings').value;

    const totalExpenses = parseInt(expenses) + parseInt(savings);
    const remainingIncome = parseInt(income) - totalExpenses;

    resultDiv.innerHTML = `
        <h2>Result</h2>
        <p>Income: ${income}</p>
        <p>Expenses: ${expenses}</p>
        <p>Savings: ${savings}</p>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Remaining Income: ${remainingIncome}</p>
    `;
});