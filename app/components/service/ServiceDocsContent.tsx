import { ServiceData } from '@/app/data/services';
import {
    DocumentTextIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import ServiceApiExplorer from './ServiceApiExplorer';

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

            {service.apiExplorer && (
                <ServiceApiExplorer service={service} />
            )}

            {!service.apiExplorer && !service.docsUrl && !service.supportUrl && (
                <div className="bg-slate-800/50 border border-dashed border-slate-600 rounded-2xl p-8 text-center">
                    <DocumentTextIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No Documentation Available</h3>
                    <p className="text-slate-500">This service hasn&apos;t added documentation yet.</p>
                </div>
            )}
        </div>
    );
}

