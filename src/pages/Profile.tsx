
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CustomerSidebar } from "@/components/CustomerSidebar";

const Profile = () => {
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
    <div className="flex min-h-screen bg-[#1A1F2C]">
      <CustomerSidebar />
      
      <div className="flex-1">
        <header className="bg-[#6E59A5]/10 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-[#1A1F2C] border border-[#9b87f5]/20">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-[#D6BCFA]">First Name</Label>
                    <Input 
                      id="first_name" 
                      {...register('first_name')} 
                      disabled 
                      className="bg-[#6E59A5]/10 border-[#9b87f5]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-[#D6BCFA]">Last Name</Label>
                    <Input 
                      id="last_name" 
                      {...register('last_name')} 
                      disabled 
                      className="bg-[#6E59A5]/10 border-[#9b87f5]/20 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account_number" className="text-[#D6BCFA]">Account Number</Label>
                  <Input 
                    id="account_number" 
                    {...register('account_number')} 
                    disabled 
                    className="bg-[#6E59A5]/10 border-[#9b87f5]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#D6BCFA]">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    {...register('email')} 
                    className="bg-[#1A1F2C] border-[#9b87f5]/20 text-white focus:border-[#9b87f5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#D6BCFA]">Phone Number</Label>
                  <Input 
                    id="phone" 
                    {...register('phone')} 
                    className="bg-[#1A1F2C] border-[#9b87f5]/20 text-white focus:border-[#9b87f5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_address" className="text-[#D6BCFA]">Service Address</Label>
                  <Input 
                    id="service_address" 
                    {...register('service_address')} 
                    className="bg-[#1A1F2C] border-[#9b87f5]/20 text-white focus:border-[#9b87f5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing_address" className="text-[#D6BCFA]">Billing Address</Label>
                  <Input 
                    id="billing_address" 
                    {...register('billing_address')} 
                    className="bg-[#1A1F2C] border-[#9b87f5]/20 text-white focus:border-[#9b87f5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code" className="text-[#D6BCFA]">Postal Code</Label>
                  <Input 
                    id="postal_code" 
                    {...register('postal_code')} 
                    className="bg-[#1A1F2C] border-[#9b87f5]/20 text-white focus:border-[#9b87f5]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                >
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Profile;
