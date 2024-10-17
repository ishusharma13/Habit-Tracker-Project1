import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Exercise', completedDays: Array(31).fill(false) },
    { id: 2, name: 'Read', completedDays: Array(31).fill(false) },
    { id: 3, name: 'Meditate', completedDays: Array(31).fill(false) },
  ]);
  
  const [newHabit, setNewHabit] = useState('');

  const handleCheckboxClick = (habitId, dayIndex) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedDays: prevHabits[habitId - 1].completedDays.map((completed, index) =>
                index === dayIndex ? !completed : completed
              ),
            }
          : habit
      )
    );
  };

  const handleAddHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: newHabit,
          completedDays: Array(31).fill(false),
        },
      ]);
      setNewHabit('');
    }
  };

  return (
    <div className="dashboard">
      <div className="calendar">
        <h2>Your Habits</h2>
        <div className="habit-input">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit..."
          />
          <button onClick={handleAddHabit}>Add</button>
        </div>
        <div className="calendar-grid">
          <div className="grid-header">Habit</div>
          {Array.from({ length: 31 }, (_, index) => (
            <div key={index} className="grid-header">{index + 1}</div>
          ))}
          {habits.map((habit) => (
            <React.Fragment key={habit.id}>
              <div className="habit-name">{habit.name}</div>
              {habit.completedDays.map((completed, dayIndex) => (
                <div key={dayIndex} className="checkbox-container">
                  <div
                    className={`checkbox ${completed ? 'completed' : ''}`}
                    onClick={() => handleCheckboxClick(habit.id, dayIndex)}
                  >
                    {completed && <span className="tick">✔</span>} {/* Tick mark when completed */}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
