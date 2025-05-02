import { useState, useEffect } from "react";
import DeviceCard from "./DeviceCard";
import AddDeviceModal from "./AddDeviceModal";
import DeviceDetailModal from "./DeviceDetailModal";
import deviceData from "../data/deviceData.json";

const DeviceDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Load devices from deviceData.json
    setDevices(deviceData.devices);
  }, []);

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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Device Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onControlClick={handleControlClick}
            />
          ))}
        </div>

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
