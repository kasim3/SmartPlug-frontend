import { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";
import AddDeviceModal from "./AddDeviceModal";
import DeviceDetailModal from "./DeviceDetailModal";

const DeviceDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Load devices from deviceData.json
    loadAllDeviceDetails();
    // setDevices(deviceData.devices);
  }, []);

  const loadAllDeviceDetails = async () => {
    // Mock API call to fetch all device details

    const response = await fetch(
      "http://localhost:3000/user/device/getAllDevices",
      {
        method: "POST",
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

  const handleAddDevice = (newDevice) => {
    // Add new device with mock data
    const deviceWithData = {
      ...newDevice,
      status: "active",
      data: {
        voltage: "220V",
        current: "0A",
        power: "0W",
        energy: "0kWh",
        totalPower: "0kWh",
        lastUpdated: new Date().toISOString(),
      },
    };
    setDevices([...devices, deviceWithData]);
    setShowAddModal(false);
  };

  const handleControlClick = (device) => {
    setSelectedDevice(device);
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

        { devices && devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
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

        <div className="flex justify-center">
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            Add Device
          </button>
        </div>

        {showAddModal && (
          <AddDeviceModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddDevice}
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
