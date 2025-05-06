import { BoltIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import RelayToggleSwitch from "./RelayToggleSwitch";

const DeviceCard = ({ device, onControlClick, onToggleRelay }) => {
  const [isOnline, setIsOnline] = useState(device.isOnline);

  useEffect(() => {
    setIsOnline(device.isOnline);
  }, [device.isOnline]);

  const handleToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    if (onToggleRelay) {
      onToggleRelay(device.id, newStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 relative min-w-[300px] min-h-[200px]">
      {/* Status Indicator */}
      <div className="flex text-black items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${device.isOnline ? "bg-green-500" : "bg-red-500"
            }`}
        />
        {device.isOnline ? "Online" : "Offline"}
      </div>

      <div className="space-y-6 mt-4">
        <div className="flex flex-col gap-4 items-center justify-between">
          <div className="flex items-center space-x-3">
            <BoltIcon className="h-7 w-7 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {device.deviceName}
            </h3>
          </div>
          <RelayToggleSwitch status={device.status} onToggle={handleToggle} />
        </div>
        <p className="text-base text-gray-500">ID: {device.deviceId}</p>
        <button
          onClick={() => onControlClick(device.deviceId)}
          className="w-full btn-primary py-3 text-base"
        >
          Control Device
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
