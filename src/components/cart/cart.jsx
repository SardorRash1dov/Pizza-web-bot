import Button from "../button/button";
import { totalPrice } from "../units/total-price";
import "./cart.css";

function Cart({ cartItems, onCheckout}) {
  console.log(cartItems);

  return (
    <div className="cart__container">
      <p>Umumiy narx: {' '} {totalPrice(cartItems)} UZS</p>

      <Button title={`${cartItems.length == 0 ? 'Buyurtma berish' : "To'lov"}`} disable={cartItems == 0 ? true : false} type={"checkout"} onClick={onCheckout} />
    </div>
  );
}

export default Cart;
