export enum IconType {
  Income = 1,
  Expense = 2,
  Savings = 3,
  Transfers = 4,
}

export enum TransactionType {
  Income = "Income",
  Expense = "Expense",
  Transfer = "Transfer",
}

export type Transaction = {
  id: number;
  sourceName?: string;
  sourceValue: number;
  date?: string;
  transactionType: TransactionType;
};

export type TransactionProps = {
  transactionList: Transaction[];
  onTransactionAdd: (transaction: Transaction) => void;
  onTransactionRemove: (transactionId: number) => void;
  balance?: number;
  downloadCSV: (type: TransactionType) => void;
};
