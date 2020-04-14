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
    const income = this.transactions.reduce((incomePartial, transaction) => {
      return transaction.type === 'income'
        ? incomePartial + transaction.value
        : incomePartial;
    }, 0);

    const outcome = this.transactions.reduce((outcomePartial, transaction) => {
      return transaction.type === 'outcome'
        ? outcomePartial + transaction.value
        : outcomePartial;
    }, 0);

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create(transactionDTO: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(transactionDTO);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
