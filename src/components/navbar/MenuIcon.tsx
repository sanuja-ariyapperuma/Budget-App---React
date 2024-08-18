import { FaArrowUp, FaArrowDown, FaLongArrowAltRight } from "react-icons/fa";
import { BsBoxArrowInDown } from "react-icons/bs";

import { IconType } from "../../helpers/types/CommonTypes";

type GenerateIconProps = {
  iconType: IconType;
};

const MenuIcon = (props: GenerateIconProps) => {
  switch (props.iconType) {
    case IconType.Expense:
      return <FaArrowUp />;
    case IconType.Income:
      return <FaArrowDown />;
    case IconType.Transfers:
      return <FaLongArrowAltRight />;
    case IconType.Savings:
      return <BsBoxArrowInDown />;
    default:
      return <></>;
  }
};

export default MenuIcon;
