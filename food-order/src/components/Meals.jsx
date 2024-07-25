import { useState, useEffect } from 'react';
import MealItem from './Mealtem';
import useHttp from '../hooks/useHttp';
import Error from './Error.jsx';

const URL = 'http://localhost:3000/meals';
const config = {};
export default function Meals() {
  const { data: fetchedMeals, isLoading, error } = useHttp(URL, config, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {fetchedMeals.map(meal => (
        <MealItem key={meal.id} meal={meal}></MealItem>
      ))}
    </ul>
  );
}
