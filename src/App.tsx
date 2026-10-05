import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InvitationPage from './components/InvitationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/i/:code" element={<InvitationPage />} />
        {/* Route de démo pour tester sans code réel */}
        <Route path="/" element={<Navigate to="/i/8Kx72P" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
