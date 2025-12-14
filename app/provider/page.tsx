'use client';

import { useCurrentAccount } from '@mysten/dapp-kit';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../hooks/useUser';
import { ServiceData } from '../data/services';
import {
    PlusIcon,
    PencilSquareIcon,
    EyeIcon,
    ChartBarIcon,
    CheckCircleIcon,
    CheckBadgeIcon,
    PauseCircleIcon,
    UserPlusIcon,
    CubeIcon,
    SparklesIcon,
    ArrowTrendingUpIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export default function ProviderDashboardPage() {
    const account = useCurrentAccount();
    const { user, isLoading, isRegistered, register, error } = useUser();
    const [services, setServices] = useState<ServiceData[]>([]);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        async function fetchProviderServices() {
            if (!account?.address) {
                setServices([]);
                setServicesLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/services?provider=${account.address}`);
                const data = await res.json();
                setServices(data.services || []);
            } catch (err) {
                console.error('Error fetching provider services:', err);
            } finally {
                setServicesLoading(false);
            }
        }
        fetchProviderServices();
    }, [account?.address]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsRegistering(true);
        await register(nickname || undefined, name || undefined);
        setIsRegistering(false);
    };

    // Memoize computed values to prevent unnecessary recalculations
    const stats = useMemo(() => ({
        totalServices: services.length,
        activeServices: services.filter(s => s.acceptingNewUsers !== false).length,
        verifiedServices: services.filter(s => s.is_verified).length,
        hasApiExplorer: services.filter(s => s.apiExplorer).length,
    }), [services]);

    // Mark initial load complete after services load
    useEffect(() => {
        if (!servicesLoading && isInitialLoad) {
            const timer = setTimeout(() => setIsInitialLoad(false), 50);
            return () => clearTimeout(timer);
        }
    }, [servicesLoading, isInitialLoad]);

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
                            <RocketLaunchIcon className="w-10 h-10 text-cyan-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Connect Your Wallet</h1>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Connect your wallet to manage your service listings
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-12 h-12 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400 text-lg">Checking registration...</p>
                </div>
            </div>
        );
    }

    // Not registered - show registration form
    if (!isRegistered) {
        return (
            <div className="min-h-screen bg-slate-900 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-3xl" />
                </div>

                <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-xl" />
                        <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10">
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 mb-6">
                                    <UserPlusIcon className="w-10 h-10 text-cyan-400" />
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3">
                                    Become a Provider
                                </h1>
                                <p className="text-slate-400 text-lg">
                                    Create your provider profile to start listing services
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        Nickname
                                    </label>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        placeholder="e.g., CryptoBuilder"
                                        className="w-full px-5 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        Full Name <span className="text-slate-500 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., John Doe"
                                        className="w-full px-5 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isRegistering}
                                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isRegistering ? (
                                        <span className="inline-flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Registering...
                                        </span>
                                    ) : 'Create Provider Account'}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-slate-700/50">
                                <p className="text-center text-slate-500 text-sm">
                                    Connected wallet: <span className="text-slate-400">{account.address.slice(0, 8)}...{account.address.slice(-6)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            icon: CubeIcon,
            label: 'Total Services',
            value: stats.totalServices,
            color: 'cyan',
            gradient: 'from-cyan-500/20 to-blue-500/20',
            borderHover: 'hover:border-cyan-500/30',
            shadowHover: 'hover:shadow-cyan-500/10',
            textColor: 'text-cyan-400',
        },
        {
            icon: CheckCircleIcon,
            label: 'Active Services',
            value: stats.activeServices,
            color: 'emerald',
            gradient: 'from-emerald-500/20 to-teal-500/20',
            borderHover: 'hover:border-emerald-500/30',
            shadowHover: 'hover:shadow-emerald-500/10',
            textColor: 'text-emerald-400',
        },
        {
            icon: CheckBadgeIcon,
            label: 'Verified Services',
            value: stats.verifiedServices,
            color: 'purple',
            gradient: 'from-purple-500/20 to-pink-500/20',
            borderHover: 'hover:border-purple-500/30',
            shadowHover: 'hover:shadow-purple-500/10',
            textColor: 'text-purple-400',
        },
        {
            icon: ChartBarIcon,
            label: 'With API Explorer',
            value: stats.hasApiExplorer,
            color: 'amber',
            gradient: 'from-amber-500/20 to-orange-500/20',
            borderHover: 'hover:border-amber-500/30',
            shadowHover: 'hover:shadow-amber-500/10',
            textColor: 'text-amber-400',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-3xl" />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-8 w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
                                Provider Dashboard
                            </h1>
                        </div>
                        <p className="text-slate-400 ml-4 text-lg">Manage your infrastructure service listings</p>
                    </div>
                    <Link
                        href="/provider/create"
                        className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all cursor-pointer overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <PlusIcon className="w-5 h-5" />
                        <span>Create Service</span>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 transition-opacity duration-300 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}>
                    {statCards.map((card, i) => (
                        <div key={i} className="group relative">
                            <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className={`relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 ${card.borderHover} transition-all duration-300 hover:shadow-lg ${card.shadowHover}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} border border-${card.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <card.icon className={`w-7 h-7 ${card.textColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 mb-1">{card.label}</p>
                                        <p className="text-3xl font-bold text-white h-9 flex items-center">
                                            {card.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Services Table */}
                <div className={`relative transition-opacity duration-300 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl blur-xl" />
                    <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                <h2 className="text-xl font-semibold text-white">My Services</h2>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-slate-700/50 text-sm text-slate-400">
                                {services.length} service{services.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        {services.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 mb-8">
                                    <RocketLaunchIcon className="w-12 h-12 text-slate-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Launch Your First Service</h3>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto text-lg">
                                    Create your first service listing and start earning from infrastructure subscriptions
                                </p>
                                <Link
                                    href="/provider/create"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all cursor-pointer"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    Create Your First Service
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700/50 bg-slate-800/30">
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Service</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
                                            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/30">
                                        {services.map((service, index) => (
                                            <tr
                                                key={service.id}
                                                className="group hover:bg-slate-700/20 transition-all duration-200"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
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
                                                            {service.is_verified && (
                                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                                                                    <CheckBadgeIcon className="w-3 h-3 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-white text-lg group-hover:text-cyan-400 transition-colors truncate">
                                                                {service.name}
                                                            </p>
                                                            <p className="text-sm text-slate-500 truncate max-w-xs">{service.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {service.is_verified ? (
                                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                            <CheckBadgeIcon className="w-4 h-4" />
                                                            Verified
                                                        </span>
                                                    ) : service.acceptingNewUsers ? (
                                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                                            <PauseCircleIcon className="w-4 h-4" />
                                                            Paused
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="px-3 py-1.5 rounded-lg bg-slate-700/30 text-slate-300 text-sm font-medium">
                                                        {service.category || 'General'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-white font-semibold text-lg">
                                                        {service.freeTier ? (
                                                            <span className="text-emerald-400">Free</span>
                                                        ) : service.pricingTiers?.[0]?.price ? (
                                                            `${service.pricingTiers[0].price} SUI`
                                                        ) : (
                                                            <span className="text-emerald-400">Free</span>
                                                        )}
                                                    </span>
                                                    {service.pricingTiers && service.pricingTiers.length > 0 && (
                                                        <p className="text-slate-500 text-sm">
                                                            +{service.pricingTiers.length} tier{service.pricingTiers.length !== 1 ? 's' : ''}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            className="p-2.5 rounded-xl hover:bg-slate-700/50 text-slate-400 hover:text-amber-400 transition-all cursor-pointer"
                                                            title="View Analytics"
                                                        >
                                                            <ChartBarIcon className="w-5 h-5" />
                                                        </button>
                                                        <Link
                                                            href={`/service/${service.id}`}
                                                            className="p-2.5 rounded-xl hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all cursor-pointer"
                                                            title="Preview"
                                                        >
                                                            <EyeIcon className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            className="p-2.5 rounded-xl hover:bg-slate-700/50 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer"
                                                            title="Edit"
                                                        >
                                                            <PencilSquareIcon className="w-5 h-5" />
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
                </div>

                {/* Provider Tips Section */}
                {services.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                        <ArrowTrendingUpIcon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Boost Visibility</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Add detailed documentation and API examples to increase your service discoverability.
                                </p>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <CheckBadgeIcon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Get Verified</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Verified services get 3x more visibility and user trust in the marketplace.
                                </p>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <SparklesIcon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Add API Explorer</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Interactive API playgrounds help users test before they subscribe.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
