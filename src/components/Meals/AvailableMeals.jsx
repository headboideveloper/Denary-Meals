import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect( () => {
        setIsLoading(true)
        const fetchMeals = async () => {
           const response = await fetch('https://denary-meals-default-rtdb.firebaseio.com/meals.json')
           if (!response.ok) {
            throw new Error ('Something went wrong- try again')
           }
           const data = await response.json();
           const loadedMeals = []
           for (const key in data) {
            loadedMeals.push({
                id:key,
                name:data[key].name,
                description:data[key].description,
                price:data[key].price,
            })
           }
           setMeals(loadedMeals)
           setIsLoading(false)
        }
        fetchMeals().catch((error) => {
            setError(error.message)
            setIsLoading(false)
            })
    },[])

    if (isLoading)
     return <section className='text-center mt-3'>
        <p className='text-white'>Loading. Please wait...</p>
     </section>

    if (error)
    return <section className='text-center mt-3'>
    <p className='text-[#8a2b06]'>{error}</p>
    </section>

  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/> );
  return (
  <section className={classes.meals}>
    <Card><ul>{mealsList}</ul></Card>
  </section>
  )
}

export default AvailableMeals