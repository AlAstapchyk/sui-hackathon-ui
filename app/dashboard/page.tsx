'use client';

import { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    ArrowTopRightOnSquareIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    BoltIcon
} from '@heroicons/react/24/outline';
import { MOCK_ENTITLEMENTS, MOCK_USAGE_HISTORY } from '../data/mock-dashboard';

export default function DashboardPage() {
    const account = useCurrentAccount();
    const [now] = useState(() => Date.now());

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getTimeRemaining = (expiresAt: number) => {
        const diff = expiresAt - now;
        if (diff < 0) return 'Expired';
        const days = Math.floor(diff / 86400000);
        if (days > 0) return `${days} days left`;
        const hours = Math.floor(diff / 3600000);
        return `${hours} hours left`;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircleIcon className="w-5 h-5 text-emerald-400" />;
            case 'expiring_soon':
                return <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />;
            case 'expired':
                return <XCircleIcon className="w-5 h-5 text-red-400" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-emerald-400 bg-emerald-500/20';
            case 'expiring_soon':
                return 'text-amber-400 bg-amber-500/20';
            case 'expired':
                return 'text-red-400 bg-red-500/20';
            default:
                return 'text-slate-400 bg-slate-500/20';
        }
    };

    const activeEntitlements = MOCK_ENTITLEMENTS.filter(e => e.status === 'active').length;
    const totalSpent = MOCK_ENTITLEMENTS.reduce((acc, e) => acc + e.totalPaid, 0);
    const totalRequests = MOCK_USAGE_HISTORY.reduce((acc, r) => acc + r.requests, 0);

    if (!account) {
        return (
            <div className="min-h-screen bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
                        <p className="text-slate-400 mb-8">
                            Connect your wallet to view your entitlements and usage
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
                    <p className="text-slate-400">Manage your service entitlements and track usage</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Active Entitlements</p>
                                <p className="text-2xl font-bold text-white">{activeEntitlements}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <CurrencyDollarIcon className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Spent</p>
                                <p className="text-2xl font-bold text-white">{totalSpent.toFixed(2)} SUI</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <BoltIcon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Requests (7d)</p>
                                <p className="text-2xl font-bold text-white">{totalRequests.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-slate-700/50">
                        <h2 className="text-lg font-semibold text-white">My Entitlements</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50">
                                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Service</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Usage</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Expires</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Paid</th>
                                    <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {MOCK_ENTITLEMENTS.map((ent) => (
                                    <tr key={ent.id} className="hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{ent.serviceName}</p>
                                                <p className="text-sm text-slate-400">by {ent.provider}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(ent.status)}`}>
                                                {getStatusIcon(ent.status)}
                                                {ent.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {ent.usageQuota ? (
                                                <div className="w-32">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-slate-400">{((ent.usageUsed || 0) / ent.usageQuota * 100).toFixed(0)}%</span>
                                                        <span className="text-slate-500">{(ent.usageUsed || 0).toLocaleString()}/{ent.usageQuota.toLocaleString()}</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                                                            style={{ width: `${Math.min(100, ((ent.usageUsed || 0) / ent.usageQuota * 100))}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-slate-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white">{formatDate(ent.expiresAt)}</p>
                                                <p className={`text-xs ${ent.status === 'expired' ? 'text-red-400' : ent.status === 'expiring_soon' ? 'text-amber-400' : 'text-slate-400'}`}>
                                                    {getTimeRemaining(ent.expiresAt)}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-white">{ent.totalPaid} SUI</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/service/${ent.serviceId}`}
                                                    className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                                </Link>
                                                {ent.status !== 'expired' && (
                                                    <button className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors cursor-pointer">
                                                        Renew
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Usage History (7 Days)</h2>
                        <ChartBarIcon className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="flex items-end gap-2 h-40">
                        {MOCK_USAGE_HISTORY.map((day, i) => {
                            const maxRequests = Math.max(...MOCK_USAGE_HISTORY.map(d => d.requests));
                            const height = (day.requests / maxRequests) * 100;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full bg-gradient-to-t from-cyan-500 to-teal-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                                        style={{ height: `${height}%` }}
                                        title={`${day.requests.toLocaleString()} requests`}
                                    />
                                    <span className="text-xs text-slate-500">{day.date.slice(5)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
