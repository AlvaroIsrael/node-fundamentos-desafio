import Transaction from '../models/Transaction';

interface BalanceDto {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private readonly transactions: Transaction[];
  private balance: {};

  constructor() {
    this.transactions = [];
    this.balance = {};
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDto {

    const operation = (income: number, transaction: TransactionDto) => {
      return income + transaction.value;
    };

    const getTotal = (income: number, outcome: number): number => {
      return income - outcome;
    };

    const income = this.transactions.filter(t => t.type === 'income').reduce(operation, 0);
    const outcome = this.transactions.filter(t => t.type === 'outcome').reduce(operation, 0);
    const total = getTotal(income, outcome);

    this.balance = {income, outcome, total};
    return {income, outcome, total};
  }

  public create({title, value, type}: TransactionDto): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
