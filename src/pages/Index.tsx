import { Hero3D } from "@/components/Hero3D";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";

const Index = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation user={user} onLogout={handleLogout} />
      <Hero3D />
    </div>
  );
};

export default Index;
