import { Transaction, TransactionType } from "../helpers/types/CommonTypes";
import Income from "./Income";
import Expense from "./Expense";
import Savings from "./Savings";
import Transfer from "./Transfer";

type AllProps = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: number) => void;
  balance: number;
  updateSavingTarget: (target: number) => void;
  savingTarget: number;
  currentSaving: number;
  downloadCSV: (type: TransactionType) => void;
};

const BudgetComponent = (props: AllProps) => {
  return (
    <div>
      <Income
        transactionList={props.transactions}
        onTransactionAdd={props.addTransaction}
        onTransactionRemove={props.removeTransaction}
        downloadCSV={props.downloadCSV}
      />
      <Expense
        transactionList={props.transactions}
        onTransactionAdd={props.addTransaction}
        onTransactionRemove={props.removeTransaction}
        balance={props.balance}
        downloadCSV={props.downloadCSV}
      />
      <Savings
        onSetSavingTarget={props.updateSavingTarget}
        savingTarget={props.savingTarget}
      />
      <Transfer
        onCurrentSavingChange={props.addTransaction}
        currentSaving={props.currentSaving}
        balance={props.balance}
      />
    </div>
  );
};

export default BudgetComponent;
