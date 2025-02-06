
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { CustomerSidebar } from "@/components/CustomerSidebar";

const Transactions = () => {
  const { data: transactions } = useQuery({
    queryKey: ['all-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="flex min-h-screen bg-[#1A1F2C]">
      <CustomerSidebar />
      <div className="flex-1">
        <header className="bg-[#6E59A5]/10 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-[#1A1F2C] shadow rounded-lg border border-[#9b87f5]/20">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#9b87f5]/20">
                  <TableHead className="text-[#D6BCFA]">Date</TableHead>
                  <TableHead className="text-[#D6BCFA]">Amount</TableHead>
                  <TableHead className="text-[#D6BCFA]">Payment Method</TableHead>
                  <TableHead className="text-[#D6BCFA]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((transaction) => (
                  <TableRow key={transaction.id} className="border-b border-[#9b87f5]/20">
                    <TableCell className="text-white">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-white">${transaction.amount}</TableCell>
                    <TableCell className="text-white">{transaction.payment_method}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
