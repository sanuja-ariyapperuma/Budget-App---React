import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Savings from "./pages/Savings";
import Transfer from "./pages/Transfer";
import Summary from "./components/summary/Summary";
import Navbar from "./components/navbar/NavBar";
import BudgetComponent from "./pages/BudgetComponent";
import { Transaction, TransactionType } from "./helpers/types/CommonTypes";
import { DownloadCSV } from "./helpers/functions/CsvDownload";
import Dashboard from "./pages/Dashboard";
import globalStyles from "./App.module.css";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const localData = localStorage.getItem("transactions");
    return localData ? JSON.parse(localData) : [];
  });
  const [savingTarget, setSavingTarget] = useState<number>(() => {
    const localData = localStorage.getItem("savingTarget");
    return localData ? Number(localData) : 0;
  });
  const [currentSaving, setCurrentSaving] = useState<number>(() => {
    const localData = localStorage.getItem("currentSaving");
    return localData ? Number(localData) : 0;
  });
  const [balance, setBalance] = useState<number>(() => {
    const localData = localStorage.getItem("balance");
    return localData ? Number(localData) : 0;
  });

  const upDateBalance = () => {
    setBalance(
      transactions.reduce((bal, transaction) => {
        if (transaction.transactionType === TransactionType.Income) {
          return bal + Number(transaction.sourceValue);
        } else {
          return bal - Number(transaction.sourceValue);
        }
      }, 0)
    );
  };

  const updateLocalStorage = (
    key: string,
    storageObject: Transaction[] | number
  ) => {
    localStorage.setItem(key, JSON.stringify(storageObject));
  };

  useEffect(() => {
    upDateBalance();
    updateLocalStorage("transactions", transactions);
  }, [transactions]);

  useEffect(() => {
    updateLocalStorage("balance", balance);
  }, [balance]);

  useEffect(() => {
    updateLocalStorage("savingTarget", Number(savingTarget));
  }, [savingTarget]);

  useEffect(() => {
    updateLocalStorage("currentSaving", Number(currentSaving));
  }, [currentSaving]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    if (transaction.transactionType === TransactionType.Transfer) {
      setCurrentSaving(
        (prevSaving) => Number(prevSaving) + Number(transaction.sourceValue)
      );
    }
  };

  const removeTransaction = (transactionId: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  const updateSavingTarget = (target: number) => {
    setSavingTarget(target);
  };

  const downloadCSV = (type: TransactionType) => {
    const transactionList = transactions.filter(
      (transaction) => transaction.transactionType == type
    );

    DownloadCSV(transactionList, type);
  };

  return (
    <div className={globalStyles.mainContainer}>
      <Summary
        transactionList={transactions}
        savingTarget={savingTarget}
        currentSaving={currentSaving}
        balance={balance}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} />} />
        <Route
          path="/income"
          element={
            <Income
              transactionList={transactions}
              onTransactionAdd={addTransaction}
              onTransactionRemove={removeTransaction}
              downloadCSV={downloadCSV}
            />
          }
        />
        <Route
          path="/expense"
          element={
            <Expense
              transactionList={transactions}
              onTransactionAdd={addTransaction}
              onTransactionRemove={removeTransaction}
              balance={balance}
              downloadCSV={downloadCSV}
            />
          }
        />
        <Route
          path="/savings"
          element={
            <Savings
              onSetSavingTarget={updateSavingTarget}
              savingTarget={savingTarget}
            />
          }
        />
        <Route
          path="/transfer"
          element={
            <Transfer
              onCurrentSavingChange={addTransaction}
              currentSaving={currentSaving}
              balance={balance}
            />
          }
        />
        <Route
          path="/budget-app"
          element={
            <BudgetComponent
              transactions={transactions}
              addTransaction={addTransaction}
              removeTransaction={removeTransaction}
              balance={balance}
              updateSavingTarget={updateSavingTarget}
              savingTarget={savingTarget}
              currentSaving={currentSaving}
              downloadCSV={downloadCSV}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
