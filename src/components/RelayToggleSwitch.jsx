import React from "react";

const RelayToggleSwitch = ({ status, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out ${
        status=='1'
          ? "bg-gradient-to-r from-blue-700 to-blue-800"
          : "bg-gradient-to-r from-gray-300 to-gray-400"
      }`}
    >
      <span
        className={`absolute h-6 w-6 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          status ? "left-[95%] transform -translate-x-1/2" : "left-[5%] transform -translate-x-1/2"
        }`}
      />
      <span
        className={`absolute text-xs font-semibold transition-all duration-300 ${
          status=='1' ? "left-1 text-white" : "right-1 text-gray-600"
        }`}
      >
        {status=='1' ? "ON" : "OFF"}
      </span>
    </button>
  );
};

export default RelayToggleSwitch;
