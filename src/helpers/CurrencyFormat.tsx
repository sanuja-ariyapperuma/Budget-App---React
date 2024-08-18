const CurrencyFormat = (props: { value: number }) => {
  return (
    <span>
      {" "}
      €{" "}
      {Number(props.value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

export default CurrencyFormat;
