import React, { useState } from 'react'
import './card.css'
import Button from '../button/button'

function Card({pizz, onAddItem, onRemoveItem}) {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(prev => prev + 1)
    onAddItem(pizz)
  }
  const handleDecrement = () => {
    setCount(prev => prev - 1)

    onRemoveItem(pizz)
  }



  return (
    <div className='card'>
        <span className={`${count !== 0 ? 'card__badge' : 'card__badge-hidden'}`}>{count}</span>

        <div className="image__container">
            <img src={pizz.image} alt={pizz.title} width={'100%'} height={"230px"}/>
        </div>

        <div className="card__body">
            <h2 className="card__title">{pizz.title}</h2>
            <div className="card__ingredient">{pizz.ingredient}</div>
            <div className="card__price">{pizz.price} UZS</div>
        </div>

        <div className="hr"></div>

        <div className="btn__container">
            <Button title={'+'} type={'add'} onClick={handleIncrement}/>
            {count !== 0 && 
              <Button title={'-'} type={'remove'} onClick={handleDecrement}/>
            }
            
        </div>
    </div>
  )
}

export default Card