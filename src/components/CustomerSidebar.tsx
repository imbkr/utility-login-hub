
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  Receipt, 
  UserRound, 
  CreditCard,
  Power,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const sidebarItems = [
  { 
    icon: Home, 
    label: "Dashboard", 
    href: "/dashboard" 
  },
  { 
    icon: FileText, 
    label: "Bills", 
    href: "/bills" 
  },
  { 
    icon: Receipt, 
    label: "Transactions", 
    href: "/transactions" 
  },
  { 
    icon: CreditCard, 
    label: "Pre-Authorized Payment", 
    href: "/pre-authorized-payment" 
  },
  { 
    icon: Power, 
    label: "Disconnect Request", 
    href: "/disconnect-request" 
  },
  { 
    icon: UserRound, 
    label: "Profile", 
    href: "/profile" 
  },
];

const SidebarContent = () => (
  <div className="space-y-4 py-4">
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold text-gray-800">Menu</h2>
      <div className="space-y-1">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-lg px-3 py-2 text-sm transition-all text-gray-800 hover:bg-blue-100",
                isActive ? "bg-blue-100" : "transparent"
              )
            }
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  </div>
);

export const CustomerSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden text-gray-800">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-[#E0EDFD] border-r border-gray-200">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r border-gray-200 bg-[#E0EDFD] md:block md:w-64">
        <div className="h-full">
          <SidebarContent />
        </div>
      </div>
    </>
  );
};
