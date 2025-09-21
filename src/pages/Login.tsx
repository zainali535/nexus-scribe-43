import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: "1",
        username: "developer",
        email: data.email,
        score: 1250,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`
      };

      // Store user data (in real app, this would be JWT)
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });

      navigate('/feed');
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm 
      type="login" 
      onSubmit={handleLogin} 
      loading={loading} 
      error={error} 
    />
  );
}