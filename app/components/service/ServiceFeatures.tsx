import { ServiceData } from '@/app/data/services';
import {
    BoltIcon,
    ClockIcon,
    ShieldCheckIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface ServiceFeaturesProps {
    service: ServiceData;
}

export default function ServiceFeatures({ service }: ServiceFeaturesProps) {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Service Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <BoltIcon className="w-6 h-6 text-cyan-400" />
                    <div>
                        <p className="font-medium text-white">Low Latency</p>
                        <p className="text-sm text-slate-400">{service.latency || '<50ms'} response</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <ClockIcon className="w-6 h-6 text-cyan-400" />
                    <div>
                        <p className="font-medium text-white">High Availability</p>
                        <p className="text-sm text-slate-400">{service.sla || '99.9%'} uptime</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
                    <div>
                        <p className="font-medium text-white">On-Chain Entitlements</p>
                        <p className="text-sm text-slate-400">Verified access via Sui</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <CurrencyDollarIcon className="w-6 h-6 text-cyan-400" />
                    <div>
                        <p className="font-medium text-white">Multi-Token Payments</p>
                        <p className="text-sm text-slate-400">{service.tokensAccepted?.join(', ') || 'SUI'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
