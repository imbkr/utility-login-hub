
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CustomerSidebar } from "@/components/CustomerSidebar";

const Profile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      // Set form values
      Object.entries(data).forEach(([key, value]) => {
        if (value) setValue(key, value);
      });
      
      return data;
    }
  });

  const onSubmit = async (data: any) => {
    try {
      // Only update allowed fields
      const { error } = await supabase
        .from('profiles')
        .update({
          phone: data.phone,
          email: data.email,
          service_address: data.service_address,
          billing_address: data.billing_address,
          postal_code: data.postal_code
        })
        .eq('id', profile?.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input 
                      id="first_name" 
                      {...register('first_name')} 
                      disabled 
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input 
                      id="last_name" 
                      {...register('last_name')} 
                      disabled 
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input 
                    id="account_number" 
                    {...register('account_number')} 
                    disabled 
                    className="bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register('phone')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_address">Service Address</Label>
                  <Input id="service_address" {...register('service_address')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_address">Billing Address</Label>
                  <Input id="billing_address" {...register('billing_address')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input id="postal_code" {...register('postal_code')} />
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Profile;
