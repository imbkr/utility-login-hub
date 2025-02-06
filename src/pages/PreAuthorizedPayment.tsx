
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PreAuthorizedPayment = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    // TODO: Implement pre-authorized payment setup
    console.log(data);
    toast.success("Pre-authorized payment setup submitted successfully");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Pre-Authorized Payment Setup
            </h1>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Banking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input 
                    id="bank_name" 
                    {...register('bank_name', { required: true })} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account_type">Account Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transit_number">Transit Number</Label>
                  <Input 
                    id="transit_number" 
                    {...register('transit_number', { required: true })} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution_number">Institution Number</Label>
                  <Input 
                    id="institution_number" 
                    {...register('institution_number', { required: true })} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input 
                    id="account_number" 
                    {...register('account_number', { required: true })} 
                  />
                </div>

                <Button type="submit" className="w-full">
                  Set Up Pre-Authorized Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PreAuthorizedPayment;
