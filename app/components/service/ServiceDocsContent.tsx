import { ServiceData } from '@/app/data/services';
import {
    DocumentTextIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import BlockberryApiExplorer from './BlockberryApiExplorer';

interface ServiceDocsContentProps {
    service: ServiceData;
}

export default function ServiceDocsContent({ service }: ServiceDocsContentProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.docsUrl && (
                    <a
                        href={service.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <DocumentTextIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">{service.name} Docs</p>
                            <p className="text-sm text-slate-400">Full API reference</p>
                        </div>
                    </a>
                )}
                {service.supportUrl && (
                    <a
                        href={service.supportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <GlobeAltIcon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">Support</p>
                            <p className="text-sm text-slate-400">Get help & error reference</p>
                        </div>
                    </a>
                )}
            </div>

            {service.id === 'blockberry-api' && (
                <BlockberryApiExplorer />
            )}

            {service.id !== 'blockberry-api' && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Integration</h2>
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto mb-6">
                        <p className="text-slate-400 mb-2"># Install the SDK</p>
                        <p className="text-green-400 mb-4">npm install @sui-infra/client</p>
                        <p className="text-slate-400 mb-2"># Initialize</p>
                        <p className="text-cyan-400">const client = new InfraClient({"{"}</p>
                        <p className="text-cyan-400 pl-4">serviceId: &quot;{service.id.slice(0, 20)}...&quot;,</p>
                        <p className="text-cyan-400 pl-4">wallet: yourWallet</p>
                        <p className="text-cyan-400">{"}"});</p>
                    </div>
                    {service.supportUrl && (
                        <a
                            href={service.supportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors cursor-pointer w-fit"
                        >
                            <GlobeAltIcon className="w-5 h-5" />
                            <span>Support</span>
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
