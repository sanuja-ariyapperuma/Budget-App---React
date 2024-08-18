import { Link } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";

import { IconType } from "../../helpers/types/CommonTypes";
import MenuIcon from "./MenuIcon";

type NavItemProps = {
  title: string;
  to: string;
  iconType: IconType;
};

const NavItem = (props: NavItemProps) => {
  return (
    <div className="mx-5 bg-gray-100 p-3 border rounded-md">
      {" "}
      <Link to={props.to} className="flex flex-row">
        <div className="mr-3">
          <MenuIcon iconType={props.iconType} />
          <BsCashCoin />
        </div>
        {props.title}
      </Link>
    </div>
  );
};

export default NavItem;
