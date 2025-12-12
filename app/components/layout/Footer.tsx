'use client';

import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="mt-auto border-t border-slate-800 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-white">Sui Infra Hub</span>
                            <p className="text-xs text-slate-500">Built on 48h hackathon · Sui Native 🇵🇱</p>
                        </div>
                    </div>

                    <nav className="flex items-center gap-6 text-sm text-slate-400">
                        <Link href="/" className="hover:text-white transition-colors">
                            Explore
                        </Link>
                        <Link href="/dashboard" className="hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/provider" className="hover:text-white transition-colors">
                            Provider
                        </Link>
                        <Link href="/docs" className="hover:text-white transition-colors">
                            Docs
                        </Link>
                    </nav>

                    <button
                        onClick={scrollToTop}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
                        aria-label="Scroll to top"
                    >
                        <ArrowUpIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
