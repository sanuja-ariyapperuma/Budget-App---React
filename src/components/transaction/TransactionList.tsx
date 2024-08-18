import { Transaction, TransactionType } from "../../helpers/types/CommonTypes";
import Transactionitem from "./TransactionItem";
import globalstyles from "../../App.module.css";

type TransactionlistProps = {
  transactionType: TransactionType;
  transactionList: Transaction[];
  onTransactionRemove: (transactionId: number) => void;
  downloadCSV: (type: TransactionType) => void;
};

const Transactionlist = (props: TransactionlistProps) => {
  const filteredTransactionList = props.transactionList.filter(
    (transaction) => transaction.transactionType == props.transactionType
  );

  return (
    <div>
      <h2 className={globalstyles.inputformheading}>
        {props.transactionType} List
      </h2>
      <div>
        {filteredTransactionList && (
          <button
            onClick={() => props.downloadCSV(props.transactionType)}
            className={globalstyles.downloadbtn}
          >
            Download CSV
          </button>
        )}
        {filteredTransactionList.length > 0 ? (
          filteredTransactionList.map((transaction) => (
            <Transactionitem
              key={transaction.id}
              transaction={transaction}
              onTransactionRemove={props.onTransactionRemove}
            />
          ))
        ) : (
          <i>No {props.transactionType} records yet...</i>
        )}
      </div>
    </div>
  );
};

export default Transactionlist;
