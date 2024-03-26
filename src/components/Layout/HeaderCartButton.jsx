import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context'
import React from 'react'

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] =useState(false)
  const cartCtx = useContext(CartContext)

  const {items} = cartCtx
  
  const numberOfCartItems = items.reduce((curValue, item) => {
    return curValue + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  useEffect(() => {
    if(items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    },300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span>Your Cart</span>
        <span className={classes.badge}>
           {numberOfCartItems}
        </span>
    </button>
  )
}

export default HeaderCartButton