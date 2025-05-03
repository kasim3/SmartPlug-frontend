import { useState, useEffect } from "react";
import { BoltIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DateRangePicker from "./DateRangePicker";
// import deviceData from "../data/deviceData.json";
import { useParams } from 'react-router-dom';

const DeviceDetailModal = ({ device, onClose, onDateRangeChange }) => {
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const { deviceId } = useParams();

  useEffect(() => {
    fetchDeviceDetails();
  }, []);

  const fetchDeviceDetails = async () => {
    const response = await fetch(
      `http://localhost:3000/user/device/devices/${deviceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ deviceId })
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log("Device details loaded successfully:", data);
      setDeviceDetails(data.data);
    } else {
      console.error("Failed to load device details:", data.message);
    }
  };

  const handleDateRangeChange = (range) => {
    const startDate = new Date(range.startDate);
    const endDate = new Date(range.endDate);

    const filteredData = deviceDetails.historicalData.filter((data) => {
      const dataDate = new Date(data.date);
      return dataDate >= startDate && dataDate <= endDate;
    });

    setHistoricalData(filteredData);
    setShowHistoricalData(true);
  };

  if (!deviceDetails) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Device Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Device Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Name:</span>
                  <span className="text-gray-900">{deviceDetails.deviceName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">ID:</span>
                  <span className="text-gray-900">{deviceDetails.deviceId}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Status:</span>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        deviceDetails.status === 1
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-gray-900">
                      {deviceDetails.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Total Power:</span>
                  <span className="text-gray-900">
                    {deviceDetails.totalConsumption}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Last Updated:</span>
                  <span className="text-gray-900">
                    {new Date(deviceDetails.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Live Data</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Voltage</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {/* {deviceDetails.data.voltage} */}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Current</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {/* {deviceDetails.data.current} */}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Power</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {/* {deviceDetails.data.power} */}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Energy</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {/* {deviceDetails.data.energy} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Data Section */}
        <div className="mt-8">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />

          {showHistoricalData && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Voltage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Power
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Energy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historicalData.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(data.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.voltage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.current}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.power}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.energy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;
