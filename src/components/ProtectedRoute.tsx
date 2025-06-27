import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const account = useActiveAccount();

  if (!account) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-90">
          <div className="absolute top-[15%] left-[30%] w-2 h-2 bg-blue-400 rounded-full animate-float blur-none" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-[5%] right-[20%] w-2 h-2 bg-blue-300 rounded-full animate-float blur-none" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-[10%] left-[40%] w-2 h-2 bg-blue-500 rounded-full animate-float blur-none" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Access Denied Content */}
        <div className="relative z-10 max-w-md w-full mx-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 text-center">
              
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-heading font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  Wallet Required
                </span>
              </h2>
              
              <p className="text-gray-400 mb-6">
                Please connect your wallet to access this feature
              </p>
              
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 border-0"
              >
                Connect Wallet
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full mt-4 border-blue-500/40 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/60 backdrop-blur-sm py-3 rounded-xl font-semibold"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
