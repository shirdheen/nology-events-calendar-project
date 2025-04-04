import React from "react";
import { getStartOfWeek, getWeekDatesWithMeta } from "../../utils/date";
import styles from "../Calendar/Calendar.module.scss";

interface WeekViewProps {
  currentDate: Date;
  onDayClick: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, onDayClick }) => {
  const startOfWeek = getStartOfWeek(currentDate);
  const weekMetaDates = getWeekDatesWithMeta(
    startOfWeek,
    currentDate.getMonth()
  );

  const today = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  return (
    <div className={styles.weekGrid}>
      {weekMetaDates.map(({ date, isOverflow }) => {
        const isToday = isSameDay(date, today);

        return (
          <div
            key={date.toISOString()}
            className={`${styles.weekDayCell} ${
              isOverflow ? styles.overflowDay : ""
            } ${isToday ? styles.today : ""}`}
            onClick={() => onDayClick(date)}
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
