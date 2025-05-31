function createBankAccount(balance) {
  return {
    deposit: (amount) => (balance += amount),
    withdraw: (amount) =>
      balance >= amount ? (balance -= amount) : "Unsufficient amount",
    getBalance: () => balance,
  };
}

const account = createBankAccount(100);

console.log(account.deposit(50)); // Output: 150

console.log(account.withdraw(30)); // Output: 120

console.log(account.getBalance()); // Output: 120
