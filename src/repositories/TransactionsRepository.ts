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

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDto {

    const getIncome = (sum: number, transaction: TransactionDto) => {
      return (transaction.type === 'income') ? sum + transaction.value : sum;
    };

    const getOutcome = (sum: number, transaction: TransactionDto) => {
      return (transaction.type === 'outcome') ? sum + transaction.value : sum;
    };

    const getTotal = (income: number, outcome: number): number => {
      return income - outcome;
    };

    const income = this.transactions.reduce(getIncome, 0);
    const outcome = this.transactions.reduce(getOutcome, 0);
    const total = getTotal(income, outcome);

    return {income, outcome, total};
  }

  public create({title, value, type}: TransactionDto): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
