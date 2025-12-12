import { ArrowDownIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface HeroSectionProps {
    serviceCount: number;
}

export default function HeroSection({ serviceCount }: HeroSectionProps) {
    return (
        <section className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50">
            <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-5 left-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-8 py-8 lg:py-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Discover & Pay</span>
                        <br />
                        <span className="text-white">for Infra Services On-Chain</span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                        Explore {serviceCount > 0 ? serviceCount : 'premium'} infrastructure services from verified providers.
                        Pay with SUI, WAL, or stablecoins. Access instantly via on-chain entitlements.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="#services"
                            className="flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25"
                        >
                            Explore Services
                            <ArrowDownIcon className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/docs"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all"
                        >
                            <BookOpenIcon className="w-5 h-5" />
                            View Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
