import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((balancePartial, transaction) => {
      switch (transaction.type) {
        case 'income':
          return {
            ...balancePartial,
            income: transaction.value + balancePartial.income,
          };
        case 'outcome':
          return {
            ...balancePartial,
            outcome: transaction.value + balancePartial.outcome,
          };
        default:
          return balancePartial;
      }
    }, initialBalance);

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create(transactionDTO: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(transactionDTO);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
