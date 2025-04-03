import { useState } from "react";
import { getCalendarMeta } from "../utils/calendar";

export function useCalendar() {
  // Declares a function React component using TypeScript
  const [currentDate, setCurrentDate] = useState(new Date()); // Sets up state to hold the "current" date that the calendar is displaying
  // Initially set to new Date() - today's date
  // setCurrentDate updates the state when switching months

  const calendarMeta = getCalendarMeta(currentDate);

  const goToPrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    ); // Goes to the previous month by creating a new Date object
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    ); // Goes to the next month similarly
    setCurrentDate(nextMonth);
  };

  // Date automatically handles year overflow

  return {
    currentDate,
    ...calendarMeta,
    goToPrevMonth,
    goToNextMonth,
    setCurrentDate,
  };
}
