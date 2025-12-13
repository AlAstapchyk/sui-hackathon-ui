'use client';

import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import {
    CheckCircleIcon,
    BoltIcon,
    ArrowTopRightOnSquareIcon,
    WalletIcon,
} from '@heroicons/react/24/outline';
import { useUserSubscription } from '../hooks/useSubscription';
import { SERVICES } from '../data/services';

export default function DashboardPage() {
    const account = useCurrentAccount();

    // Fetch real subscription data for service 1
    const { data: subscription, isLoading: subLoading } = useUserSubscription(1);

    // Get service info
    const service = SERVICES.find(s => s.id === 'blockberry-api') || SERVICES[0];

    const hasActiveSubscription = subscription && subscription.amount > 0;

    if (!account) {
        return (
            <div className="min-h-screen bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
                        <p className="text-slate-400 mb-8">
                            Connect your wallet to view your subscriptions
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
                    <p className="text-slate-400">Manage your service subscriptions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Active Subscriptions</p>
                                <p className="text-2xl font-bold text-white">
                                    {subLoading ? '...' : hasActiveSubscription ? '1' : '0'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <BoltIcon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Requests Available</p>
                                <p className="text-2xl font-bold text-white">
                                    {subLoading ? '...' : subscription?.amount?.toLocaleString() || '0'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-700/50">
                        <h2 className="text-lg font-semibold text-white">My Subscriptions</h2>
                    </div>

                    {subLoading ? (
                        <div className="p-8 text-center">
                            <div className="animate-pulse text-slate-400">Loading subscriptions...</div>
                        </div>
                    ) : hasActiveSubscription ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700/50">
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Service</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Requests Available</th>
                                        <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    <tr className="hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
                                                    {service.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{service.name}</p>
                                                    <p className="text-sm text-slate-400">Service ID: {subscription.serviceId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/20">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-lg font-bold text-white">
                                                {subscription.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/service/${service.id}`}
                                                    className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                                </Link>
                                                <Link
                                                    href={`/service/${service.id}`}
                                                    className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg transition-colors cursor-pointer"
                                                >
                                                    Top Up
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-slate-400 mb-4">No active subscriptions</p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 transition-all cursor-pointer"
                            >
                                Browse Services
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
