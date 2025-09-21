import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (data: { username?: string; email: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockUser = {
        id: Date.now().toString(),
        username: data.username || "newuser",
        email: data.email,
        score: 0,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`
      };

      // Store user data (in real app, this would be JWT)
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Welcome to TechStack!",
        description: "Your account has been created successfully.",
      });

      navigate('/feed');
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm 
      type="register" 
      onSubmit={handleRegister} 
      loading={loading} 
      error={error} 
    />
  );
}