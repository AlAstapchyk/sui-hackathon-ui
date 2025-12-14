'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ServiceData } from '@/app/data/services';

interface ServicePricingPanelProps {
    service: ServiceData;
    pricingType: 'free' | 'perRequest' | 'bundle' | 'enterprise';
    setPricingType: (type: 'free' | 'perRequest' | 'bundle' | 'enterprise') => void;
    selectedTier: number;
    setSelectedTier: (tier: number) => void;
    selectedPackage: number;
    setSelectedPackage: (pkg: number) => void;
    onPurchase: () => void;
    onTestAccess: () => void;
    isConnected: boolean;
}

export default function ServicePricingPanel({
    service,
    pricingType,
    setPricingType,
    selectedTier,
    setSelectedTier,
    selectedPackage,
    setSelectedPackage,
    onPurchase,
    onTestAccess,
    isConnected,
}: ServicePricingPanelProps) {
    const freeTier = service.pricingTiers?.find(t => t.price === 'Free');
    const bundleTiers = service.pricingTiers?.filter(t => t.price !== 'Free' && t.price !== 'Custom') || [];
    const hasEnterprise = service.pricingTiers?.some(t => t.price === 'Custom');

    return (
        <div className="sticky top-24 space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Get Access</h3>

                <div className="flex gap-1 bg-slate-900/50 rounded-lg p-1 mb-4">
                    <button
                        onClick={() => setPricingType('free')}
                        className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors cursor-pointer ${pricingType === 'free' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        Free
                    </button>
                    <button
                        onClick={() => setPricingType('perRequest')}
                        className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors cursor-pointer ${pricingType === 'perRequest' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        Per Request
                    </button>
                    <button
                        onClick={() => setPricingType('bundle')}
                        className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors cursor-pointer ${pricingType === 'bundle' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                    >
                        Bundle
                    </button>
                    {hasEnterprise && (
                        <button
                            onClick={() => setPricingType('enterprise')}
                            className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors cursor-pointer ${pricingType === 'enterprise' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'}`}
                        >
                            Enterprise
                        </button>
                    )}
                </div>

                {pricingType === 'free' && freeTier && (
                    <div className="space-y-4 mb-4">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-emerald-400">Free Tier</span>
                                <span className="font-bold text-emerald-400">$0</span>
                            </div>
                            <p className="text-sm text-slate-400 mb-3">{freeTier.requests}</p>
                            <ul className="space-y-1">
                                {(freeTier.features || []).map((f, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-emerald-400" />{f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={onTestAccess}
                            disabled={!isConnected}
                            className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isConnected ? 'Start Free Tier' : 'Connect Wallet'}
                        </button>
                    </div>
                )}

                {pricingType === 'perRequest' && service.requestPackages && (
                    <div className="space-y-4 mb-4">
                        <div className="space-y-2">
                            {service.requestPackages.map((pkg, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedPackage(i)}
                                    className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer ${selectedPackage === i
                                        ? 'bg-purple-500/20 border border-purple-500/30'
                                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{pkg.requests.toLocaleString()} requests</span>
                                        <span className="font-bold text-purple-400">{pkg.price}</span>
                                    </div>
                                    {pkg.pricePerRequest && (
                                        <p className="text-xs text-slate-500 mt-1">{pkg.pricePerRequest}</p>
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={onPurchase}
                            disabled={!isConnected}
                            className="w-full py-3 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isConnected ? 'Buy Requests' : 'Connect Wallet'}
                        </button>
                    </div>
                )}

                {pricingType === 'bundle' && bundleTiers.length > 0 && (
                    <div className="space-y-4 mb-4">
                        <div className="space-y-2">
                            {bundleTiers.map((tier, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedTier(i)}
                                    className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer ${selectedTier === i
                                        ? 'bg-cyan-500/20 border border-cyan-500/30'
                                        : 'bg-slate-900/50 border border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{tier.name}</span>
                                        <span className="font-bold text-cyan-400">{tier.price}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{tier.requests}</p>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={onPurchase}
                            disabled={!isConnected}
                            className="w-full py-3 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isConnected ? 'Subscribe Now' : 'Connect Wallet'}
                        </button>
                    </div>
                )}

                {pricingType === 'enterprise' && (
                    <div className="space-y-4 mb-4">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-amber-400">Enterprise</span>
                                <span className="font-bold text-amber-400">Custom</span>
                            </div>
                            <p className="text-sm text-slate-400">Unlimited requests with dedicated support</p>
                        </div>
                        <button
                            className="w-full py-3 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 font-medium transition-colors cursor-pointer"
                        >
                            Contact Sales
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
