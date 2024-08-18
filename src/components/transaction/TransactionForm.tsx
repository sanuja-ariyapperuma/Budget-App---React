import { useForm, SubmitHandler } from "react-hook-form";

import { Transaction, TransactionType } from "../../helpers/types/CommonTypes";
import { validateTransaction } from "../../helpers/functions/Helpers";
import globalstyles from "../../App.module.css";

type TransactionformProps = {
  transactionType: TransactionType;
  onTransactionAdd: (transaction: Transaction) => void;
  balance?: number;
};

const Transactionform = (props: TransactionformProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Transaction>();

  const addNewTransaction: SubmitHandler<Transaction> = (value) => {
    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000),
      sourceName: value.sourceName,
      sourceValue: value.sourceValue,
      date: value.date,
      transactionType: props.transactionType,
    };
    props.onTransactionAdd(newTransaction);
    reset();
  };

  return (
    <div>
      <h2 className={globalstyles.inputformheading}>
        Add New {props.transactionType}
      </h2>
      <form onSubmit={handleSubmit(addNewTransaction)}>
        <div className={globalstyles.formgroup}>
          <label htmlFor="sourceName" className={globalstyles.formlable}>
            Source Name
          </label>
          <input
            type="text"
            id="sourceName"
            className={globalstyles.inputbox}
            {...register("sourceName", {
              required: "Source Name is required",
            })}
          />
        </div>
        <div className={globalstyles.error}>
          {errors.sourceName ? errors.sourceName.message : null}
        </div>
        <div className={globalstyles.formgroup}>
          <label htmlFor="sourceValue" className={globalstyles.formlable}>
            Value €
          </label>
          <input
            type="number"
            id="sourceValue"
            className={globalstyles.inputbox}
            {...register("sourceValue", {
              required: "Source Value is required",
              validate: (value) =>
                validateTransaction(props.balance, Number(value)),
            })}
          />
        </div>
        <div className={globalstyles.error}>
          {errors.sourceValue ? errors.sourceValue.message : null}
        </div>
        <div className={globalstyles.formgroup}>
          <label htmlFor="sourceDate" className={globalstyles.formlable}>
            Date
          </label>
          <input
            type="date"
            id="sourceDate"
            className={globalstyles.inputbox}
            {...register("date", {
              required: "Source Date is required",
            })}
          />
        </div>
        <div className={globalstyles.error}>
          {errors.date ? errors.date.message : null}
        </div>
        <div className={globalstyles.submitButtonArea}>
          <button type="submit" className={globalstyles.submitButton}>
            Add {props.transactionType}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transactionform;
