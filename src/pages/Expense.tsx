import Transactionform from "../components/transaction/TransactionForm";
import Transactionlist from "../components/transaction/TransactionList";
import {
  TransactionType,
  TransactionProps,
} from "../helpers/types/CommonTypes";
import globalStyles from "../App.module.css";

const Expense = (props: TransactionProps) => {
  return (
    <div className={globalStyles.pageArea}>
      <div>
        <Transactionform
          onTransactionAdd={props.onTransactionAdd}
          transactionType={TransactionType.Expense}
          balance={props.balance}
        />
      </div>
      <div>
        <Transactionlist
          transactionType={TransactionType.Expense}
          transactionList={props.transactionList}
          onTransactionRemove={props.onTransactionRemove}
          downloadCSV={props.downloadCSV}
        />
      </div>
    </div>
  );
};

export default Expense;
