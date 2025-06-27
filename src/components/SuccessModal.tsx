
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
}

const SuccessModal = ({ isOpen }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-green-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-green-400">Success!</h3>
        <p className="text-gray-300 text-lg">You successfully passed an AI audit! Your NFT Badge has been minted.</p>
      </div>
    </div>
  );
};

export default SuccessModal;
