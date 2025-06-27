import { Button } from "@/components/ui/button";
import { useActiveAccount, useDisconnect, useActiveWallet } from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

const Dashboard = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();

  const handleSignOut = async () => {
    if (wallet) {
      await disconnect(wallet);
    }
    localStorage.removeItem("thirdweb_last-connected-wallet");
    
    toast.info("You have been signed out.", {
      description: "For complete security, you may also want to disconnect from within your MetaMask wallet's 'Connected Sites' settings.",
      duration: 8000,
    });

    navigate('/');
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        <div className="absolute top-[15%] left-[30%] w-2 h-2 bg-cyan-400 rounded-full animate-float blur-none shadow-[0_0_6px_#22d3ee]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[5%] right-[20%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-float blur-none shadow-[0_0_4px_#93c5fd]" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-[10%] left-[40%] w-2 h-2 bg-cyan-500 rounded-full animate-float blur-none shadow-[0_0_6px_#06b6d4]" style={{ animationDelay: '3s' }}></div>
      </div>
      <Navigation />
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                {/* Wallet Icon */}
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                  <img src="/auditlink.png" alt="Wallet" className="w-8 h-8" />
          </div>

                {/* Title and Description */}
                <h1 className="text-2xl sm:text-4xl font-bold mb-2">Account Dashboard</h1>
                <p className="text-gray-400 mb-8">Manage your account and view your badges.</p>

                {/* Connected Address */}
                <div className="w-full bg-gray-900/70 border border-cyan-500/20 rounded-xl p-4 mb-8">
                  <p className="text-cyan-400 mb-1">Connected Address:</p>
                  <p className="font-mono text-xl text-white">{formatAddress(account?.address || '')}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                  <Button
                    onClick={() => navigate('/')} 
                    variant="outline"
                    className="bg-white text-black hover:bg-gray-100 py-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Back to Home
                  </Button>
                  <Button
                    onClick={() => navigate('/badges')} 
                    variant="outline"
                    className="bg-white text-black hover:bg-gray-100 py-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <Award className="w-5 h-5" />
                    My Badges
                  </Button>
                </div>

                {/* Sign Out Button */}
                  <Button
                    onClick={handleSignOut}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                  >
                  <LogOut className="w-5 h-5" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
