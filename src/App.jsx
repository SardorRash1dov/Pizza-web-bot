import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";
import { pizzaTypes } from "./constants/db";

const pizza = pizzaTypes();

const telegram = window.Telegram.WebApp;


function App() {
  const [cartItems, setCartItems] = useState([]);

  	useEffect(() => {
		telegram.ready();
	});

  const onAddItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem) {
			const newData = cartItems.map(c =>
				c.id == item.id
					? { ...existItem, quantity: existItem.quantity + 1 }
					: c
			);
			setCartItems(newData);
		} else {
			const newData = [...cartItems, { ...item, quantity: 1 }];
			setCartItems(newData);
		}
	};

	const onRemoveItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);

		if (existItem.quantity === 1) {
			const newData = cartItems.filter(c => c.id !== existItem.id);
			setCartItems(newData);
		} else {
			const newData = cartItems.map(c =>
				c.id === existItem.id
					? { ...existItem, quantity: existItem.quantity - 1 }
					: c
			);
			setCartItems(newData);
		}
	};

	
	const onCheckout = () => {
		telegram.MainButton.text = 'Sotib olish :)';
		telegram.MainButton.show();
	};

	const onSendData = useCallback(() => {
		telegram.sendData(JSON.stringify(cartItems));	
	}, [cartItems])

	useEffect(() => {
		telegram.onEvent('mainButtonClicked', onSendData);

		return () => telegram.offEvent('mainButtonClicked', onSendData);
	}, [onSendData]);
	


  return (
    <>
      <h1>Pizza</h1>
      <Cart  cartItems={cartItems} onCheckout={onCheckout}/>
      <div className="cards__container">
        {pizza.map((pizz) => (
          <Card key={pizz.id} pizz={pizz} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
        ))}
      </div>
    </>
  );
}

export default App;
