
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ContractExplanationProps {
  explanation: string;
}

const ContractExplanation = ({ explanation }: ContractExplanationProps) => {
  if (!explanation) return null;

  return (
    <div className="mb-16 animate-fade-in">
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl">
        <CardContent className="p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-heading font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AI Contract Analysis
              </span>
            </h3>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-gray-300 leading-relaxed text-lg">
              {explanation}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractExplanation;
