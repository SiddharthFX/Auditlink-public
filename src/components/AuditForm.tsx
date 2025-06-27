import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Shield } from "lucide-react";

interface AuditFormProps {
  contractAddress: string;
  setContractAddress: (address: string) => void;
  selectedNetwork: string;
  setSelectedNetwork: (network: string) => void;
  isAuditing: boolean;
  onAudit: () => void;
}

const AuditForm = ({
  contractAddress,
  setContractAddress,
  selectedNetwork,
  setSelectedNetwork,
  isAuditing,
  onAudit
}: AuditFormProps) => {
  return (
    <div className="relative group mb-8 sm:mb-12 md:mb-16">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      <Card className="relative bg-gray-900/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-2xl">
        <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            <div>
              <Label htmlFor="contract-address" className="block font-medium mb-3 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                  Contract Address
                </span>
              </Label>
              <Input
                id="contract-address"
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x742d35Cc69C92cF4D3E72aA99Af1E4f7D4b8A6E9"
                className="w-full bg-black/60 border border-blue-500/40 text-white placeholder:text-gray-500 focus:border-blue-400/60 focus:ring-blue-400/30 rounded-2xl h-12 sm:h-14 md:h-16 px-4 sm:px-6 text-base sm:text-lg"
              />
            </div>

            <div>
              <Label className="block font-medium mb-3 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                  Select Network
                </span>
              </Label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger className="w-full bg-black/60 border border-blue-500/40 text-white rounded-2xl h-12 sm:h-14 md:h-16 px-4 sm:px-6 text-base sm:text-lg">
                  <SelectValue placeholder="Choose a network" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-xl">
                  <SelectItem value="mainnet" disabled className="text-gray-400 hover:bg-gray-500/20 cursor-not-allowed">
                    Ethereum Mainnet <span className="text-yellow-400">( supports soon )</span>
                  </SelectItem>
                  <SelectItem value="sepolia" className="text-white hover:bg-blue-500/20">
                    Sepolia Testnet
                  </SelectItem>
                  <SelectItem value="polygon" disabled className="text-gray-400 hover:bg-gray-500/20 cursor-not-allowed">
                    Polygon <span className="text-yellow-400">( supports soon )</span>
                  </SelectItem>
                  <SelectItem value="bsc" disabled className="text-gray-400 hover:bg-gray-500/20 cursor-not-allowed">
                    BSC <span className="text-yellow-400">( supports soon )</span>
                  </SelectItem>
                  <SelectItem value="arbitrum" disabled className="text-gray-400 hover:bg-gray-500/20 cursor-not-allowed">
                    Arbitrum <span className="text-yellow-400">( supports soon )</span>
                  </SelectItem>
                  <SelectItem value="optimism" disabled className="text-gray-400 hover:bg-gray-500/20 cursor-not-allowed">
                    Optimism <span className="text-yellow-400">( supports soon )</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={onAudit}
              disabled={!contractAddress.trim() || isAuditing}
              className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-600 text-white py-4 sm:py-6 md:py-8 h-14 sm:h-16 md:h-20 rounded-2xl font-semibold text-lg sm:text-xl md:text-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 border-0 disabled:opacity-50"
            >
              {isAuditing ? (
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin" />
                  <span className="text-sm sm:text-base md:text-lg">Auditing Contract...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  <span className="text-sm sm:text-base md:text-lg">Start Audit</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditForm;
