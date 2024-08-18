import NavItem from "./NavItem";
import { IconType } from "../../helpers/types/CommonTypes";

const NavBar = () => {
  return (
    <div className="m-5 w-100 flex">
      <NavItem title="Dashbord" to="/" iconType={IconType.Income} />
      <NavItem title="Income" to="/income" iconType={IconType.Income} />
      <NavItem title="Expense" to="/expense" iconType={IconType.Expense} />
      <NavItem
        title="Set Saving Target"
        to="/savings"
        iconType={IconType.Savings}
      />
      <NavItem title="Transfer" to="/transfer" iconType={IconType.Transfers} />
    </div>
  );
};

export default NavBar;
