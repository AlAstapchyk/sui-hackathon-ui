'use client';

import { useCurrentAccount } from '@mysten/dapp-kit';
import { useState } from 'react';
import Link from 'next/link';
import { MOCK_PROVIDER_SERVICES, ProviderService } from '../data/mock-dashboard';
import {
    PlusIcon,
    PencilSquareIcon,
    EyeIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    UsersIcon,
    CheckCircleIcon,
    PauseCircleIcon,
    DocumentDuplicateIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function ProviderDashboardPage() {
    const account = useCurrentAccount();
    const [services, setServices] = useState<ProviderService[]>(MOCK_PROVIDER_SERVICES);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                        Active
                    </span>
                );
            case 'paused':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                        <PauseCircleIcon className="w-3.5 h-3.5" />
                        Paused
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/20 text-slate-400">
                        <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                        Draft
                    </span>
                );
            default:
                return null;
        }
    };

    const totalRevenue = services.reduce((acc, s) => acc + s.totalRevenue, 0);
    const totalUsers = services.reduce((acc, s) => acc + s.totalUsers, 0);
    const activeServices = services.filter(s => s.status === 'active').length;

    if (!account) {
        return (
            <div className="min-h-screen bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
                        <p className="text-slate-400 mb-8">
                            Connect your wallet to manage your service listings
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Provider Dashboard</h1>
                        <p className="text-slate-400">Manage your infrastructure service listings</p>
                    </div>
                    <Link
                        href="/provider/create"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Create Service</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <CurrencyDollarIcon className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-white">{totalRevenue.toFixed(1)} SUI</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <UsersIcon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Users</p>
                                <p className="text-2xl font-bold text-white">{totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Active Services</p>
                                <p className="text-2xl font-bold text-white">{activeServices}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <ArrowTrendingUpIcon className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">This Month</p>
                                <p className="text-2xl font-bold text-white">+23%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">My Services</h2>
                        <span className="text-sm text-slate-400">{services.length} services</span>
                    </div>

                    {services.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                                <PlusIcon className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">No services yet</h3>
                            <p className="text-slate-400 mb-6">Create your first service listing to start earning</p>
                            <button
                                className="px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                            >
                                Create Service
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700/50">
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Service</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Revenue</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Users</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Entitlements</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Updated</th>
                                        <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {services.map((service) => (
                                        <tr key={service.id} className="hover:bg-slate-700/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-white">{service.name}</p>
                                                    <p className="text-sm text-slate-400">{service.category}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(service.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white font-medium">{service.totalRevenue.toFixed(1)} SUI</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white">{service.totalUsers}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white">{service.activeEntitlements} active</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-400">{formatDate(service.lastUpdated)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                                        title="View Analytics"
                                                    >
                                                        <ChartBarIcon className="w-5 h-5 text-slate-400 hover:text-white" />
                                                    </button>
                                                    <Link
                                                        href={`/service/${service.id}`}
                                                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                                        title="Preview"
                                                    >
                                                        <EyeIcon className="w-5 h-5 text-slate-400 hover:text-white" />
                                                    </Link>
                                                    <button
                                                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                                        title="Edit"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
