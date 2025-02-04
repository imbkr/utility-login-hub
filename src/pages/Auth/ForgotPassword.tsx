
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import Logo from '@/components/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Password reset instructions have been sent to your email');
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="w-full py-4 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Back to Login
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-8 shadow-xl border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600 mt-2">Enter your email to receive reset instructions</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>

            <div className="text-center">
              <Link 
                to="/" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default ForgotPassword;
