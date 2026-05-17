const description = document.getElementById('description');
const amount = document.getElementById('amount');
const submit = document.querySelector('.js-submit-btn');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expenses = document.getElementById('expenses');



submit.addEventListener('click',e=>{
    e.preventDefault();
    const amt = addBalance();
    if (amt>0){
        displayBalance(amt);
        addIncome(amt);
    }else if (amt <0){
        displayBalance(amt);
        addExpense(amt);
    }else{
        alert('Please enter a valid amount');
    }
});



function addBalance(){
    const amt = parseFloat(amount.value);
    return amt;
}

function displayBalance(amt){
    let totalBal = parseFloat(balance.innerText.replace('$',''));
    totalBal += amt;
    balance.innerText = `$${totalBal}`;
}

function addIncome(amt){
    let totalIncome = parseFloat(income.innerText.replace('$',''));
    totalIncome +=amt;
    income.innerText = `$${totalIncome}`;
}

function addExpense(amt){
    let totalExpense = parseFloat(expenses.innerText.replace('$',''));
    totalExpense += Math.abs(amt);
    expenses.innerText = `$${totalExpense}`;
}
