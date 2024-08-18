import { Transaction, TransactionType } from "../../helpers/types/CommonTypes";
import Widget from "./Widget";

type TransactionProps = {
  transactionList: Transaction[];
  savingTarget: number;
  currentSaving: number;
  balance: number;
};

const Summary = (props: TransactionProps) => {
  const totalIncome = props.transactionList
    .filter(
      (transaction) => transaction.transactionType === TransactionType.Income
    )
    .reduce((cum, cur) => cum + Number(cur.sourceValue), 0);

  const totalExpences = props.transactionList
    .filter(
      (transaction) => transaction.transactionType === TransactionType.Expense
    )
    .reduce((cum, cur) => cum + Number(cur.sourceValue), 0);

  return (
    <div className="flex flex-row w-screen justify-around">
      <Widget title="Total Income" value={totalIncome} />
      <Widget title="Total Expenses" value={totalExpences} />
      <Widget
        title="Saving Amount"
        value={props.currentSaving}
        basevalue={props.savingTarget}
      />
      <Widget title="Balance" value={props.balance} />
    </div>
  );
};

export default Summary;
