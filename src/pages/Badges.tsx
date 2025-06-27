import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Calendar, Star, Shield, Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useActiveAccount } from "thirdweb/react";

interface BadgeData {
  id: number;
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  wallet_address: string;
  minted_at: string;
}

const Badges = () => {
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const navigate = useNavigate();
  const account = useActiveAccount();

  useEffect(() => {
    if (account?.address) {
      loadBadges(account.address);
    } else {
      setBadges([]);
    }
  }, [account?.address]);

  const loadBadges = async (walletAddress: string) => {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('minted_at', { ascending: false });

    if (error) {
      console.error("Error fetching badges:", error);
      toast.error("Could not load your badges.");
      setBadges([]);
    } else {
      setBadges(data || []);
    }
  };

  const deleteBadge = async (badgeId: number) => {
    const { error } = await supabase
      .from('badges')
      .delete()
      .match({ id: badgeId });

    if (error) {
      console.error("Error deleting badge:", error);
      toast.error("Failed to delete badge.");
    } else {
      toast.success("Badge deleted successfully");
      loadBadges(account?.address || "");
    }
  };

  const downloadBadgeMetadata = (badge: BadgeData) => {
    const dataStr = JSON.stringify(badge, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-badge-${badge.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400 border-green-500/40";
    if (score >= 70) return "text-yellow-400 border-yellow-500/40";
    return "text-red-400 border-red-500/40";
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-gradient-to-l from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-[30%] right-[30%] w-56 h-56 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '9s' }}></div>
      </div>

      <Navigation />

      <div className="pt-28 sm:pt-32 px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-0">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base order-1 sm:order-none"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="text-center order-2 sm:order-none">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Badge Collection
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-lg">
                Your earned audit verification badges
              </p>
            </div>
            
            <div className="w-32 order-3 sm:order-none hidden sm:block"></div> {/* Spacer for centering on desktop */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1 sm:mb-2">{badges.length}</h3>
                <p className="text-gray-400 text-sm sm:text-base">Total Badges</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-xl border border-green-500/30 rounded-2xl">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-1 sm:mb-2">
                  {badges.length > 0 ? Math.round(badges.reduce((acc, badge) => {
                    const scoreAttr = badge.attributes.find(attr => attr.trait_type === "Audit Score");
                    return acc + (scoreAttr ? parseInt(scoreAttr.value) : 0);
                  }, 0) / badges.length) : 0}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">Avg Score</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-1 sm:mb-2">
                  {badges.filter(badge => {
                    const scoreAttr = badge.attributes.find(attr => attr.trait_type === "Audit Score");
                    return scoreAttr && parseInt(scoreAttr.value) >= 90;
                  }).length}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">High Security</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges Grid */}
          {(!account?.address) ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-3 sm:mb-4">Connect your wallet to view badges</h3>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base px-4">Please connect your wallet to see your personalized badge collection.</p>
            </div>
          ) : badges.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-3 sm:mb-4">No Badges Yet</h3>
              <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base px-4">Complete smart contract audits to earn your first badge!</p>
              <Button
                onClick={() => navigate('/smart-audit')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
              >
                Start Your First Audit
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {badges.map((badge) => (
                <Card key={badge.id} className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 group">
                  <CardContent className="p-4 sm:p-6 relative">
                    {/* Delete Button - Positioned at top right corner */}
                    <button
                      onClick={() => deleteBadge(badge.id)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-colors rounded-full flex items-center justify-center z-20 border border-red-500/30"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    <div className="text-center mb-4 sm:mb-6">
                      <div className="relative mb-4 sm:mb-6">
                        <img 
                          src={badge.image}
                          alt="Badge" 
                          className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Security Score positioned at bottom right of image */}
                        <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 z-10">
                          {(() => {
                            const scoreAttr = badge.attributes.find(attr => attr.trait_type === "Audit Score");
                            const score = scoreAttr ? parseInt(scoreAttr.value) : 0;
                            return (
                              <Badge className={`${getScoreColor(score)} bg-gray-900/90 backdrop-blur-sm border-2 px-2 sm:px-3 py-1 text-sm sm:text-base font-bold rounded-lg`}>
                                {score}/100
                              </Badge>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                          {badge.name}
                        </span>
                      </h3>
                      
                      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {badge.description}
                      </p>
                    </div>

                    {/* Badge Attributes */}
                    <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                      {badge.attributes.slice(0, 3).map((attr, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-800/50 rounded-lg p-2">
                          <span className="text-gray-400 text-xs">{attr.trait_type}</span>
                          <span className="text-white font-semibold text-xs">
                            {attr.trait_type === "Contract Address" ? formatAddress(attr.value) : attr.value}
                          </span>
                        </div>
                      ))}
                      {/* Wallet Address */}
                      <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-2">
                        <span className="text-gray-400 text-xs">Wallet Address</span>
                        <span className="text-white font-semibold text-xs">
                          {formatAddress(badge.wallet_address)}
                        </span>
                      </div>
                    </div>

                    {/* Minted Date */}
                    <div className="flex items-center justify-center text-gray-500 text-xs mb-3 sm:mb-4">
                      <Calendar className="w-3 h-3 mr-1" />
                      Minted on {new Date(badge.minted_at).toLocaleDateString()}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => downloadBadgeMetadata(badge)}
                      variant="outline"
                      className="w-full border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 py-2 rounded-xl font-semibold text-xs sm:text-sm"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download Metadata
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Badges;
