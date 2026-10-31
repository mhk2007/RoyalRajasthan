import React from "react";

const BookingForm = ({
  formData,
  handleChange,
  handleProceed,
  setFormData,
  setTableType
}) => {
  return (
    <form className="flex flex-col gap-2 sm:gap-2.5">

      <input name="name" placeholder="Name"
        value={formData.name} onChange={handleChange}
        className="rounded border bg-white/20 px-2 py-1.5 text-sm text-white sm:py-2 sm:text-base" />

      <input type="email" name="email" placeholder="Email"
        value={formData.email} onChange={handleChange}
        className="rounded border bg-white/20 px-2 py-1.5 text-sm text-white sm:py-2 sm:text-base" />

      <input name="mobile" placeholder="Mobile"
        value={formData.mobile} onChange={handleChange}
        className="rounded border bg-white/20 px-2 py-1.5 text-sm text-white sm:py-2 sm:text-base" />

      <input type="date" name="date"
        value={formData.date} onChange={handleChange}
        className="rounded border bg-white/20 px-2 py-1.5 text-sm text-white sm:py-2 sm:text-base" />

      <input type="time" name="time"
        value={formData.time} onChange={handleChange}
        className="rounded border bg-white/20 px-2 py-1.5 text-sm text-white sm:py-2 sm:text-base" />

      {/* 👥 GUESTS 2–10 */}
      <div className="flex flex-wrap justify-center gap-1">
        {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setFormData({ ...formData, guests: num })}
            className={`rounded border px-2 py-0.5 text-sm sm:px-3 sm:py-1 ${
              formData.guests == num
                ? "bg-yellow-500 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button type="button"
        onClick={handleProceed}
        className="rounded bg-yellow-500 py-1.5 text-sm sm:py-2 sm:text-base">
        Submit Booking
      </button>

      <button
        type="button"
        onClick={() => setTableType("")}
        className="text-white underline text-sm"
      >
        ← Change Table
      </button>

    </form>
  );
};

export default BookingForm;
