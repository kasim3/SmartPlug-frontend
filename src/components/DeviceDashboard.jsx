import { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";
import AddDeviceModal from "./AddDeviceModal";
import DeviceDetailModal from "./DeviceDetailModal";
import { useNavigate } from 'react-router-dom';

const DeviceDashboard = (devicesDetails) => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL || "";
  useEffect(() => {
    // Load devices from deviceData.json
    loadAllDeviceDetails();
    // setDevices(deviceData.devices);
  }, []);

  const loadAllDeviceDetails = async () => {
    // Mock API call to fetch all device details

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
    } else {
      console.error("Failed to load devices:", data.message);
    }
  };

  const handleAddDevice = () => {
    loadAllDeviceDetails();
  };

  const handleControlClick = (deviceId) => {
    navigate(`/dashboard/${deviceId}`);
    setSelectedDevice(deviceId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedDevice(null);
  };

  const handleDateRangeChange = (range) => {
    console.log("Fetching data for range:", range);
    // Here you would make an API call to fetch historical data
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Device Dashboard
        </h1>

        {devices && devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            className="btn-primary w-[30%]"
          >
            Add Device
          </button>
          <span className="text-red-600">
            <span className="font-bold">*note :</span>Plug your Smart Plug to
            power supply and connect it to a Wi-Fi network.
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

        {showDetailModal && selectedDevice && (
          <DeviceDetailModal
            device={selectedDevice}
            onClose={handleCloseDetailModal}
            onDateRangeChange={handleDateRangeChange}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceDashboard;
