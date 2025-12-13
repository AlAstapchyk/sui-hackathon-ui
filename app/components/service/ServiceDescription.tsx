import ReactMarkdown from 'react-markdown';
import { ServiceData } from '@/app/data/services';

interface ServiceDescriptionProps {
    service: ServiceData;
}

export default function ServiceDescription({ service }: ServiceDescriptionProps) {
    if (service.fullDescription) {
        return (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 px-8 prose prose-invert prose-cyan max-w-none">
                <h2 className="text-xl font-bold text-white my-4">Description</h2>
                <ReactMarkdown
                    components={{
                        h2: ({ children }: any) => <h2 className="text-xl font-bold text-white mt-6 mb-4">{children}</h2>,
                        h3: ({ children }: any) => <h3 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h3>,
                        p: ({ children }: any) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                        ul: ({ children }: any) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1">{children}</ul>,
                        li: ({ children }: any) => <li className="text-slate-300">{children}</li>,
                        code: ({ children, className }: any) => {
                            const isInline = !className;
                            return isInline
                                ? <code className="bg-slate-700 px-1.5 py-0.5 rounded text-cyan-400 text-sm">{children}</code>
                                : <code className="block bg-slate-900 p-4 rounded-xl text-sm overflow-x-auto text-cyan-400">{children}</code>;
                        },
                        pre: ({ children }: any) => <pre className="bg-slate-900 rounded-xl overflow-x-auto mb-4">{children}</pre>,
                        strong: ({ children }: any) => <strong className="text-white font-semibold">{children}</strong>,
                    }}
                >
                    {service.fullDescription}
                </ReactMarkdown>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <p className="text-lg text-slate-300 leading-relaxed">
                {service.description}
            </p>
        </div>
    );
}
