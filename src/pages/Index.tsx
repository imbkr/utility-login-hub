
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import { Lock, Mail, Building2, Phone, HelpCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="w-full py-4 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <Link to="/test-login" className="text-sm text-blue-600 hover:text-blue-800">
              Test Login
            </Link>
            <Link to="tel:1-800-555-0123" className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <Phone size={16} />
              1-800-555-0123
            </Link>
            <Link to="/help" className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <HelpCircle size={16} />
              Support
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Value Proposition */}
          <div className="hidden lg:flex flex-col space-y-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Smart Utility Management"
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-3">Smart Utility Management</h2>
                  <p className="text-lg text-gray-200">
                    Monitor and manage your utilities efficiently with our smart metering solutions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <Building2 className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-semibold mb-1">Smart Metering</h3>
                <p className="text-sm text-gray-600">Real-time monitoring of your utility usage</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <HelpCircle className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-semibold mb-1">24/7 Support</h3>
                <p className="text-sm text-gray-600">Expert assistance whenever you need it</p>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="w-full max-w-md mx-auto space-y-6">
            <Card className="p-8 shadow-xl border-0">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                <p className="text-gray-600 mt-2">Sign in to manage your utilities</p>
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

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Card>

            {/* Enrollment CTA Card */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900">
              <h3 className="text-lg font-semibold mb-2">New to our services?</h3>
              <p className="text-blue-800 mb-4">Get started with our simple enrollment process for utility services.</p>
              <Link to="/enroll">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Fill Out Enrollment Form
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
