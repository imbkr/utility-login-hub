
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const DisconnectRequest = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('disconnect_requests')
        .insert({
          user_id: user.id,
          ...data,
          disconnect_date: new Date(data.disconnect_date).toISOString()
        });

      if (error) throw error;
      
      toast.success("Disconnect request submitted successfully");
      reset();
    } catch (error: any) {
      toast.error(error.message || "Error submitting disconnect request");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Request Service Disconnection
            </h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Disconnection Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="disconnect_date">Requested Disconnect Date</Label>
                  <Input 
                    type="date" 
                    id="disconnect_date" 
                    {...register('disconnect_date', { required: true })} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Disconnection</Label>
                  <Textarea 
                    id="reason" 
                    {...register('reason', { required: true })} 
                    placeholder="Please provide the reason for disconnection"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street_name">Street Address</Label>
                  <Input 
                    id="street_name" 
                    {...register('street_name', { required: true })} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      {...register('city', { required: true })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input 
                      id="postal_code" 
                      {...register('postal_code', { required: true })} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input 
                      id="state" 
                      {...register('state', { required: true })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      {...register('country', { required: true })} 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Submit Disconnect Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DisconnectRequest;
