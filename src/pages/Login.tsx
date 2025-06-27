import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useConnectModal, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { trackUser } from "@/services/auditService";

const client = createThirdwebClient({
  clientId: "6396357e96849f2f6eb5cdc8abe597f1",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.binance.wallet"),
  createWallet("com.safepal"),
  createWallet("com.kraken"),
];

const Login = () => {
  const navigate = useNavigate();
  const { connect } = useConnectModal();
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      trackUser(account.address);
      navigate('/dashboard');
    }
  }, [account, navigate]);

  const handleConnect = () => {
    connect({ client, wallets });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-3/4 right-20 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
          <span className="text-white font-bold text-4xl">★</span>
              </div>
        
        <h1 className="text-4xl font-bold mb-2">
                Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AuditLink AI
                </span>
              </h1>
        
        <p className="text-gray-400 mb-8">
          Connect your wallet to access our AI-powered smart contract tools
              </p>

            <Button
              onClick={handleConnect}
          className="w-full bg-white text-black py-3 text-lg rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-white/10"
        >
          Connect
            </Button>

        <ul className="mt-8 space-y-3 text-left">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-gray-300">AI-powered smart contract generation</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-gray-300">Comprehensive security auditing</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-gray-300">Secure wallet-based authentication</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
