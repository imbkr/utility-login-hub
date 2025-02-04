
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Logo from '@/components/Logo';
import { supabase } from "@/integrations/supabase/client";

const TestLogin = () => {
  const [session, setSession] = useState<any>(null);

  const handleTestLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'test123'
      });

      if (error) throw error;
      setSession(data.session);
      toast.success('Test login successful!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="w-full py-4 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Back to Main Login
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-8 shadow-xl border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Test Login Page</h1>
            <p className="text-gray-600 mt-2">Test authentication functionality</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Current Status:</h3>
              <pre className="text-sm bg-white p-2 rounded">
                {session ? 'Logged in' : 'Not logged in'}
              </pre>
            </div>

            {!session ? (
              <Button 
                onClick={handleTestLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Test Login
              </Button>
            ) : (
              <Button 
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            )}

            {session && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h3 className="font-medium mb-2">Session Info:</h3>
                <pre className="text-sm bg-white p-2 rounded overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default TestLogin;
