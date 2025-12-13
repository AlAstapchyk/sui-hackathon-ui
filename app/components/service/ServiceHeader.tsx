import { ServiceData } from '@/app/data/services';
import {
    CheckBadgeIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ServiceHeaderProps {
    service: ServiceData;
}

export default function ServiceHeader({ service }: ServiceHeaderProps) {
    return (
        <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 pt-8 overflow-hidden">
            <span className="absolute top-0 left-0 z-10 text-sm font-medium text-slate-300 bg-slate-700/90 px-4 py-2 rounded-br-xl">
                {service.category}
            </span>

            <div className="flex items-start justify-between">
                <div className="flex items-end gap-4">
                    {service.logo && (
                        <Image
                            src={service.logo}
                            alt={`${service.name} logo`}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover"
                            unoptimized
                        />
                    )}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {service.acceptingNewUsers !== false ? (
                                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/20 rounded-full">
                                    <CheckCircleIcon className="w-3 h-3" />
                                    Accepting users
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-400 bg-red-500/20 rounded-full">
                                    <XCircleIcon className="w-3 h-3" />
                                    Waitlist only
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-white">{service.name}</h1>
                        <p className="text-slate-400">by {service.provider}</p>
                    </div>
                </div>

                {service.is_verified && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                        <CheckBadgeIcon className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-400">Sui Verified</span>
                    </div>
                )}
            </div>

            {/* <div className="flex flex-wrap gap-3 mb-6">
                {service.sla && (
                    <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm">
                        SLA: {service.sla}
                    </span>
                )}
                {service.rateLimit && (
                    <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm">
                        {service.rateLimit}
                    </span>
                )}
                {service.latency && (
                    <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm">
                        Latency: {service.latency}
                    </span>
                )}
                {service.tokensAccepted && (
                    <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
                        Accepts: {service.tokensAccepted.join(', ')}
                    </span>
                )}
            </div>

            {service.regions && service.regions.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPinIcon className="w-4 h-4" />
                    <span>Regions: {service.regions.join(', ')}</span>
                </div>
            )} */}
        </div>
    );
}
