import { Transaction, TransactionType } from "../types/CommonTypes";

const convertArrayToCSV = (transactions: Transaction[]): string => {
  const csvRows = [];
  const headers = Object.keys(transactions[0]);
  const renamedHeaders = [
    "Unique ID",
    "Source",
    "Value",
    "Date",
    "Transaction Type",
  ];
  csvRows.push(renamedHeaders.join(","));

  for (const transaction of transactions) {
    const values = headers.map((header) => {
      const escaped = ("" + transaction[header as keyof Transaction]).replace(
        /"/g,
        '\\"'
      );
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
};

export const DownloadCSV = (
  transactions: Transaction[],
  type: TransactionType
) => {
  const convertedTransactions = convertArrayToCSV(transactions);
  const blob = new Blob([convertedTransactions], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${type}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
