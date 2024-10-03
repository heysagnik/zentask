"use client";

import React from 'react';
import TimePicker from 'react-time-picker';

const TimePickerModal = ({ selectedTime, setSelectedTime, handleTimePickerDone }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4 text-center">Select Time</h2>
        <TimePicker
          onChange={(time) => setSelectedTime(time)}
          value={selectedTime}
          className="w-full"
          clearIcon={null}
          clockIcon={null}
          disableClock={true}
          format="h:mm a"
          hourPlaceholder="hh"
          minutePlaceholder="mm"
          amPmAriaLabel="Select AM/PM"
          locale="en-US"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleTimePickerDone}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;