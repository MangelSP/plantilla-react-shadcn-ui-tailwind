import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-lg">Welcome, {user?.name || 'User'}!</p>
      <p>This is a protected route. Only authenticated users can see this page.</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}