import React, { Fragment } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import { useContext } from 'react'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import CheckOut from './CheckOut'
import {useState} from 'react'



const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false) 
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
      cartCtx.addItem({...item, amount:1})
    }

    const orderHandler =() => {
      setIsCheckOut(true)
    }

    const submitOrderHandler = async (userData) => {
      setIsSubmitting(true)
      await fetch('https://denary-meals-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body:JSON.stringify({
          user:userData,
          orderedItems: cartCtx.items
        })
      })
      setIsSubmitting(false)
      setDidSubmit(true)
      cartCtx.clearCart()
    }

    const cartItems = (
    <ul className={classes['cart-items']}> 
    {cartCtx.items.map((item) => ( 
       <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
    ))}
    </ul>)

    const modalActions = (
      <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
           {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button> }
        </div>
    )

    const cartModalContent = <Fragment>
       {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
       { isCheckOut && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
       {!isCheckOut && modalActions}   
    </Fragment>

    const isSubmittingModalContent = <p>Requesting Order</p>
    const didSubmitModalContent = 
      <div>
      <p>Successfully placed your order!</p>
      <p>You'll be contacted</p>
      <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
      </div>
    
  return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
  )
}

export default Cart