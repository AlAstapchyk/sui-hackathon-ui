import { ServiceData } from '@/app/data/services';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ServicePricingDisplayProps {
    service: ServiceData;
}

function formatPrice(priceMist: number): string {
    const priceInSui = priceMist / 1_000_000_000;
    if (priceInSui >= 1) return priceInSui.toFixed(4);
    if (priceInSui >= 0.001) return (priceInSui * 1000).toFixed(4) + 'm';
    return (priceMist / 1_000_000).toFixed(4) + 'μ';
}

export default function ServicePricingDisplay({ service }: ServicePricingDisplayProps) {
    const hasPricingTiers = service.pricingTiers && service.pricingTiers.length > 0;
    const hasRequestPackages = service.requestPackages && service.requestPackages.length > 0;

    return (
        <div className="space-y-6">
            {service.pricingTiers?.find(t => t.price === 'Free') && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <h2 className="text-lg font-bold text-white">Free</h2>
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-emerald-400">Free Tier</span>
                            <span className="font-bold text-emerald-400">$0</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{service.pricingTiers?.find(t => t.price === 'Free')?.requests}</p>
                        <ul className="space-y-1">
                            {service.pricingTiers?.find(t => t.price === 'Free')?.features.map((f, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-emerald-400" />{f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Free forever • Limited requests</p>
                </div>
            )}

            {hasRequestPackages && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        <h2 className="text-lg font-bold text-white">Per Request</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {service.requestPackages!.map((pkg, i) => (
                            <div key={i} className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                                <p className="text-2xl font-bold text-purple-400 mb-1 flex items-baseline gap-1">
                                    {pkg.requests.toLocaleString()}
                                    <span className="text-white/75 text-sm">requests</span>
                                </p>
                                <p className="text-lg font-bold text-white">{pkg.price}</p>
                                {pkg.pricePerRequest && (
                                    <p className="text-xs text-slate-500">{pkg.pricePerRequest}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">One-time purchase • No expiration</p>
                </div>
            )}

            {service.pricingTiers && service.pricingTiers.filter(t => t.price !== 'Free' && t.price !== 'Custom').length > 0 && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                        <h2 className="text-lg font-bold text-white">Bundle</h2>
                    </div>
                    <div className="flex flex-row gap-4">
                        {service.pricingTiers?.filter(t => t.price !== 'Free' && t.price !== 'Custom').map((tier, i) => (
                            <div key={i} className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-cyan-400">{tier.name}</span>
                                    <span className="font-bold text-cyan-400">{tier.price}</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-3">{tier.requests}</p>
                                <ul className="space-y-1">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="text-sm text-slate-300 flex items-center gap-2">
                                            <CheckCircleIcon className="w-4 h-4 text-cyan-400" />{f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Monthly subscription • Auto-renews</p>
                </div>
            )}

            {service.pricingTiers?.find(t => t.price === 'Custom') && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <h2 className="text-lg font-bold text-white">Enterprise</h2>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-amber-400">Enterprise</span>
                            <span className="font-bold text-amber-400">Custom</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{service.pricingTiers?.find(t => t.price === 'Custom')?.requests}</p>
                        <ul className="space-y-1">
                            {service.pricingTiers?.find(t => t.price === 'Custom')?.features.map((f, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                    <CheckCircleIcon className="w-4 h-4 text-amber-400" />{f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Custom terms • Dedicated support</p>
                </div>
            )}

            {!hasPricingTiers && !hasRequestPackages && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                    <p className="text-slate-400">Usage-based pricing: {formatPrice(service.price_ms)} SUI per second</p>
                </div>
            )}
        </div>
    );
}
