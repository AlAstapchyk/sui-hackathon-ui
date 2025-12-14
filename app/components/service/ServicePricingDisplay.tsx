import { ServiceData } from '@/app/data/services';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ServicePricingDisplayProps {
    service: ServiceData;
}

export default function ServicePricingDisplay({ service }: ServicePricingDisplayProps) {
    const hasPricingTiers = service.pricingTiers && service.pricingTiers.length > 0;
    const hasRequestPackages = service.requestPackages && service.requestPackages.length > 0;
    const hasFreeTier = !!service.freeTier;
    const hasEnterpriseTier = !!service.enterpriseTier;

    return (
        <div className="space-y-6">
            {/* Free Tier - from dedicated freeTier field */}
            {hasFreeTier && service.freeTier && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <h2 className="text-lg font-bold text-white">Free Tier</h2>
                        {service.freeTier.isForever && (
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Forever Free</span>
                        )}
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-emerald-400">{service.freeTier.name}</span>
                            <span className="font-bold text-emerald-400">$0</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                            {service.freeTier.requests.toLocaleString()} requests included
                        </p>
                        {service.freeTier.features && service.freeTier.features.length > 0 && (
                            <ul className="space-y-1">
                                {service.freeTier.features.map((f, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-emerald-400" />{f}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                        {service.freeTier.isForever ? 'Free forever' : 'Free trial'} • Limited requests
                    </p>
                </div>
            )}

            {/* Request Packages (one-time purchases) */}
            {hasRequestPackages && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        <h2 className="text-lg font-bold text-white">Request Packages</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        {service.requestPackages!.map((pkg, i) => (
                            <div key={i} className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl flex-1 flex flex-col">
                                <p className="font-medium text-white mb-2">{pkg.name}</p>
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

            {/* Pricing Tiers (subscriptions) */}
            {hasPricingTiers && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                        <h2 className="text-lg font-bold text-white">Subscription Plans</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        {service.pricingTiers!.map((tier, i) => (
                            <div key={i} className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-cyan-400">{tier.name}</span>
                                    <span className="font-bold text-cyan-400">{tier.price}</span>
                                </div>
                                {tier.requests && (
                                    <p className="text-sm text-slate-400 mb-3">{tier.requests}</p>
                                )}
                                {tier.features && tier.features.length > 0 && (
                                    <ul className="space-y-1">
                                        {tier.features.map((f, j) => (
                                            <li key={j} className="text-sm text-slate-300 flex items-center gap-2">
                                                <CheckCircleIcon className="w-4 h-4 text-cyan-400" />{f}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {tier.period && (
                                    <p className="text-xs text-slate-500 mt-2">{tier.period}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Monthly subscription • Auto-renews</p>
                </div>
            )}

            {/* Enterprise Tier - from dedicated enterpriseTier field */}
            {hasEnterpriseTier && service.enterpriseTier && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <h2 className="text-lg font-bold text-white">Enterprise</h2>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-amber-400">{service.enterpriseTier.name}</span>
                            <span className="font-bold text-amber-400">Custom Pricing</span>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">Unlimited requests with dedicated support</p>
                        {service.enterpriseTier.features && service.enterpriseTier.features.length > 0 && (
                            <ul className="space-y-1">
                                {service.enterpriseTier.features.map((f, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4 text-amber-400" />{f}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {service.enterpriseTier.contactLabel && (
                            <button className="mt-4 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors cursor-pointer text-sm font-medium">
                                {service.enterpriseTier.contactLabel}
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Custom terms • Dedicated support • SLA guarantee</p>
                </div>
            )}

            {/* Fallback for services with only base pricing */}
            {!hasFreeTier && !hasPricingTiers && !hasRequestPackages && !hasEnterpriseTier && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                    <p className="text-slate-400">
                        Usage-based pricing: {(service.price_ms / 1_000_000_000).toFixed(6)} SUI per millisecond
                    </p>
                </div>
            )}
        </div>
    );
}
