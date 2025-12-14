'use client';

import { useState, useMemo } from 'react';
import { useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import AnimatedDropdown from '@/app/components/explore/AnimatedDropdown';
import {
    CheckIcon,
    ClipboardDocumentIcon,
    PlayIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { API_KEY, PROXY_URL } from '@/app/constants';
import { ServiceData, ApiEndpoint, ApiParam } from '@/app/data/services';
import { mockResponse } from './mocks';

type CodeLanguage = 'shell' | 'nodejs' | 'python';

interface ServiceApiExplorerProps {
    service: ServiceData;
}

export default function ServiceApiExplorer({ service }: ServiceApiExplorerProps) {
    const apiExplorer = service.apiExplorer;

    const [copied, setCopied] = useState<string | null>(null);
    const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(
        apiExplorer?.endpoints[0] ?? null
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [responseStatus, setResponseStatus] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('shell');
    const [paramValues, setParamValues] = useState<Record<string, any>>({});

    const account = useCurrentAccount();
    const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();

    const getParamValue = (param: ApiParam) => {
        return paramValues[param.name] ?? param.default ?? (param.type === 'number' ? 0 : '');
    };

    const buildQueryString = () => {
        if (!selectedEndpoint?.queryParams) return '';
        const params = selectedEndpoint.queryParams
            .map(p => `${p.name}=${encodeURIComponent(getParamValue(p))}`)
            .join('&');
        return params ? `?${params}` : '';
    };

    const buildBodyObject = () => {
        if (!selectedEndpoint?.bodyParams) return null;
        const body: Record<string, any> = {};
        selectedEndpoint.bodyParams.forEach(p => {
            body[p.name] = getParamValue(p);
        });
        return body;
    };

    const codeExamples = useMemo(() => {
        if (!apiExplorer || !selectedEndpoint) {
            return { shell: '', nodejs: '', python: '' };
        }

        const queryString = buildQueryString();
        const fullUrl = `${apiExplorer.baseUrl}${selectedEndpoint.path}${queryString}`;
        const bodyObj = buildBodyObject();
        const bodyStr = bodyObj ? JSON.stringify(bodyObj) : '';
        const method = selectedEndpoint.method;

        const curlBody = bodyStr ? `\\\n    --data '${bodyStr}'` : '';
        const authHeader = apiExplorer.authHeader || 'x-api-key';

        return {
            shell: `curl --request ${method} \\
    --url '${fullUrl}' \\
    --header 'accept: */*' \\
    --header 'content-type: application/json' \\
    --header '${authHeader}: YOUR_API_KEY'${curlBody}`,
            nodejs: `const axios = require('axios');

const response = await axios.${method.toLowerCase()}(
    '${fullUrl}'${bodyObj ? `,
    ${bodyStr}` : ''},
    {
        headers: {
            'accept': '*/*',
            'content-type': 'application/json',
            '${authHeader}': 'YOUR_API_KEY'
        }
    }
);

console.log(response.data);`,
            python: `import requests

response = requests.${method.toLowerCase()}(
    '${fullUrl}',${bodyObj ? `
    json=${bodyStr},` : ''}
    headers={
        'accept': '*/*',
        'content-type': 'application/json',
        '${authHeader}': 'YOUR_API_KEY'
    }
)

print(response.json())`
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEndpoint, paramValues, apiExplorer]);

    if (!apiExplorer || !selectedEndpoint) {
        return null;
    }

    const setParamValue = (name: string, value: any) => {
        setParamValues(prev => ({ ...prev, [name]: value }));
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleTryIt = async () => {
        if (!account) {
            setError('Please connect your wallet first');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);
        setResponseStatus(null);

        try {
            const queryString = buildQueryString();
            const bodyObj = buildBodyObject();

            const message = JSON.stringify({
                method: selectedEndpoint.method,
                url: `${selectedEndpoint.path}${queryString}`,
                data: bodyObj,
            });

            const result = await signPersonalMessage({
                message: new TextEncoder().encode(message),
            });

            const backendUrl = `${PROXY_URL}${selectedEndpoint.path}${queryString}`;

            const body = JSON.stringify({
                owner: account.address,
                signature: result.signature,
                data: bodyObj,
            });

            console.log(body)

            // ** We commited it because the Blockberry API is under maintenance today.

            // const res = await fetch(backendUrl, {
            //     method: selectedEndpoint.method,
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-API-KEY': API_KEY,
            //     },
            //     body,
            // });

            // setResponseStatus(res.status);
            // const data = await res.json();
            // if (!res.ok) {
            //     setError(data.message || data.error || `Error ${res.status}`);
            // }
            setResponse(mockResponse);

            // Direct Blockberry API test (bypassing proxy)

            // const queryString = buildQueryString();
            // const bodyObj = buildBodyObject();
            // const directUrl = `${apiExplorer.baseUrl}${selectedEndpoint.path}${queryString}`;

            // const res = await fetch(directUrl, {
            //     method: selectedEndpoint.method,
            //     headers: {
            //         'accept': '*/*',
            //         'content-type': 'application/json',
            //         'x-api-key': API_KEY,
            //     },
            //     body: bodyObj ? JSON.stringify(bodyObj) : undefined,
            // });

            // setResponseStatus(res.status);
            // const data = await res.json();
            // if (!res.ok) {
            //     setError(data.message || data.error || `Error ${res.status}`);
            // }
            // setResponse(data);
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

    const renderParamInput = (param: ApiParam, isBody: boolean = false) => {
        const value = getParamValue(param);

        if (param.type === 'select' && param.options) {
            return (
                <div key={param.name}>
                    <label className="block text-sm text-slate-400 mb-2">{param.name}</label>
                    <AnimatedDropdown
                        options={param.options}
                        value={String(value)}
                        onChange={(val) => setParamValue(param.name, val)}
                        placeholder={`Select ${param.name}`}
                        activeColor="neutral"
                    />
                </div>
            );
        }

        return (
            <div key={param.name}>
                <label className="block text-sm text-slate-400 mb-2">{param.name}</label>
                <input
                    type={param.type === 'number' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) => setParamValue(param.name, param.type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="w-24 px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:border-slate-600 focus:outline-none"
                />
            </div>
        );
    };

    return (
        <div className="space-y-3">
            {apiExplorer.endpoints.map((endpoint) => (
                <div key={endpoint.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <button
                        onClick={() => {
                            setSelectedEndpoint(endpoint);
                            setIsExpanded(selectedEndpoint.id === endpoint.id ? !isExpanded : true);
                        }}
                        className="w-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-700/20 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1.5 text-sm font-medium rounded-lg ${endpoint.method === 'GET'
                                ? 'bg-green-500/20 text-green-400'
                                : endpoint.method === 'POST'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : endpoint.method === 'PUT'
                                        ? 'bg-amber-500/20 text-amber-400'
                                        : 'bg-red-500/20 text-red-400'
                                }`}>
                                {endpoint.method}
                            </span>
                            <span className="text-white font-medium">{endpoint.name}</span>
                            <span className="text-slate-500 text-sm hidden sm:inline">{endpoint.description}</span>
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
                            {endpoint.bodyParams && endpoint.bodyParams.length > 0 && (
                                <div className="px-6 py-4 border-b border-slate-700/50">
                                    <span className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-3 block">Body Parameters</span>
                                    <div className="flex flex-wrap gap-4">
                                        {endpoint.bodyParams.map(p => renderParamInput(p, true))}
                                    </div>
                                </div>
                            )}

                            {endpoint.queryParams && endpoint.queryParams.length > 0 && (
                                <div className="px-6 py-4 border-b border-slate-700/50">
                                    <span className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-3 block">Query Parameters</span>
                                    <div className="flex flex-wrap items-end gap-4">
                                        {endpoint.queryParams.map(p => renderParamInput(p))}
                                    </div>
                                </div>
                            )}

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
