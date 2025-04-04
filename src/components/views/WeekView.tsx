import React from "react";
import { getStartOfWeek, getWeekDatesWithMeta } from "../../utils/date";
import styles from "../Calendar/Calendar.module.scss";

interface WeekViewProps {
  currentDate: Date; // Reference date used to calculate the week
  onDayClick: (date: Date) => void; // Callback triggered when a day is clicked, passing the selected Date
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, onDayClick }) => {
  const startOfWeek = getStartOfWeek(currentDate); // Returns the Sunday of the week the currentDate falls in
  const weekMetaDates = getWeekDatesWithMeta(
    startOfWeek,
    currentDate.getMonth()
  ); // Returns an array of 7 objects (with an isOverflow flag)

  const today = new Date(); // Highlights today's date in the calendar

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();
  // Compares two dates to check if they represent the same calendar day

  return (
    <div className={styles.weekGrid}>
      {/* Loops over each day in the current week */}
      {weekMetaDates.map(({ date, isOverflow }) => {
        const isToday = isSameDay(date, today); // Check if this day is "today"

        return (
          <div
            key={date.toISOString()} // Ensures each cell has a unique key
            className={`${styles.weekDayCell} ${
              isOverflow ? styles.overflowDay : ""
            } ${isToday ? styles.today : ""}`}
            onClick={() => onDayClick(date)} // Communicates clicked day back to the parent (Calendar component)
          >
            <div className={styles.weekDayLabel}>
              {date.toLocaleDateString("default", { weekday: "short" })}
            </div>
            <div>{date.getDate()}</div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
