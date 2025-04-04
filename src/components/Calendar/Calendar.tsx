import { useState } from "react";
import styles from "./Calendar.module.scss";
import Modal from "../Modal/Modal";
import { useCalendar } from "../../hooks/useCalendar";
import MonthView from "../views/MonthView";
import WeekView from "../views/WeekView";
import DayView from "../views/DayView";

const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]; // To show in the calendar header row
// Starts with "Sun" (index 0) since JS Date.getDay() treats Sunday as 0

type ViewMode = "month" | "week" | "day";

const Calendar: React.FC = () => {
  // Declares a function React component using TypeScript

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const {
    currentDate,
    year,
    month,
    daysArray,
    blankDays,
    goToPrevMonth,
    goToNextMonth,
    goToNextWeek,
    goToPrevWeek,
  } = useCalendar();

  const handlePrev = () => {
    if (viewMode === "month") goToPrevMonth();
    else if (viewMode === "week") goToPrevWeek();
  };

  const handleNext = () => {
    if (viewMode === "month") goToNextMonth();
    else if (viewMode === "week") goToNextWeek();
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePrev}>{"<"}</button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        {/* Formats month as full string in local language */}
        <button onClick={handleNext}>{">"}</button>
      </div>

      {/* View mode toggle */}
      <div className={styles.viewToggle}>
        <button
          className={viewMode === "month" ? styles.active : ""}
          onClick={() => setViewMode("month")}
        >
          Month
        </button>
        <button
          className={viewMode === "week" ? styles.active : ""}
          onClick={() => setViewMode("week")}
        >
          Week
        </button>
        <button
          className={viewMode === "day" ? styles.active : ""}
          onClick={() => setViewMode("day")}
        >
          Day
        </button>
      </div>

      {/* View components */}
      {viewMode === "month" && (
        <MonthView
          daysOfWeek={daysOfWeek}
          blankDays={blankDays}
          daysArray={daysArray}
          month={month}
          year={year}
          onDayClick={(day) => {
            const date = new Date(year, month, day);
            setSelectedDate(date);
          }}
        />
      )}
      {viewMode === "week" && (
        <WeekView
          currentDate={currentDate}
          onDayClick={(date) => {
            setSelectedDate(date);
          }}
        />
      )}
      {viewMode === "day" && <DayView />}

      <Modal
        isOpen={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
      >
        <h3>Selected Date</h3>
        <p>
          {selectedDate?.toLocaleDateString("default", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </Modal>
    </div>
  );
};

export default Calendar;
