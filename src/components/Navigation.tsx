import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { useState, useEffect, memo, useRef } from "react";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

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

const Navigation = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const account = useActiveAccount();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Debounced scroll-hide logic for smoothness
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
    } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }, 30); // debounce for smoothness
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const CustomConnectButton = () => {
    if (account) {
      return (
        <Button 
          variant="outline-themed"
          className="bg-gray-900/50 border-blue-500/40 text-blue-400 rounded-xl transition-all duration-300 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/80"
          onClick={() => navigate('/dashboard')}
        >
          {formatAddress(account.address)}
        </Button>
      );
    }

    return (
      <ConnectButton
        client={client}
        connectModal={{ size: "compact", title: "Auditlink Sign-in" }}
        theme={darkTheme({ colors: { accentText: "hsl(187, 93%, 49%)" } })}
        wallets={wallets}
      />
    );
  };

  return (
    <nav className={`fixed top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 px-2 md:px-6 py-2 md:py-4 z-50 transition-all duration-300 ease-out will-change-transform ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="relative bg-gray-900/30 backdrop-blur-3xl rounded-2xl px-6 py-2 shadow-2xl shadow-black/20 border-none">
            <div className="flex items-center justify-between gap-2 md:gap-8">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">★</span>
                </div>
                <span className="text-white font-heading font-semibold text-xl">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    AuditLink
                  </span>
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link 
                  to="/smart-audit" 
                  className={`transition-colors duration-200 ${
                    location.pathname === '/smart-audit' 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Smart Audit
                </Link>
                <Link 
                  to="/ai-ide" 
                  className={`transition-colors duration-200 ${
                    location.pathname === '/ai-ide' 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  AI IDE
                </Link>
                <Link 
                  to="/auditlab" 
                  className={`transition-colors duration-200 ${
                    location.pathname === '/auditlab' 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  AuditLab
                </Link>
                <Link 
                  to="/about" 
                  className={`transition-colors duration-200 ${
                    location.pathname === '/about' 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  About
                </Link>
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <div className="transform scale-90">
                  <CustomConnectButton />
                </div>
            </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl w-full">
                <div className="px-4 py-6 space-y-4">
                  {/* Mobile Navigation Links */}
                  <div className="space-y-3">
                    <Link 
                      to="/" 
                      className="block text-base md:text-lg text-gray-300 hover:text-white transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px]"
                    >
                      Home
                    </Link>
                    <Link 
                      to="/smart-audit" 
                      className={`block text-base md:text-lg transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px] ${
                        location.pathname === '/smart-audit' 
                          ? 'text-cyan-400 font-semibold bg-cyan-400/10' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Smart Audit
                    </Link>
                    <Link 
                      to="/ai-ide" 
                      className={`block text-base md:text-lg transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px] ${
                        location.pathname === '/ai-ide' 
                          ? 'text-cyan-400 font-semibold bg-cyan-400/10' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      AI IDE
                    </Link>
                    <Link 
                      to="/auditlab" 
                      className={`block text-base md:text-lg transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px] ${
                        location.pathname === '/auditlab' 
                          ? 'text-cyan-400 font-semibold bg-cyan-400/10' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      AuditLab
                    </Link>
                    <Link 
                      to="/about" 
                      className={`block text-base md:text-lg transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px] ${
                        location.pathname === '/about' 
                          ? 'text-cyan-400 font-semibold bg-cyan-400/10' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      About
                    </Link>
                  </div>

                  {/* Mobile CTA Button */}
                  <div className="pt-4 border-t border-white/10 flex justify-center w-full">
                    <div className="w-full flex justify-center">
                      <CustomConnectButton />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navigation;
