import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionRequestDTO): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw Error('Transaction type not allowed');

    if (type === 'outcome') {
      const { total: balanceTotal } = this.transactionsRepository.getBalance();

      if (value > balanceTotal)
        throw Error('The outcome is greater than the balance total');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
