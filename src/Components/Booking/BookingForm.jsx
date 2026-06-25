import React from "react";

const BookingForm = ({
  formData,
  handleChange,
  handleProceed,
  setFormData,
  setTableType
}) => {
  return (
    <form className="flex flex-col gap-4">

      <input name="name" placeholder="Name"
        value={formData.name} onChange={handleChange}
        className="p-3 rounded bg-white/20 text-white border" />

      <input name="mobile" placeholder="Mobile"
        value={formData.mobile} onChange={handleChange}
        className="p-3 rounded bg-white/20 text-white border" />

      <input type="date" name="date"
        value={formData.date} onChange={handleChange}
        className="p-3 rounded bg-white/20 text-white border" />

      <input type="time" name="time"
        value={formData.time} onChange={handleChange}
        className="p-3 rounded bg-white/20 text-white border" />

      {/* 👥 GUESTS 2–10 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: 9 }, (_, i) => i + 2).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setFormData({ ...formData, guests: num })}
            className={`px-4 py-2 rounded border ${
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
        className="bg-yellow-500 py-3 rounded">
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