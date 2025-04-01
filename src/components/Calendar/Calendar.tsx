import { useState } from "react";
import styles from "./Calendar.module.scss";

const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]; // To show in the calendar header row
// Starts with "Sun" (index 0) since JS Date.getDay() treats Sunday as 0

const Calendar: React.FC = () => {
  // Declares a function React component using TypeScript
  const [currentDate, setCurrentDate] = useState(new Date()); // Sets up state to hold the "current" date that the calendar is displaying
  // Initially set to new Date() - today's date
  // setCurrentDate updates the state when switching months

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // Extracts the year and month number (0-based) from current date

  const firstDayOfMonth = new Date(year, month, 1); // The first day of the current month
  const lastDayOfMonth = new Date(year, month + 1, 0); // The last day of the current month. Setting day to 0 for the next month gives the last day of this month
  const startDayIndex = firstDayOfMonth.getDay(); // Day of week the month starts on (0-6)
  const totalDays = lastDayOfMonth.getDate(); // Total number of days in this month (28, 30, 31)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  }; // Goes to the previous month by creating a new Date object

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  }; // Goes to the next month similarly

  // Date automatically handles year overflow

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1); // Creates an array [1, 2, ...., totalDays] to render each day of the month
  console.log(daysArray);

  const blankDays = Array.from({ length: startDayIndex }); // Creates an array of empty slots for padding before the 1st of the month, so days align correctly to the weekday
  console.log(blankDays);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        {/* Formats month as full string in local language */}
        <button onClick={handleNextMonth}>{">"}</button>
      </div>

      {/* Renders the day labels at the top of the calendar grid */}
      <div className={styles.grid}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}

        {/* Adds empty cells before day 1 of the month starts to align it properly with the correct weekday */}
        {blankDays.map((_, i) => (
          <div key={`blank-${i}`} className={styles.dayCell}></div>
        ))}

        {/* Loops through all the days of the current month and renders them as clickable cells */}
        {daysArray.map((day) => {
          const today = new Date();
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={day}
              className={`${styles.dayCell} ${isToday ? styles.today : ""}`}
              onClick={() => alert(`Clicked ${day}/${month + 1}/${year}`)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
