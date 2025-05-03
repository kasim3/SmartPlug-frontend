import { useState } from "react";

const AddDeviceModal = ({
  onClose,
  onSubmit,
  showAddModal,
  setShowAddModal,
}) => {
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log(showAddModal);
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.deviceName && formData.deviceId) {
      onSubmit(formData);
      console.log(formData);

      try {
        // Mock API call for testing

        // Uncomment this when backend is ready
        const response = await fetch("http://localhost:3000/user/device/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setLoading(false);
          setShowAddModal(false);
          console.log(showAddModal);
        } else {
          setLoading(false);
          setError(data.message || "Registration failed");
        }
      } catch (error) {
        setLoading(false);
        console.error("Registration failed:", error);
        setError("Unable to connect to the server. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl text-black font-bold mb-4">Add New Device</h2>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Device Name
            </label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.deviceName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Device ID <span className="text-xs">(*Provided on plug)</span>
            </label>
            <input
              type="text"
              id="deviceId"
              name="deviceId"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.deviceId}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-white hover:bg-gray-50 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Adding Device..." : "Add Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;
