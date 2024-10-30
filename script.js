document.getElementById('add-btn').addEventListener('click', addExpense);
document.getElementById('clear-btn').addEventListener('click', clearAllExpenses);

function addExpense() {
    const name = document.getElementById('expense-name').value.trim();
    const amount = document.getElementById('expense-amount').value.trim();

    if (name && amount) {
        const expense = { name, amount: parseFloat(amount) };
        saveExpense(expense);
        displayExpenses();

        // Clear the input fields
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    } else {
        alert('Please enter both a name and amount!');
    }
}

function saveExpense(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear the list

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <span contenteditable="true" onblur="editExpense(${index}, this)">${expense.name}: $${expense.amount.toFixed(2)}</span>
      <i class="fas fa-trash-alt" onclick="deleteExpense(${index})"></i>
    `;
        expenseList.appendChild(li);
    });
}

function editExpense(index, element) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const [name, amount] = element.innerText.split(': $');
    expenses[index] = { name: name.trim(), amount: parseFloat(amount) };
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function clearAllExpenses() {
    localStorage.removeItem('expenses');
    displayExpenses();
}

// Display expenses on page load
window.onload = displayExpenses;
