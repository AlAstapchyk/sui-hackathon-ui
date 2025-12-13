'use client';

import { useState } from 'react';
import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSignPersonalMessage,
} from "@mysten/dapp-kit";
import { Transaction } from '@mysten/sui/transactions';
import { ServiceData } from '@/app/data/services';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { PACKAGE_ID } from '@/app/constants';

interface ServiceAccessPanelProps {
    service: ServiceData;
}

export default function ServiceAccessPanel({ service }: ServiceAccessPanelProps) {
    const [selectedTier, setSelectedTier] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState(0);
    const [pricingType, setPricingType] = useState<'free' | 'perRequest' | 'bundle' | 'enterprise'>('free');

    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();
    const account = useCurrentAccount();

    const handlePurchase = () => {
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }

        let priceInMist: number;
        if (service.pricingTiers && service.pricingTiers[selectedTier]) {
            const tierPrice = service.pricingTiers[selectedTier].price;
            if (tierPrice === 'Free') {
                priceInMist = 0;
            } else if (tierPrice === 'Custom') {
                alert("Please contact the provider for Enterprise pricing");
                return;
            } else {
                const match = tierPrice.match(/[\d.]+/);
                const numericValue = match ? parseFloat(match[0]) : 0;
                priceInMist = numericValue * 1_000_000_000;
            }
        } else {
            priceInMist = service.price_ms;
        }

        if (priceInMist === 0) {
            alert("✅ Free tier activated! No payment required.");
            return;
        }

        const tx = new Transaction();
        const [coin] = tx.splitCoins(tx.gas, [priceInMist]);

        tx.moveCall({
            target: `${PACKAGE_ID}::service_platform::purchase_subscription`,
            arguments: [
                tx.object(service.id),
                coin,
                tx.object('0x6'),
            ],
        });

        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    alert(`✅ Subscription activated! Digest: ${result.digest}`);
                },
                onError: (error) => {
                    console.error(error);
                    alert(`❌ Error: ${error.message}`);
                }
            }
        );
    };

    const handleTestAccess = async () => {
        if (!account) {
            alert("Please connect your wallet first");
            return;
        }

        try {
            const timestamp = Date.now().toString();
            const msg = `Login to InfraProxy at ${timestamp}`;
            const msgBytes = new TextEncoder().encode(msg);

            const { signature } = await signPersonalMessage({
                message: msgBytes,
            });

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            const res = await fetch(`${apiUrl}/api/data?user=${account.address}&service_id=${service.id}`, {
                headers: {
                    "x-sui-signature": signature,
                    "x-sui-timestamp": timestamp,
                },
            });

            const data = await res.json();

            if (res.ok) {
                alert(`✅ Access Granted!\nMsg: ${data.message}\nSub ID: ${data.subscription}`);
            } else {
                alert(`❌ Access Denied: ${data.error}`);
            }
        } catch (error: any) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    };

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
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
                        >
                            Start Free Tier
                        </button>
                    ) : pricingType === 'perRequest' ? (
                        <button
                            onClick={handlePurchase}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
                        >
                            Buy Requests
                        </button>
                    ) : pricingType === 'enterprise' ? (
                        <button
                            onClick={handlePurchase}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
                        >
                            Contact Sales
                        </button>
                    ) : (
                        <button
                            onClick={handlePurchase}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                        >
                            Subscribe Now
                        </button>
                    )}
                    <button
                        onClick={handleTestAccess}
                        className="w-full py-3 rounded-xl bg-slate-700 text-white font-medium border border-slate-600 hover:bg-slate-600 transition-all cursor-pointer"
                    >
                        Test Access (Proxy)
                    </button>
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
