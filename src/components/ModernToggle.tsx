
import { Shield, Code, Zap } from "lucide-react";

interface ModernToggleProps {
  toggleState: boolean;
  onToggleChange: (checked: boolean) => void;
}

const ModernToggle = ({ toggleState, onToggleChange }: ModernToggleProps) => {
  return (
    <div className="absolute top-20 right-4 z-50">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-sm opacity-50 group-hover:opacity-70 transition duration-300"></div>
        <div className="relative bg-gray-900/95 backdrop-blur-xl border border-blue-500/40 rounded-full p-2 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs">
              <Shield className="w-3 h-3 text-blue-400" />
              <span className="text-gray-300 font-medium">Address</span>
            </div>
            
            {/* Modern 3D Toggle with static design */}
            <div className="relative">
              <div className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${
                toggleState 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(59,130,246,0.4)]' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.2)]'
              }`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 shadow-lg ${
                  toggleState 
                    ? 'left-5 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.8)]' 
                    : 'left-0.5 bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.9)]'
                }`}>
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    {toggleState ? (
                      <Code className="w-2.5 h-2.5 text-blue-600" />
                    ) : (
                      <Zap className="w-2.5 h-2.5 text-gray-600" />
                    )}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={toggleState}
                  onChange={(e) => onToggleChange(e.target.checked)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs">
              <Code className="w-3 h-3 text-cyan-400" />
              <span className="text-gray-300 font-medium">Code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernToggle;
