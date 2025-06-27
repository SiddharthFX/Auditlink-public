import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles, Code, Play, Square } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { generateSmartContract } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/components/prism-solidity";
import { useActiveAccount } from 'thirdweb/react';

const AiIde = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [displayedCode, setDisplayedCode] = useState("");
  const [securityScore, setSecurityScore] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("solidity");
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const account = useActiveAccount();

  useEffect(() => {
    if (!generatedCode) {
      setDisplayedCode("");
      return;
    }

    let i = 0;
    setDisplayedCode("");
    const typingInterval = setInterval(() => {
      if (abortControllerRef.current?.signal.aborted) {
        clearInterval(typingInterval);
        return;
      }

      setDisplayedCode((prev) => {
        const newDisplayedCode = prev + generatedCode.charAt(i);
        i++;
        if (i === generatedCode.length) {
          clearInterval(typingInterval);
          setIsGenerating(false);
          // Apply syntax highlighting after typing is complete
          setTimeout(() => {
            const codeElement = document.querySelector(".language-solidity");
            if (codeElement) {
              Prism.highlightElement(codeElement);
            }
          }, 100);
        }
        return newDisplayedCode;
      });
    }, 10);

    return () => clearInterval(typingInterval);
  }, [generatedCode]);

  const handleGenerate = async () => {
    if (!account?.address) {
      toast({
        title: "Login Required",
        description: "Please connect your wallet to generate smart contracts",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your smart contract",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setGeneratedCode("");
    setDisplayedCode("");
    setSecurityScore(null);
    abortControllerRef.current = new AbortController();
    
    try {
      console.log("Generating smart contract with prompt:", prompt);
      const { code, score } = await generateSmartContract(prompt);
      console.log("Generated code:", code);
      console.log("Received security score from API:", score);
      setGeneratedCode(code);
      setSecurityScore(score);
      
      toast({
        title: "Success",
        description: "Smart contract generated successfully!",
      });
    } catch (error) {
      console.error("Error generating code:", error);
      setIsGenerating(false);
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Generation Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
      setGeneratedCode("");
      setDisplayedCode("");
      setSecurityScore(null);
      toast({
        title: "Generation Stopped",
        description: "Code generation has been stopped",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedCode || generatedCode);
    toast({
      title: "Copied",
      description: "Smart contract code copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Corner Orbs - More Subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        {/* Corner orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-l from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-l from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        {/* Middle small orbs */}
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-400/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-cyan-500/30 rounded-full blur-xl animate-float" style={{ animationDelay: '5s' }}></div>
      </div>

      <Navigation />
      
      {/* Main Content */}
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-[100rem]">
          {/* Page Title */}
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Powered by Google Gemini AI</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Smart Contract IDE
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto text-center">
              Describe your smart contract requirements and let our AI generate secure, optimized Solidity code instantly.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[700px]">
            {/* Left Panel - Chat Input */}
            <div className="relative group">
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h2 className="text-2xl font-heading font-bold">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      Describe your Smart Contract
                    </span>
                  </h2>
                </div>

                <div className="space-y-6 flex-1 flex flex-col">
                  <div className="relative flex-1">
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ask me to write a contract — e.g., 'Create an ERC20 token with 2% burn fee on transfers and mint function for owner only'"
                      className="min-h-[250px] bg-black/60 border-cyan-500/40 text-white placeholder:text-gray-400 focus:border-cyan-400/60 focus:ring-cyan-400/30 rounded-xl resize-none font-mono text-base shadow-lg h-full"
                      disabled={isGenerating}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-400/5 rounded-xl pointer-events-none"></div>
                  </div>

                  <div className="flex gap-4">
                    {!isGenerating ? (
                      <Button
                        onClick={handleGenerate}
                        disabled={!prompt.trim()}
                        className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 border-0"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Generate Code
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStopGeneration}
                        className="flex-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-red-500/30 transition-all duration-300 border-0"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop Generating
                      </Button>
                    )}
                  </div>
                </div>

                {/* Chat History Area */}
                <div className="mt-8 space-y-4">
                  {prompt && (
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-sm text-cyan-300 mb-2 font-medium">Your Request:</p>
                      <p className="text-white/90">{prompt}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Code Output */}
            <div className="relative group">
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold">
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        Generated Smart Contract
                      </span>
                    </h2>
                  </div>
                  
                  {(generatedCode || displayedCode) && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-500/40">
                        Solidity v0.8.x
                      </Badge>
                      <Button
                        onClick={handleCopy}
                        size="sm"
                        variant="outline"
                        className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  )}
                </div>

                {/* Code Editor */}
                <div className="flex-1 bg-black/80 border border-gray-700/50 rounded-xl p-6 overflow-y-auto max-h-[500px] shadow-inner">
                  {displayedCode || generatedCode ? (
                    <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                      <code className="language-solidity custom-solidity-highlight">{displayedCode}</code>
                    </pre>
                  ) : isGenerating ? (
                    <div className="flex items-center justify-center h-full text-cyan-400">
                      <div className="text-center">
                        <div className="text-5xl mb-4 animate-pulse">⚡</div>
                        <p className="text-lg font-medium">Generating your smart contract...</p>
                        <p className="text-sm text-gray-400 mt-2">AI is writing secure Solidity code</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <div className="text-5xl mb-4 opacity-50">⚡</div>
                        <p className="text-lg font-medium">Your generated smart contract will appear here</p>
                        <p className="text-sm text-gray-600 mt-2">Ready to compile and deploy</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <Tabs defaultValue="solidity" className="mt-6" onValueChange={setActiveTab}>
                  <TabsList className="bg-gray-800/50 border border-gray-700/50">
                    <TabsTrigger value="solidity" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                      Solidity
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                {securityScore !== null && (
                  <div className="mt-4 flex justify-end">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-500/40">
                      Security Score: {securityScore}/100
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-full backdrop-blur-sm">
              <p className="text-gray-400 text-sm">
                Powered by{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">Google Gemini AI</span>
              </p>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <p className="text-gray-400 text-sm">
                Secured by{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">AuditLink AI</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiIde;
