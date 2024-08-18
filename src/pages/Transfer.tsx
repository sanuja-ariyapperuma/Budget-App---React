import { useForm, SubmitHandler } from "react-hook-form";

import { Transaction, TransactionType } from "../helpers/types/CommonTypes";
import { validateTransaction } from "../helpers/functions/Helpers";
import globalstyles from "../App.module.css";

type TransferProps = {
  onCurrentSavingChange: (saving: Transaction) => void;
  currentSaving: number;
  balance: number;
};

type Transfer = {
  transferAmount: number;
};

const Transfer = (props: TransferProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Transfer>();

  const transferToSaving: SubmitHandler<Transfer> = (value) => {
    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000),
      sourceValue: value.transferAmount,
      transactionType: TransactionType.Transfer,
    };
    props.onCurrentSavingChange(newTransaction);
    reset();
  };

  return (
    <div className="flex flex-col text-center">
      <h2 className={globalstyles.inputformheading}>Transfer to Save</h2>
      <form onSubmit={handleSubmit(transferToSaving)}>
        <div className={globalstyles.formgroup}>
          <label htmlFor="transferAmount" className={globalstyles.formlable}>
            Transfer Amount
          </label>
          <input
            type="number"
            id="transferAmount"
            className={globalstyles.inputbox}
            {...register("transferAmount", {
              required: "Transfer amount is required",
              validate: (value) =>
                validateTransaction(props.balance, Number(value)),
            })}
          />
        </div>
        <div className={globalstyles.error}>
          {errors.transferAmount ? errors.transferAmount.message : null}
        </div>
        <div className={globalstyles.submitButtonArea}>
          <button type="submit" className={globalstyles.submitButton}>
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Transfer;
