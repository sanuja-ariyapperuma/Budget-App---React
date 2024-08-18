import { Transaction, TransactionType } from "../types/CommonTypes";

export const getTotalIncome = (transactions: Transaction[]) =>
  transactions
    .filter(
      (transaction) => transaction.transactionType === TransactionType.Income
    )
    .reduce((cum, cur) => cum + Number(cur.sourceValue), 0);

export const getTotalExpenses = (transactions: Transaction[]) =>
  transactions
    .filter(
      (transaction) => transaction.transactionType === TransactionType.Expense
    )
    .reduce((cum, cur) => cum + Number(cur.sourceValue), 0);

export const validateTransaction = (
  balance: number | undefined,
  transactionAmount: number
): boolean | string => {
  if (balance == undefined) return true;
  return balance - transactionAmount >= 0 ? true : "No sufficient balance";
};
