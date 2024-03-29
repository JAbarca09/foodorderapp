import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// TODO Fetch the meals from firebase and map through the data to display meals!

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const loadedMeals = [];

      const response = await fetch(
        "https://react-test-project-7e7be-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      // TODO iterate through an object with objects inside of it and push elements to an array and map through it!
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(isLoading) {
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
      );
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
        <p>Failed to fetch</p>
      </section>  
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {mealsList}
      </Card>
    </section>
  );
};

export default AvailableMeals;
