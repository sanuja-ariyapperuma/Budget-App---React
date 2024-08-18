import { MdDeleteSweep } from "react-icons/md";

import { Transaction } from "../../helpers/types/CommonTypes";
import CurrencyFormat from "../../helpers/CurrencyFormat";
import localstyles from "./TransactionItem.module.css";

type TransactionitemProps = {
  onTransactionRemove: (transactionId: number) => void;
  transaction: Transaction;
};
const Transactionitem = (props: TransactionitemProps) => {
  const handleClick = () => {
    props.onTransactionRemove(props.transaction.id);
  };
  return (
    <div className={localstyles.transactionItemArea}>
      <div className={localstyles.transactionItemDescription}>
        {props.transaction.sourceName}
      </div>
      <div className={localstyles.transactionItemDescription}>
        {props.transaction.date}
      </div>
      <div className={localstyles.transactionItemDescription}>
        <CurrencyFormat value={props.transaction.sourceValue} />
      </div>
      <div className={localstyles.transactionDeleteButton}>
        <MdDeleteSweep size={20} color="red" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Transactionitem;
