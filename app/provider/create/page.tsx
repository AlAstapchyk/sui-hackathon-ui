'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import {
    ArrowLeftIcon,
    InformationCircleIcon,
    CheckBadgeIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { PACKAGE_ID } from '@/app/constants';
import AnimatedDropdown from '@/app/components/explore/AnimatedDropdown';

const categories = [
    { id: 'RPC', label: 'RPC' },
    { id: 'Indexer', label: 'Indexer' },
    { id: 'Storage', label: 'Storage' },
    { id: 'Analytics', label: 'Analytics' },
    { id: 'Compute', label: 'Compute' },
    { id: 'Security', label: 'Security' },
    { id: 'Data', label: 'Data' },
    { id: 'Other', label: 'Other' },
];

export default function CreateServicePage() {
    const router = useRouter();
    const account = useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fullDescription: '',
        category: 'RPC',
        price: '',
        rateLimit: '',
        tokensAccepted: ['SUI'],
        endpoint: '',
        docsUrl: '',
        supportUrl: '',
        // Verification
        requestVerification: false,
        // Pricing
        pricingTiers: [
            { name: 'Free', price: '0', requests: '100', features: ['Basic support'] }
        ],
        requestPackages: [
            { requests: '1000', price: '1' }
        ],
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }

        setLoading(true);

        const tx = new Transaction();
        const rate = Number(formData.price) * 1_000_000;

        tx.moveCall({
            target: `${PACKAGE_ID}::service_platform::create_service`,
            arguments: [
                tx.pure.string(formData.name),
                tx.pure.u64(rate),
                tx.pure.string(formData.description),
            ],
        });

        signAndExecuteTransaction(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    setLoading(false);
                    alert(`✅ Service Created! Digest: ${result.digest}`);
                    router.push('/provider');
                },
                onError: (error) => {
                    setLoading(false);
                    console.error(error);
                    alert(`❌ Error: ${error.message}`);
                },
            }
        );
    };

    const handleTokenToggle = (token: string) => {
        setFormData(prev => {
            const tokens = prev.tokensAccepted.includes(token)
                ? prev.tokensAccepted.filter(t => t !== token)
                : [...prev.tokensAccepted, token];
            return { ...prev, tokensAccepted: tokens.length > 0 ? tokens : ['SUI'] };
        });
    };

    const addPricingTier = () => {
        setFormData(prev => ({
            ...prev,
            pricingTiers: [...prev.pricingTiers, { name: '', price: '', requests: '', features: [] }]
        }));
    };

    const removePricingTier = (index: number) => {
        setFormData(prev => ({
            ...prev,
            pricingTiers: prev.pricingTiers.filter((_, i) => i !== index)
        }));
    };

    const updatePricingTier = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            pricingTiers: prev.pricingTiers.map((tier, i) =>
                i === index ? { ...tier, [field]: value } : tier
            )
        }));
    };

    const addRequestPackage = () => {
        setFormData(prev => ({
            ...prev,
            requestPackages: [...prev.requestPackages, { requests: '', price: '' }]
        }));
    };

    const removeRequestPackage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            requestPackages: prev.requestPackages.filter((_, i) => i !== index)
        }));
    };

    const updateRequestPackage = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            requestPackages: prev.requestPackages.map((pkg, i) =>
                i === index ? { ...pkg, [field]: value } : pkg
            )
        }));
    };

    if (!account) {
        return (
            <div className="min-h-screen bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
                        <p className="text-slate-400 mb-8">
                            Connect your wallet to create a service listing
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
                <button
                    onClick={() => router.push('/provider')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors cursor-pointer"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>Back to Provider Dashboard</span>
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Service</h1>
                    <p className="text-slate-400">List your infrastructure service on the Sui Infra Hub marketplace</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Service Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Enterprise RPC Node"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <AnimatedDropdown
                                    options={categories}
                                    value={formData.category}
                                    onChange={(val) => setFormData({ ...formData, category: val || 'RPC' })}
                                    placeholder="Select Category"
                                    activeColor="neutral"
                                    fullWidth
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Price per Second (SUI) <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.000001"
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.001"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Short Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of your service (shown in cards)"
                                rows={2}
                                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 resize-none focus:outline-none focus:border-slate-600 transition-all"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Full Description (Markdown)
                            </label>
                            <textarea
                                value={formData.fullDescription}
                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                                placeholder="## Overview&#10;&#10;Detailed description with markdown formatting..."
                                rows={8}
                                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 resize-none font-mono focus:outline-none focus:border-slate-600 transition-all"
                            />
                            <p className="text-xs text-slate-500 mt-2">Supports markdown: headers, lists, code blocks, etc.</p>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Technical Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Rate Limit</label>
                                <input
                                    type="text"
                                    value={formData.rateLimit}
                                    onChange={e => setFormData({ ...formData, rateLimit: e.target.value })}
                                    placeholder="e.g. 10K req/s"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Endpoint URL</label>
                                <input
                                    type="url"
                                    value={formData.endpoint}
                                    onChange={e => setFormData({ ...formData, endpoint: e.target.value })}
                                    placeholder="https://api.yourservice.com"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Documentation URL</label>
                                <input
                                    type="url"
                                    value={formData.docsUrl}
                                    onChange={e => setFormData({ ...formData, docsUrl: e.target.value })}
                                    placeholder="https://docs.yourservice.com"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-300 mb-3">Accepted Tokens</label>
                            <div className="flex flex-wrap gap-2">
                                {['SUI', 'WAL', 'USDC', 'USDT'].map(token => (
                                    <button
                                        key={token}
                                        type="button"
                                        onClick={() => handleTokenToggle(token)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${formData.tokensAccepted.includes(token)
                                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                            : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:border-slate-500'
                                            }`}
                                    >
                                        {token}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Pricing</h2>

                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-slate-300">Monthly Subscription Tiers</label>
                                <button
                                    type="button"
                                    onClick={addPricingTier}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Add Tier
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.pricingTiers.map((tier, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700">
                                        <input
                                            type="text"
                                            value={tier.name}
                                            onChange={e => updatePricingTier(index, 'name', e.target.value)}
                                            placeholder="Tier name (e.g. Free, Pro)"
                                            className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600"
                                        />
                                        <input
                                            type="text"
                                            value={tier.price}
                                            onChange={e => updatePricingTier(index, 'price', e.target.value)}
                                            placeholder="Price (SUI/mo)"
                                            className="w-32 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600"
                                        />
                                        <input
                                            type="text"
                                            value={tier.requests}
                                            onChange={e => updatePricingTier(index, 'requests', e.target.value)}
                                            placeholder="Requests"
                                            className="w-32 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600"
                                        />
                                        {formData.pricingTiers.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removePricingTier(index)}
                                                className="p-2 text-slate-400 hover:text-red-400 cursor-pointer transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-slate-300">Request Packages (Pay-per-use)</label>
                                <button
                                    type="button"
                                    onClick={addRequestPackage}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Add Package
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.requestPackages.map((pkg, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700">
                                        <input
                                            type="text"
                                            value={pkg.requests}
                                            onChange={e => updateRequestPackage(index, 'requests', e.target.value)}
                                            placeholder="Number of requests"
                                            className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600"
                                        />
                                        <input
                                            type="text"
                                            value={pkg.price}
                                            onChange={e => updateRequestPackage(index, 'price', e.target.value)}
                                            placeholder="Price (SUI)"
                                            className="w-32 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600"
                                        />
                                        {formData.requestPackages.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeRequestPackage(index)}
                                                className="p-2 text-slate-400 hover:text-red-400 cursor-pointer transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">Documentation & Support</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Support URL</label>
                                <input
                                    type="url"
                                    value={formData.supportUrl}
                                    onChange={e => setFormData({ ...formData, supportUrl: e.target.value })}
                                    placeholder="https://support.yourservice.com"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">API Reference URL</label>
                                <input
                                    type="url"
                                    placeholder="https://api.yourservice.com/docs"
                                    className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Sui Foundation Verification</h2>
                        <div className="space-y-3">
                            <label
                                onClick={() => setFormData({ ...formData, requestVerification: !formData.requestVerification })}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${formData.requestVerification
                                    ? 'bg-cyan-500 border-cyan-500'
                                    : 'border-slate-600 group-hover:border-slate-500'
                                    }`}
                                >
                                    {formData.requestVerification && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckBadgeIcon className="w-5 h-5 text-cyan-400" />
                                    <span className="font-medium text-white group-hover:text-cyan-100 transition-colors">Request Sui Foundation Verification</span>
                                </div>
                            </label>
                            <p className="text-sm text-slate-400 pl-8">
                                Submit your service for review by the Sui Foundation. Verified services receive a badge
                                and increased visibility in search results. Verification typically takes 5-7 business days.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <InformationCircleIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-slate-300">
                            <p className="font-medium text-white mb-1">On-Chain Publishing</p>
                            <p>Your service will be published. You can update metadata later through the provider dashboard.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.push('/provider')}
                            className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-medium border border-slate-600 hover:bg-slate-600 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 cursor-pointer"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Publishing...
                                </span>
                            ) : (
                                'Publish Service'
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
