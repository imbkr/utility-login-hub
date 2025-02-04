
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Lock, Mail } from 'lucide-react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Login functionality will be implemented in the next phase");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <header className="w-full py-6 px-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Link 
            to="/enroll"
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            New User? Enroll Now
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
              alt="Utility Management"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Smart Utility Management
              </h2>
              <p className="text-gray-600">
                Access your utility data, manage your account, and track your usage all in one place.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <Card className="p-8 shadow-lg border-0">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
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
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Sign In
                </Button>

                <div className="text-center mt-6">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/enroll" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
