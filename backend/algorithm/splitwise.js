// This function takes an array of transactions and returns the simplified settlements.
// A transaction object looks like: { from: 'Person A', to: 'Person B', amount: 100 }

function calculateSettlements(transactions) {
  const money = new Map();

  // Step 1: Calculate the net balance for each person from all transactions
  for (const t of transactions) {
    const { paidBy, amount, paidFor } = t;

    // The person who paid gets the full amount credited to their balance for now.
    money.set(paidBy, (money.get(paidBy) || 0) + amount);

    // The cost needs to be split equally among everyone who benefited.
    const splitAmount = amount / paidFor.length;

    // Each person in the group owes their share.
    for (const member of paidFor) {
      money.set(member, (money.get(member) || 0) - splitAmount);
    }
  }

  // --- The rest of the function remains the same ---

  const debtors = [];
  const creditors = [];

  for (const [person, balance] of money.entries()) {
    // Using a small epsilon to handle floating point inaccuracies
    if (balance < -0.01) {
      debtors.push({ person, balance });
    } else if (balance > 0.01) {
      creditors.push({ person, balance });
    }
  }

  debtors.sort((a, b) => a.balance - b.balance); // Most negative first
  creditors.sort((a, b) => b.balance - a.balance); // Most positive first

  const settlements = [];

  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0];
    const creditor = creditors[0];
    const amount = Math.min(-debtor.balance, creditor.balance);

    settlements.push({
      from: debtor.person,
      to: creditor.person,
      amount: amount,
    });

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 0.01) {
      debtors.shift();
    }
    if (Math.abs(creditor.balance) < 0.01) {
      creditors.shift();
    }
  }

  return settlements;
}

module.exports = { calculateSettlements };