import Button from "../buttom/buttom.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-itens" />
      [].map(item => <CartItem cartItem={item} />)
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
