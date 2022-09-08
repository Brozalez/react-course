import Button from "../buttom/buttom.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-itens" />
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
