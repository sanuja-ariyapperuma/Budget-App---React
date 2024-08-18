import { useForm, SubmitHandler } from "react-hook-form";

import CurrencyFormat from "../helpers/CurrencyFormat";
import globalstyles from "../App.module.css";

type Saving = {
  savingTarget: number;
};

type SavingProps = {
  onSetSavingTarget: (target: number) => void;
  savingTarget: number;
};

const Savings = (props: SavingProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Saving>();
  const setNewSavingGoal: SubmitHandler<Saving> = (value) => {
    props.onSetSavingTarget(value.savingTarget);
    reset();
  };

  return (
    <div className="flex flex-col text-center">
      <h2 className={globalstyles.inputformheading}>Set Saving Goal</h2>
      <h2 className="text-5xl mb-10">
        <CurrencyFormat value={props.savingTarget} />
      </h2>
      <form onSubmit={handleSubmit(setNewSavingGoal)}>
        <div className={globalstyles.formgroup}>
          <label htmlFor="savingTarget" className={globalstyles.formlable}>
            Saving Target
          </label>
          <input
            type="number"
            id="savingTarget"
            className={globalstyles.inputbox}
            {...register("savingTarget", {
              required: "Saving target is required",
            })}
          />
        </div>
        <div className={globalstyles.error}>
          {errors.savingTarget ? errors.savingTarget.message : null}
        </div>
        <div className="mb-2 flex justify-end">
          <button type="submit" className="bg-green-500 text-white rounded p-2">
            Set Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default Savings;
