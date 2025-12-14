'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import {
    CheckCircleIcon,
    BoltIcon,
    ArrowTopRightOnSquareIcon,
    SparklesIcon,
    ArrowTrendingUpIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { useUserSubscription } from '../hooks/useSubscription';
import { ServiceData } from '../data/services';
import Image from 'next/image';

export default function DashboardPage() {
    const account = useCurrentAccount();
    const [service, setService] = useState<ServiceData | null>(null);
    const [serviceLoading, setServiceLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Fetch real subscription data for service 1
    const { data: subscription, isLoading: subLoading } = useUserSubscription(1);

    // Fetch service from MongoDB
    useEffect(() => {
        async function fetchService() {
            try {
                const res = await fetch('/api/services?id=blockberry-api');
                const data = await res.json();
                if (data.service) {
                    setService(data.service);
                }
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setServiceLoading(false);
            }
        }
        fetchService();
    }, []);

    // Combined loading state - only show loading on initial load
    const isLoading = subLoading || serviceLoading;

    // Mark initial load complete after first data fetch
    useEffect(() => {
        if (!isLoading && isInitialLoad) {
            // Small delay to ensure smooth transition
            const timer = setTimeout(() => setIsInitialLoad(false), 50);
            return () => clearTimeout(timer);
        }
    }, [isLoading, isInitialLoad]);

    const hasActiveSubscription = subscription && subscription.amount > 0;

    // Memoize computed values to prevent unnecessary recalculations
    const displayData = useMemo(() => ({
        subscriptionCount: hasActiveSubscription ? '1' : '0',
        requestsAvailable: subscription?.amount?.toLocaleString() || '0',
    }), [hasActiveSubscription, subscription?.amount]);

    if (!account) {
        return (
            <div className="min-h-screen bg-slate-900 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 mb-6">
                            <SparklesIcon className="w-10 h-10 text-cyan-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Connect your wallet to view and manage your service subscriptions
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-3xl" />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
                            My Dashboard
                        </h1>
                    </div>
                    <p className="text-slate-400 ml-4 text-lg">Manage your service subscriptions and usage</p>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl blur-xl" />
                    <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                <h2 className="text-xl font-semibold text-white">My Subscriptions</h2>
                            </div>
                            <Link
                                href="/"
                                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                            >
                                Browse all services →
                            </Link>
                        </div>

                        <div className={`transition-opacity duration-300 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}>
                            {isLoading ? (
                                <div className="p-12 text-center">
                                    <div className="inline-flex items-center gap-3">
                                        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-slate-400">Loading subscriptions...</span>
                                    </div>
                                </div>
                            ) : hasActiveSubscription && service ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-700/50 bg-slate-800/30">
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Service</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Requests Available</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Usage</th>
                                                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/30">
                                            <tr className="group hover:bg-slate-700/20 transition-all duration-200">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative">
                                                            {service.logo ? (
                                                                <Image
                                                                    src={service.logo}
                                                                    alt={service.name}
                                                                    width={48}
                                                                    height={48}
                                                                    className="w-12 h-12 rounded-xl object-cover shadow-lg"
                                                                    unoptimized
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                                                                    {service.name.charAt(0)}
                                                                </div>
                                                            )}
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-white text-lg group-hover:text-cyan-400 transition-colors">{service.name}</p>
                                                            <p className="text-sm text-slate-500">Service ID: {subscription.serviceId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <span className="text-2xl font-bold text-white">
                                                            {subscription.amount.toLocaleString()}
                                                        </span>
                                                        <span className="text-slate-500 ml-2">credits</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="w-32">
                                                        <div className="flex items-center justify-between text-xs mb-1">
                                                            <span className="text-slate-500">12% used</span>
                                                        </div>
                                                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                                            <div className="h-full w-[12%] bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/service/${service.id}`}
                                                            className="p-2.5 rounded-xl hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all cursor-pointer"
                                                            title="View Service"
                                                        >
                                                            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                                                        </Link>
                                                        <Link
                                                            href={`/service/${service.id}`}
                                                            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
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
                                <div className="p-16 text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 mb-6">
                                        <SparklesIcon className="w-10 h-10 text-slate-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No active subscriptions</h3>
                                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                        Start exploring our services and subscribe to unlock powerful infrastructure tools
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
                                    >
                                        <SparklesIcon className="w-5 h-5" />
                                        Browse Services
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 transition-opacity duration-300 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <CheckCircleIcon className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 mb-1">Active Subscriptions</p>
                                        <p className="text-3xl font-bold text-white h-9 flex items-center">
                                            {displayData.subscriptionCount}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                                    <ArrowTrendingUpIcon className="w-4 h-4" />
                                    <span>Active</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-700/50">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>Last updated just now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <BoltIcon className="w-7 h-7 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 mb-1">Requests Available</p>
                                        <p className="text-3xl font-bold text-white h-9 flex items-center">
                                            {displayData.requestsAvailable}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-purple-400 text-sm font-medium">
                                    <SparklesIcon className="w-4 h-4" />
                                    <span>Credits</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-700/50">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-slate-500">Usage this month</span>
                                    <span className="text-white font-medium">12%</span>
                                </div>
                                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                    <div className="h-full w-[12%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative md:col-span-2 lg:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/"
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors group/action cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                            <SparklesIcon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <span className="text-slate-300 group-hover/action:text-white transition-colors">Browse Services</span>
                                    </div>
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-500 group-hover/action:text-cyan-400 transition-colors" />
                                </Link>
                                <Link
                                    href="/docs"
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors group/action cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                            <BoltIcon className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <span className="text-slate-300 group-hover/action:text-white transition-colors">API Documentation</span>
                                    </div>
                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-500 group-hover/action:text-cyan-400 transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
