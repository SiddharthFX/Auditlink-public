import { useNavigate } from "react-router-dom";

const CopyrightSection = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 py-6 border-t border-gray-800/50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2025{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
              AuditLinkAI
            </span>
            . All Rights Reserved.
            <br />
            <span className="text-gray-500 text-xs">Created By <a href="https://x.com/Siddh_eth" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline ml-1">Siddh_eth</a></span>
          </p>
          
          <div className="flex items-center gap-6 text-gray-400">
            <button 
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-cyan-400 transition-colors duration-200 text-sm"
            >
              Privacy
            </button>
            <button 
              onClick={() => navigate("/terms-of-service")}
              className="hover:text-cyan-400 transition-colors duration-200 text-sm"
            >
              Terms
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="hover:text-cyan-400 transition-colors duration-200 text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CopyrightSection;
