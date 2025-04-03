import { useState } from "react";
import styles from "./Calendar.module.scss";
import Modal from "../Modal/Modal";
import { useCalendar } from "../../hooks/useCalendar";
import MonthView from "../views/MonthView";
import WeekView from "../views/WeekVIew";
import DayView from "../views/DayView";

const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"]; // To show in the calendar header row
// Starts with "Sun" (index 0) since JS Date.getDay() treats Sunday as 0

type ViewMode = "month" | "week" | "day";

const Calendar: React.FC = () => {
  // Declares a function React component using TypeScript

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const {
    currentDate,
    year,
    month,
    daysArray,
    blankDays,
    goToPrevMonth,
    goToNextMonth,
  } = useCalendar();

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={goToPrevMonth}>{"<"}</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        {/* Formats month as full string in local language */}
        <button onClick={goToNextMonth}>{">"}</button>
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
          onDayClick={setSelectedDay}
        />
      )}
      {viewMode === "week" && <WeekView />}
      {viewMode === "day" && <DayView />}

      <Modal isOpen={selectedDay !== null} onClose={() => setSelectedDay(null)}>
        <h3>Selected Date</h3>
        <p>
          {selectedDay}/{month + 1}/{year}
        </p>
      </Modal>
    </div>
  );
};

export default Calendar;
