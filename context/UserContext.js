// context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [skinType, setSkinType] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [skinNotes, setSkinNotes] = useState('');
  const [trackerStats, setTrackerStats] = useState({
    todayCompleted: 0,
    streak: 0,
    lastCompleted: null,
  });

  const toggleFavourite = (product) => {
    setFavourites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavourite = (productId) => {
    return favourites.some((p) => p.id === productId);
  };

  const updateTrackerStats = (completedCount) => {
    const today = new Date().toDateString();
    setTrackerStats((prev) => {
      const isConsecutive = prev.lastCompleted ===
        new Date(Date.now() - 86400000).toDateString();
      return {
        todayCompleted: completedCount,
        streak: prev.lastCompleted === today
          ? prev.streak
          : isConsecutive ? prev.streak + 1 : 1,
        lastCompleted: today,
      };
    });
  };

  return (
    <UserContext.Provider value={{
      user, setUser,
      skinType, setSkinType,
      favourites, toggleFavourite, isFavourite,
      skinNotes, setSkinNotes,
      trackerStats, updateTrackerStats,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}