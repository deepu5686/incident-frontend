import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import IncidentListPage from '../features/incidents/IncidentListPage';
import { RequireAuth } from './RequireAuth';
import AppLayout from '../components/layout/AppLayout';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Settings } from '../features/settings/Settings';
import { IncidentPage } from '../features/incidents/IncidentPage';
import UsersPage from '../features/users/UsersPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/incidents" element={<IncidentListPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/incident/:id' element={<IncidentPage/>} />
          <Route path='/users' element={<UsersPage/>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}