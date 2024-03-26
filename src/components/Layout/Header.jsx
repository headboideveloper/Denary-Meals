import React from 'react'
import Meal from '../../assets/meal.png';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return <React.Fragment>
    <header className={classes.header}>
    <h1 className='text-2xl'>DenaryMeals</h1>
   <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
    <img src={Meal} alt='A table full of delicious meals!' />
    </div>
  </React.Fragment>
}

export default Header