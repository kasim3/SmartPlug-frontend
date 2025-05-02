# Smart Plug Frontend

A React-based frontend application for controlling and monitoring ESP32-based smart plugs.

## Features

- User authentication and registration
- Device management (add, remove, control)
- Real-time device status monitoring
- Historical data visualization
- API key management
- Responsive design

## Tech Stack

- React
- Vite
- Tailwind CSS
- Heroicons
- React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kasim3/SmartPlug-frontend.git
cd SmartPlug-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
├── data/              # JSON data files
├── App.jsx            # Main application component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Key Components

- `DeviceDashboard`: Main dashboard for device management
- `DeviceCard`: Individual device display card
- `AddDeviceModal`: Modal for adding new devices
- `DeviceDetailModal`: Modal for device details and control
- `RegistrationForm`: User registration form
- `ApiKeyModal`: API key management modal
- `RelayToggleSwitch`: Custom toggle switch component

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- ESP32 Smart Plug Backend
- React and Vite communities
- Tailwind CSS for styling
