const transactionInput = document.querySelector("#product-name");
const amountInput = document.querySelector("#amount");
const transactionList = document.querySelector(".transaction-list");
const earningButton = document.querySelector(".earnings");
const expenseButton = document.querySelector(".expenses");
const totalAmountDisplay = document.querySelector(".total-amount");

let totalAmount = 0;

function addTransaction(isEarning) {
    const productName = transactionInput.value;
    const amount = parseFloat(amountInput.value);
    if (!productName  || !amount) return;

    const transactionLi = document.createElement("li");
    transactionLi.classList.add("transactionItem");
    transactionLi.textContent = `${productName}: ${isEarning ? "+" : "-"}${amount}$`;

    addTransactionControls(transactionLi);

    transactionList.appendChild(transactionLi);

    updateTotalAmount();
    saveTransactions();

    transactionInput.value = '';
    amountInput.value = ''; 
}

function addTransactionControls(transactionLi) {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTransaction(transactionLi);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTransaction(transactionLi);

    transactionLi.appendChild(editButton);
    transactionLi.appendChild(deleteButton);
}

function saveTransactions() { 
    const transactions = [];
    const transactionItems = document.querySelectorAll(".transactionItem");

    transactionItems.forEach((item) => {
        const [productName, amount] = item.textContent.split(': ');
        transactions.push({
            productName: productName.trim(),
            amount: parseFloat(amount),
        });
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.forEach((transaction) => {
        const transactionLi = document.createElement("li");
        transactionLi.classList.add("transactionItem");
        transactionLi.textContent = `${transaction.productName}: ${transaction.amount}$`;

        addTransactionControls(transactionLi);

        transactionList.appendChild(transactionLi);
    });
    updateTotalAmount();
}

function updateTotalAmount() {
    const transactionItems = document.querySelectorAll(".transactionItem");

    let totalAmount = 0;
    
    transactionItems.forEach(item => {
        const amount = parseFloat(item.textContent.split(': ')[1]);
        totalAmount += amount;
    });

    totalAmountDisplay.textContent = `Total: ${totalAmount}$`;
}

function editTransaction(transactionLi) {
    const currentText = transactionLi.textContent.split(': ');

    const newProductName = prompt("Enter new Product Name", currentText[0]);
    const newAmount = parseFloat(prompt("Enter new Amount", currentText[1]));

    if (newProductName && !isNaN(newAmount) && newAmount > 0) {
        transactionLi.textContent = `${newProductName.trim()}: ${newAmount}$`;
        
        addTransactionControls(transactionLi);
        
        updateTotalAmount();
        saveTransactions();
    }
}


function deleteTransaction(transactionLi) {
    transactionLi.remove();
    updateTotalAmount();
    saveTransactions(); 
}

earningButton.onclick = () => addTransaction(true);
expenseButton.onclick = () => addTransaction(false);

window.onload = loadTransactions;
