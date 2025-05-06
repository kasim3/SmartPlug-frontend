import { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";
import AddDeviceModal from "./AddDeviceModal";
import DeviceDetailModal from "./DeviceDetailModal";
import { useNavigate } from 'react-router-dom';

const DeviceDashboard = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(false)
  const backend_url = import.meta.env.VITE_BACKEND_URL || "";
  useEffect(() => {
    // Load devices from deviceData.json
    loadAllDeviceDetails();
    // setDevices(deviceData.devices);
  }, []);

  const loadAllDeviceDetails = async () => {
    // Mock API call to fetch all device details
    setLoading(true);
    const response = await fetch(
      `${backend_url}/user/device/getAllDevices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log("Devices loaded successfully:", data);

      setDevices(data.data);
      setLoading(false);
    } else {
      console.error("Failed to load devices:", data.message);
      setLoading(false);
    }
  };

  const handleAddDevice = () => {
    loadAllDeviceDetails();
  };

  const handleControlClick = (deviceId) => {
    navigate(`/dashboard/${deviceId}`);
  };

  const handleCloseDetailModal = () => {
    setSelectedDevice(null);
  };

  const handleDateRangeChange = (range) => {
    console.log("Fetching data for range:", range);
    // Here you would make an API call to fetch historical data
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Device Dashboard
          </h1>
          <button
            onClick={loadAllDeviceDetails}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded w-full sm:w-auto justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              'Sync'
            )}
          </button>
        </div>

        {devices && devices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {devices.map((device) => (
              <DeviceCard
                key={device.deviceId}
                device={device}
                onControlClick={handleControlClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 my-7">
            No devices found. Please add a device to get started.
          </div>
        )}

        <div className="flex flex-col gap-3.5 justify-center items-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary w-full sm:w-[70%] md:w-[50%] lg:w-[30%] text-center"
          >
            Add Device
          </button>
          <span className="text-sm text-red-600 text-center px-2">
            <span className="font-bold">*note :</span> Plug your Smart Plug to power supply and connect it to a Wi-Fi network.
          </span>
        </div>

        {showAddModal && (
          <AddDeviceModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddDevice}
            setShowAddModal={setShowAddModal}
            showAddModal={showAddModal}
            setDevices={setDevices}
          />
        )}
      </div>
    </div>

  );
};

export default DeviceDashboard;
