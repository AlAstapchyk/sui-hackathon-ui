'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ServiceData } from '@/app/data/services';

export type Service = ServiceData;

interface ServiceCardProps {
    service: Service;
}

function formatPrice(priceMs: number, pricingTiers?: Service['pricingTiers']): string {
    if (pricingTiers && pricingTiers.length > 0) {
        const firstTier = pricingTiers[0];
        if (firstTier.price === 'Free') return 'Free';
        return firstTier.price;
    }

    const monthlyPrice = priceMs / 1_000_000;
    if (monthlyPrice >= 100) return `${monthlyPrice.toFixed(0)} SUI`;
    if (monthlyPrice >= 1) return `${monthlyPrice.toFixed(2)} SUI`;
    if (monthlyPrice >= 0.01) return `${monthlyPrice.toFixed(3)} SUI`;
    return `${monthlyPrice.toFixed(4)} SUI`;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const displayPrice = formatPrice(service.price_ms, service.pricingTiers);

    return (
        <Link href={`/service/${service.id}`} className="block group cursor-pointer">
            <div className="relative h-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                <span className="absolute top-0 left-0 z-10 text-sm font-medium text-slate-300 bg-slate-700/90 px-4 py-2 rounded-br-xl transition-colors group-hover:bg-cyan-500/75 group-hover:text-cyan-50">
                    {service.category}
                </span>

                {service.is_verified && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30">
                        <CheckBadgeIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-400">Sui Verified</span>
                    </div>
                )}

                {service.acceptingNewUsers === false && (
                    <div className={`absolute ${service.is_verified ? 'top-12' : 'top-4'} right-4 flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30`}>
                        <ClockIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-medium text-amber-400">Waitlist</span>
                    </div>
                )}

                <div className="p-6 pt-14">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {service.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                            {service.provider.charAt(0)}
                        </div>
                        <span className="text-sm text-slate-400">by {service.provider}</span>
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-4 min-h-[40px]">
                        {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {service.sla && (
                            <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded">
                                SLA: {service.sla}
                            </span>
                        )}
                        {service.rateLimit && (
                            <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded">
                                {service.rateLimit}
                            </span>
                        )}
                        {service.tokensAccepted && service.tokensAccepted.length > 0 && (
                            <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
                                {service.tokensAccepted.join(', ')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/30 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-500">Starting at</p>
                        <p className="text-lg font-bold text-white">
                            {displayPrice} <span className="text-sm font-normal text-slate-400">/month</span>
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                        <ArrowRightIcon className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
