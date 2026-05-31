import { useState } from "react";
import type { FoodItems } from "../types";

interface RatingProps {
  id: FoodItems["id"];
  name: FoodItems["name"];
  rating: FoodItems["rating"];
}

const initialItems: RatingProps[] = [
  { id: 1, name: "🍕 Pizza", rating: 0 },
  { id: 2, name: "🍔 Burger", rating: 0 },
  { id: 3, name: "🌮 Taco", rating: 0 },
  { id: 4, name: "🥗 Salad", rating: 0 },
];

type FilterType = "all" | "high" | "low" | "unrated";

function Rating() {
  const [items, setItems] = useState<RatingProps[]>(initialItems);
  const [filter, setFilter] = useState<FilterType>("all");

  const updateRating = (id: number, rating: number): void => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rating } : item
      )
    );
  };

  const resetRatings = (): void => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        rating: 0,
      }))
    );
  };

  const filteredItems = items.filter((item) => {
    switch (filter) {
      case "high":
        return item.rating >= 4;

      case "low":
        return item.rating < 3;

      case "unrated":
        return item.rating === 0;

      default:
        return true;
    }
  });

  const totalRating = items.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  const avgRating = totalRating / items.length;

  const highestRatedFood = [...items].sort(
    (a, b) => b.rating - a.rating
  )[0];

  const lowestRatedFood = [...items].sort(
    (a, b) => a.rating - b.rating
  )[0];

  const highRatedCount = items.filter(
    (item) => item.rating >= 4
  ).length;

  const allZero = items.every((item) => item.rating === 0);

  return (
  <div className="rating-container">
    <div className="rating-card">
      <h1>🍽️ Food Rating App</h1>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>
          Show All
        </button>

        <button onClick={() => setFilter("high")}>
          High Rated (4+ ⭐)
        </button>

        <button onClick={() => setFilter("low")}>
          Low Rated (&lt; 3 ⭐)
        </button>

        <button onClick={() => setFilter("unrated")}>
          Unrated (0 ⭐)
        </button>
      </div>

      <div className="food-list">
        {filteredItems.map((item) => (
          <div className="food-card" key={item.id}>
            <h3>{item.name}</h3>

            <p>Current Rating: {item.rating} ⭐</p>

            <div className="star-buttons">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() =>
                    updateRating(item.id, star)
                  }
                >
                  {star}⭐
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="stats">
        <h2>Statistics</h2>

        {allZero ? (
          <p>No ratings available</p>
        ) : (
          <>
            <p>
              Average Rating:
              {avgRating.toFixed(2)}
            </p>

            <p>
              Highest Rated Food:
              {highestRatedFood?.name}
            </p>

            <p>
              Lowest Rated Food:
              {lowestRatedFood?.name}
            </p>

            <p>
              Foods Rated 4⭐ or Higher:
              {highRatedCount}
            </p>
          </>
        )}
      </div>

      <button
        className="reset-btn"
        onClick={resetRatings}
      >
        Reset All Ratings
      </button>
    </div>
  </div>
);
}

export default Rating;