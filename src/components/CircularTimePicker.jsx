"use client";
import React, { useState, useRef } from "react";

const CircularTimePicker = ({ onSelectTime, onDone, defaultQuadrant }) => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  const handleTimeSelect = () => {
    const formattedHour = isAM ? selectedHour % 12 : (selectedHour % 12) + 12;
    const time = `${formattedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;

    onSelectTime(time, defaultQuadrant);
    onDone();
  };

  const hourHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const radius = 150;

  const calculatePosition = (angle, radius) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.sin(radians) * radius,
      y: Math.cos(radians) * radius,
    };
  };

  const getAngleFromEvent = (event, handRef) => {
    const rect = handRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const handleHourDrag = (event) => {
    const angle = getAngleFromEvent(event, hourHandRef);
    let hour = Math.round(angle / 30) % 12;
    if (hour === 0) hour = 12;
    setSelectedHour(hour);
    updateSelectedTime(hour, selectedMinute);
  };

  const handleMinuteDrag = (event) => {
    const angle = getAngleFromEvent(event, minuteHandRef);
    const minute = Math.round(angle / 6) % 60;
    setSelectedMinute(minute);
    updateSelectedTime(selectedHour, minute);
  };

  const updateSelectedTime = (hour, minute) => {
    const adjustedHour = isAM ? hour % 12 : hour % 12 + 12;
    onSelectTime(`${adjustedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
  };

  const toggleAMPM = () => {
    setIsAM((prev) => !prev);
    const adjustedHour = isAM ? selectedHour % 12 + 12 : selectedHour % 12;
    onSelectTime(`${adjustedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`);
  };

  const hourHandStyle = {
    position: "absolute",
    height: "80px",
    width: "4px",
    backgroundColor: "blue",
    transformOrigin: "bottom",
    transform: `rotate(${(selectedHour % 12) * 30 + (selectedMinute / 60) * 30}deg)`,
    top: "25%",
    left: "50%",
    marginLeft: "-2px",
  };

  const minuteHandStyle = {
    position: "absolute",
    height: "100px",
    width: "2px",
    backgroundColor: "blue",
    transformOrigin: "bottom",
    transform: `rotate(${selectedMinute * 6}deg)`,
    top: "20%",
    left: "50%",
    marginLeft: "-1px",
  };

  const hourMarkers = [...Array(12)].map((_, index) => {
    const angle = index * 30;
    const { x, y } = calculatePosition(angle, radius - 40);
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: `calc(50% + ${x}px)`,
          top: `calc(50% - ${y}px)`,
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {index === 0 ? 12 : index}
      </div>
    );
  });

  const minuteMarkers = [...Array(60)].map((_, index) => {
    const angle = index * 6;
    const { x, y } = calculatePosition(angle, radius - 20);
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: `calc(50% + ${x}px)`,
          top: `calc(50% - ${y}px)`,
          transform: "translate(-50%, -50%)",
          fontSize: "12px",
        }}
      >
        {index % 5 === 0 ? index : ""}
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          position: "relative",
          height: `${radius * 2}px`,
          width: `${radius * 2}px`,
          borderRadius: "50%",
          border: "2px solid black",
        }}
      >
        {hourMarkers}
        {minuteMarkers}
        <div
          ref={hourHandRef}
          style={hourHandStyle}
          draggable
          onDrag={handleHourDrag}
        />
        <div
          ref={minuteHandRef}
          style={minuteHandStyle}
          draggable
          onDrag={handleMinuteDrag}
        />
      </div>
      <div className="flex items-center mt-4">
        <select onChange={(e) => setSelectedHour(parseInt(e.target.value))} value={selectedHour}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{i === 0 ? 12 : i}</option>
          ))}
        </select>
        :
        <select onChange={(e) => setSelectedMinute(parseInt(e.target.value))} value={selectedMinute}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>{i.toString().padStart(2, "0")}</option>
          ))}
        </select>
        <button onClick={toggleAMPM}>{isAM ? "AM" : "PM"}</button>
      </div>
      <button onClick={handleTimeSelect} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Done
      </button>
    </div>
  );
};

export default CircularTimePicker;
