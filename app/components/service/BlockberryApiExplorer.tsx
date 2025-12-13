'use client';

import { useState, useMemo } from 'react';
import AnimatedDropdown from '@/app/components/explore/AnimatedDropdown';
import {
    CheckIcon,
    ClipboardDocumentIcon,
    PlayIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';

const CATEGORY_OPTIONS = [
    { id: 'DEX', label: 'DEX' },
    { id: 'Lending', label: 'Lending' },
    { id: 'Bridge', label: 'Bridge' },
    { id: 'Yield', label: 'Yield' },
    { id: 'CDP', label: 'CDP' },
    { id: 'Derivatives', label: 'Derivatives' },
    { id: 'Liquid Staking', label: 'Liquid Staking' },
    { id: 'Yield Aggregator', label: 'Yield Aggregator' },
    { id: 'RWA', label: 'RWA' },
    { id: 'Synthetics', label: 'Synthetics' },
    { id: 'Insurance', label: 'Insurance' },
    { id: 'Options', label: 'Options' },
    { id: 'Indexes', label: 'Indexes' },
    { id: 'NFT Lending', label: 'NFT Lending' },
    { id: 'Launchpad', label: 'Launchpad' },
];

const ORDER_BY_OPTIONS = [
    { id: 'DESC', label: 'Descending' },
    { id: 'ASC', label: 'Ascending' },
];

const SORT_BY_OPTIONS = [
    { id: 'CURRENT_TVL', label: 'Current TVL' },
    { id: 'VOLUME_24H', label: 'Volume 24H' },
    { id: 'CHANGE_24H', label: 'Change 24H' },
];

const ENDPOINT_OPTIONS = [
    { id: 'getDefis', name: 'getDefis', method: 'POST', path: '/defi', description: 'Get a list of all DeFis provided by DefiLlama' },
    { id: 'getDex', name: 'getDex', method: 'POST', path: '/defi/dex', description: 'Get detailed DEX information' },
    { id: 'getDexTransactions', name: 'getDexTransactions', method: 'POST', path: '/defi/dex/transactions', description: 'Get DEX transaction history' },
    { id: 'getDexPools', name: 'getDexPools', method: 'POST', path: '/defi/dex/pools', description: 'Get DEX liquidity pools' },
    { id: 'getPackages', name: 'getPackages', method: 'GET', path: '/packages', description: 'Get all packages' },
];

type CodeLanguage = 'shell' | 'nodejs' | 'python';

export default function BlockberryApiExplorer() {
    const [copied, setCopied] = useState<string | null>(null);
    const [apiKey] = useState('G2csRFbbmwSKHir3JH5wQRNFHWM0Ti');
    const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINT_OPTIONS[0]);
    const [category, setCategory] = useState('DEX');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [orderBy, setOrderBy] = useState('DESC');
    const [sortBy, setSortBy] = useState('CURRENT_TVL');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [responseStatus, setResponseStatus] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('shell');
    const [isExpanded, setIsExpanded] = useState(false);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const codeExamples = useMemo(() => {
        const baseUrl = `https://api.blockberry.one/sui/v1${selectedEndpoint.path}?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`;
        const bodyData = `{"categories":["${category}"]}`;

        return {
            shell: `curl --request POST \\
            --url '${baseUrl}' \\
            --header 'accept: */*' \\
            --header 'content-type: application/json' \\
            --header 'x-api-key: YOUR_API_KEY' \\
            --data '${bodyData}'`,
            nodejs: `const axios = require('axios');

            const response = await axios.post(
            '${baseUrl}',
            { categories: ['${category}'] },
            {
                headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'x-api-key': 'YOUR_API_KEY'
                }
            }
            );

            console.log(response.data);`,
            python: `import requests

            response = requests.post(
                '${baseUrl}',
                json={'categories': ['${category}']},
                headers={
                    'accept': '*/*',
                    'content-type': 'application/json',
                    'x-api-key': 'YOUR_API_KEY'
                }
            )

            print(response.json())`
        };
    }, [category, page, size, orderBy, sortBy, selectedEndpoint]);

    const handleTryIt = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);
        setResponseStatus(null);
        try {
            const res = await fetch(
                `https://api.blockberry.one/sui/v1${selectedEndpoint.path}?page=${page}&size=${size}&orderBy=${orderBy}&sortBy=${sortBy}`,
                {
                    method: 'POST',
                    headers: { 'accept': '*/*', 'content-type': 'application/json', 'x-api-key': apiKey },
                    body: JSON.stringify({ categories: [category] }),
                }
            );
            setResponseStatus(res.status);
            const data = await res.json();
            if (!res.ok) { setError(data.message || data.error || `Error ${res.status}`); }
            setResponse(data);
        } catch (err: any) {
            setError(err.message || 'Network error');
            setResponseStatus(500);
        } finally {
            setLoading(false);
        }
    };

    const languageLabels: Record<CodeLanguage, string> = {
        shell: 'Shell',
        nodejs: 'Node.js',
        python: 'Python'
    };

    return (
        <div className="space-y-3">
            {ENDPOINT_OPTIONS.map((endpoint) => (
                <div key={endpoint.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <button
                        onClick={() => {
                            setSelectedEndpoint(endpoint);
                            setIsExpanded(selectedEndpoint.id === endpoint.id ? !isExpanded : true);
                        }}
                        className="w-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-700/20 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1.5 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-lg ${endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : ''}`}>
                                {endpoint.method}
                            </span>
                            <span className="text-white font-medium">{endpoint.name}</span>
                        </div>
                        <svg
                            className={`w-4 h-4 text-slate-400 transition-transform ${selectedEndpoint.id === endpoint.id && isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {selectedEndpoint.id === endpoint.id && isExpanded && (
                        <>
                            <div className="px-6 py-4 border-b border-slate-700/50">
                                <span className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-3 block">Body Parameters</span>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">categories</label>
                                    <AnimatedDropdown
                                        options={CATEGORY_OPTIONS}
                                        value={category}
                                        onChange={(val) => setCategory(val || 'DEX')}
                                        placeholder="Select Category"
                                        activeColor="neutral"
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-4 border-b border-slate-700/50">
                                <span className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-3 block">Query Parameters</span>
                                <div className="flex flex-wrap items-end gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">page</label>
                                        <input type="number" value={page} onChange={(e) => setPage(Number(e.target.value))} min={0}
                                            className="w-24 px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:border-slate-600 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">size</label>
                                        <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} min={1} max={100}
                                            className="w-24 px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:border-slate-600 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">orderBy</label>
                                        <AnimatedDropdown
                                            options={ORDER_BY_OPTIONS}
                                            value={orderBy}
                                            onChange={(val) => setOrderBy(val || 'DESC')}
                                            placeholder="Order"
                                            activeColor="neutral"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2">sortBy</label>
                                        <AnimatedDropdown
                                            options={SORT_BY_OPTIONS}
                                            value={sortBy}
                                            onChange={(val) => setSortBy(val || 'CURRENT_TVL')}
                                            placeholder="Sort By"
                                            activeColor="neutral"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-b border-slate-700/50">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1 bg-slate-900/50 rounded-lg p-1">
                                            {(['shell', 'nodejs', 'python'] as CodeLanguage[]).map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => setCodeLanguage(lang)}
                                                    className={`px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer ${codeLanguage === lang
                                                        ? 'bg-slate-700 text-white'
                                                        : 'text-slate-400 hover:text-white'
                                                        }`}
                                                >
                                                    {languageLabels[lang]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => copyToClipboard(codeExamples[codeLanguage], 'code')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
                                        {copied === 'code' ? <CheckIcon className="w-5 h-5 text-emerald-400" /> : <ClipboardDocumentIcon className="w-5 h-5 text-slate-400" />}
                                    </button>
                                </div>
                                <pre className="p-4 bg-slate-900 rounded-xl text-sm text-slate-300 overflow-x-auto"><code>{codeExamples[codeLanguage]}</code></pre>
                                <div className="flex justify-end mt-4">
                                    <button onClick={handleTryIt} disabled={loading}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer">
                                        {loading ? (<><ArrowPathIcon className="w-4 h-4 animate-spin" /><span className="text-sm">Sending...</span></>)
                                            : (<><PlayIcon className="w-4 h-4" /><span className="text-sm">Try It!</span></>)}
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 py-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white font-medium">Response</span>
                                    {responseStatus && (
                                        <span className={`flex items-center gap-2 text-sm ${responseStatus >= 200 && responseStatus < 300 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            <span className={`w-2 h-2 rounded-full ${responseStatus >= 200 && responseStatus < 300 ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                                            {responseStatus}
                                        </span>
                                    )}
                                </div>
                                {loading ? (
                                    <div className="p-8 bg-slate-900 rounded-xl flex items-center justify-center"><ArrowPathIcon className="w-8 h-8 text-cyan-400 animate-spin" /></div>
                                ) : error && !response ? (
                                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">{error}</div>
                                ) : response ? (
                                    <pre className="p-4 bg-slate-900 rounded-xl text-sm overflow-x-auto max-h-96 overflow-y-auto">
                                        <code className={error ? 'text-red-400' : 'text-emerald-400'}>{JSON.stringify(response, null, 2)}</code>
                                    </pre>
                                ) : (
                                    <div className="p-6 bg-slate-900 rounded-xl text-center text-slate-500">
                                        Click <span className="px-2 py-1 bg-slate-700 rounded text-cyan-400 text-sm">Try It!</span> to start a request and see the response here!
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
