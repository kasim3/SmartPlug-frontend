import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";

const ApiKeyModal = ({ apiKey, onClose }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDone = () => {
    localStorage.setItem("apiKey", apiKey);
    navigate("/dashboard");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Your API Key</h2>
        <p className="text-gray-600 mb-4">
          Please save this API key securely. You won't be able to see it again.
        </p>
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={apiKey}
            readOnly
            className="flex-1 p-2 border rounded-md bg-gray-50"
          />
          <button
            onClick={handleCopy}
            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {copied ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <ClipboardIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <button
          onClick={handleDone}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;
