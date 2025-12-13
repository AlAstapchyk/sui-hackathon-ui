'use client';

import { useState } from 'react';
import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction } from '@mysten/sui/transactions';
import { ServiceData } from '@/app/data/services';
import { CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { PACKAGE_ID, REGISTRY_ID } from '@/app/constants';
import { useUserSubscription, formatSubscriptionAmount } from '@/app/hooks/useSubscription';

interface ServiceAccessPanelProps {
    service: ServiceData;
}

export default function ServiceAccessPanel({ service }: ServiceAccessPanelProps) {
    const [selectedTier, setSelectedTier] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [pricingType, setPricingType] = useState<'free' | 'perRequest' | 'bundle' | 'enterprise'>('free');
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const account = useCurrentAccount();

    const { data: subscription, isLoading: subLoading, refetch: refetchSubscription } = useUserSubscription(1);

    const calculatePriceInMist = (): number | null => {
        if (pricingType === 'free') {
            return 0;
        }

        if (pricingType === 'enterprise') {
            return null;
        }

        if (pricingType === 'perRequest' && service.requestPackages?.[selectedPackage]) {
            const pkg = service.requestPackages[selectedPackage];
            const priceMatch = pkg.price.match(/[\d.]+/);
            if (priceMatch) {
                return parseFloat(priceMatch[0]) * 1_000_000_000;
            }
        }

        if (pricingType === 'bundle' && service.pricingTiers) {
            const bundleTiers = service.pricingTiers.filter(t => t.price !== 'Free' && t.price !== 'Custom');
            const tier = bundleTiers[selectedTier];
            if (tier) {
                const priceMatch = tier.price.match(/[\d.]+/);
                if (priceMatch) {
                    return parseFloat(priceMatch[0]) * 1_000_000_000;
                }
            }
        }

        return service.price_ms;
    };

    const handlePurchase = async () => {
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }

        if (pricingType === 'enterprise') {
            alert("Please contact the provider for Enterprise pricing");
            return;
        }

        const priceInMist = calculatePriceInMist();
        if (priceInMist === null) {
            alert("Unable to calculate price");
            return;
        }

        if (priceInMist === 0) {
            alert("✅ Free tier activated! No payment required.");
            return;
        }

        setIsLoading(true);

        try {
            const tx = new Transaction();
            const [paymentCoin] = tx.splitCoins(tx.gas, [priceInMist]);

            tx.moveCall({
                target: `${PACKAGE_ID}::challenge::subscribe`,
                arguments: [
                    tx.object(REGISTRY_ID),
                    tx.pure.u64(1),
                    paymentCoin,
                ],
            });

            await signAndExecuteTransaction(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        alert(`✅ Subscription activated! Digest: ${result.digest}`);
                        setIsLoading(false);
                        refetchSubscription();
                    },
                    onError: (error) => {
                        console.error(error);
                        alert(`❌ Error: ${error.message}`);
                        setIsLoading(false);
                    }
                }
            );
        } catch (error: any) {
            console.error(error);
            alert(`❌ Error: ${error.message}`);
            setIsLoading(false);
        }
    };

    const hasActiveSubscription = subscription && subscription.amount > 0;

    return (
        <div className="sticky top-24 space-y-4">
            {subLoading ? (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 animate-pulse">
                    <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                </div>
            ) : hasActiveSubscription ? (
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-emerald-400">Active Subscription</h3>
                            <p className="text-sm text-slate-400">Service ID: {subscription.serviceId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <CurrencyDollarIcon className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 font-medium">
                            Balance: {formatSubscriptionAmount(subscription.amount)}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Credits available for API requests
                    </p>
                </div>
            ) : null}

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                    {hasActiveSubscription ? 'Top Up Balance' : 'Get Access'}
                </h3>

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
                    {service.pricingTiers?.some(t => t.price === 'Custom') && (
                        <button
                            onClick={() => setPricingType('enterprise')}
                            className={`flex-1 px-2 py-2 text-xs rounded-md transition-colors cursor-pointer ${pricingType === 'enterprise' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'}`}
                        >
                            Enterprise
                        </button>
                    )}
                </div>

                {pricingType === 'free' && (
                    <div className="space-y-4 mb-4">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-emerald-400">Free Tier</span>
                                <span className="font-bold text-emerald-400">$0</span>
                            </div>
                            <p className="text-sm text-slate-400">{service.pricingTiers?.find(t => t.price === 'Free')?.requests || '1K/day'}</p>
                            <ul className="mt-3 space-y-1">
                                {service.pricingTiers?.find(t => t.price === 'Free')?.features.map((f, i) => (
                                    <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                                        <CheckCircleIcon className="w-3 h-3 text-emerald-400" />{f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {pricingType === 'perRequest' && service.requestPackages && service.requestPackages.length > 0 && (
                    <div className="space-y-3 mb-4">
                        {service.requestPackages.map((pkg, i) => (
                            <button
                                key={pkg.name}
                                onClick={() => setSelectedPackage(i)}
                                className={`w-full px-4 py-3 rounded-xl text-left transition-all cursor-pointer border ${selectedPackage === i
                                    ? 'bg-purple-500/20 border-purple-500/50'
                                    : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-semibold ${selectedPackage === i ? 'text-purple-400' : 'text-white'}`}>
                                        {pkg.requests.toLocaleString()} requests
                                    </span>
                                    <span className={`font-bold ${selectedPackage === i ? 'text-purple-400' : 'text-white'}`}>
                                        {pkg.price}
                                    </span>
                                </div>
                                {pkg.pricePerRequest && (
                                    <p className="text-xs text-slate-500">{pkg.pricePerRequest}</p>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {pricingType === 'bundle' && service.pricingTiers && (
                    <div className="space-y-3 mb-4">
                        {service.pricingTiers.filter(t => t.price !== 'Free' && t.price !== 'Custom').map((tier, i) => (
                            <button
                                key={tier.name}
                                onClick={() => setSelectedTier(i + 1)}
                                className={`w-full px-4 py-3 rounded-xl text-left transition-all cursor-pointer border ${selectedTier === i + 1
                                    ? 'bg-cyan-500/20 border-cyan-500/50'
                                    : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-semibold ${selectedTier === i + 1 ? 'text-cyan-400' : 'text-white'}`}>
                                        {tier.name}
                                    </span>
                                    <span className={`font-bold ${selectedTier === i + 1 ? 'text-cyan-400' : 'text-white'}`}>
                                        {tier.price}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400">{tier.requests}</p>
                            </button>
                        ))}
                    </div>
                )}

                {pricingType === 'enterprise' && (
                    <div className="space-y-4 mb-4">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-amber-400">Enterprise</span>
                                <span className="font-bold text-amber-400">Custom</span>
                            </div>
                            <p className="text-sm text-slate-400">Unlimited requests</p>
                            <ul className="mt-3 space-y-1">
                                {service.pricingTiers?.find(t => t.price === 'Custom')?.features.map((f, i) => (
                                    <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                                        <CheckCircleIcon className="w-3 h-3 text-amber-400" />{f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    {pricingType === 'free' ? (
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Start Free Tier'}
                        </button>
                    ) : pricingType === 'perRequest' ? (
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Buy Requests'}
                        </button>
                    ) : pricingType === 'enterprise' ? (
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Contact Sales'}
                        </button>
                    ) : (
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Subscribe Now'}
                        </button>
                    )}
                </div>

                <p className="text-xs text-slate-500 text-center mt-4">
                    {pricingType === 'free' && 'Free forever • Limited requests'}
                    {pricingType === 'perRequest' && 'One-time purchase • No expiration'}
                    {pricingType === 'bundle' && 'Monthly subscription • Auto-renews'}
                    {pricingType === 'enterprise' && 'Custom terms • Dedicated support'}
                </p>
            </div>
        </div>
    );
}
