import React, { useEffect, useState } from "react";

import CurrencyFormat from "../../helpers/CurrencyFormat";

type WidgetProps = {
  title: string;
  value: number;
  basevalue?: number;
};

const Widget = (props: WidgetProps) => {
  const [savedPopotion, setSavedPopotion] = useState(0);

  useEffect(() => {
    if (props.basevalue) {
      const savedProportion = (props.value / props.basevalue) * 100;
      setSavedPopotion(savedProportion > 100 ? 100 : savedProportion);
    }
  }, [props.value, props.basevalue]);

  return (
    <div className="bg-blue-200 p-5 rounded-xl shadow-lg">
      <div className="mr-10">
        <span>
          {props.title} {props.basevalue ? `(${savedPopotion}%)` : null}
        </span>
      </div>
      <div className="text-right">
        <CurrencyFormat value={props.value} />
      </div>
      <div>
        {props.basevalue ? (
          <progress
            className="flex mt-2 w-full"
            id="file"
            value={props.value}
            max={props.basevalue}
          ></progress>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Widget;
