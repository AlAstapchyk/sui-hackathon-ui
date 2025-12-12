'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ConnectButton } from '@mysten/dapp-kit';
import { Bars3Icon, XMarkIcon, WalletIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const isActive = (path: string) => {
        if (path === '/') return pathname === '/' && !pathname.startsWith('/dashboard') && !pathname.startsWith('/provider');
        return pathname.startsWith(path);
    };

    const navLinks = [
        { href: '/', label: 'Explore' },
        { href: '/dashboard', label: 'My Dashboard' },
        { href: '/provider', label: 'Provider' },
        { href: '/docs', label: 'Docs' },
    ];

    const walletButtonStyles = `
        [&_button]:!bg-gradient-to-r 
        [&_button]:!from-cyan-500 
        [&_button]:!to-teal-500 
        [&_button]:!border-0 
        [&_button]:!text-white 
        [&_button]:!font-semibold 
        [&_button]:!rounded-xl 
        [&_button]:!px-5 
        [&_button]:!py-2.5 
        [&_button]:hover:!opacity-90
        [&_button]:hover:!shadow-lg
        [&_button]:hover:!shadow-cyan-500/30
        [&_button]:active:!brightness-90
        [&_button]:!transition-all 
        [&_button]:!duration-200
        [&_button]:!cursor-pointer
    `;

    const mobileWalletButtonStyles = `
        [&_button]:!w-full
        [&_button]:!bg-gradient-to-r 
        [&_button]:!from-cyan-500 
        [&_button]:!to-teal-500 
        [&_button]:!border-0 
        [&_button]:!text-white 
        [&_button]:!font-semibold 
        [&_button]:!rounded-xl 
        [&_button]:!px-5 
        [&_button]:!py-3 
        [&_button]:hover:!opacity-90
        [&_button]:active:!brightness-90
        [&_button]:!transition-all 
        [&_button]:!duration-200
        [&_button]:!cursor-pointer
    `;

    return (
        <>
            <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-6">
                            <motion.button
                                onClick={() => setMobileMenuOpen(true)}
                                whileTap={{ scale: 0.95 }}
                                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                <Bars3Icon className="w-6 h-6 text-slate-400" />
                            </motion.button>

                            <Link href="/" className="flex items-center gap-3 cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent hidden sm:inline">
                                    Sui Infra Hub
                                </span>
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="relative px-4 py-2 font-medium transition-colors cursor-pointer group"
                                    >
                                        <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}>
                                            {link.label}
                                        </span>
                                        <div
                                            className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full transition-all duration-200 ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                                }`}
                                        />
                                        <div
                                            className={`absolute -bottom-1 left-2 right-2 h-3 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-full blur-sm transition-all duration-200 ${active ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center">
                            <div className={`flex items-center ${walletButtonStyles}`}>
                                <div className="flex items-center gap-2">
                                    <WalletIcon className="w-5 h-5 text-white pointer-events-none absolute ml-4 z-10" />
                                    <div className="[&_button]:!pl-10">
                                        <ConnectButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 shadow-xl"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                        Sui Infra Hub
                                    </span>
                                </Link>
                                <motion.button
                                    onClick={() => setMobileMenuOpen(false)}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    <XMarkIcon className="w-6 h-6 text-slate-400" />
                                </motion.button>
                            </div>

                            <nav className="p-4 space-y-2">
                                {navLinks.map((link, index) => {
                                    const active = isActive(link.href);
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 + 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`block px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer relative ${active
                                                    ? 'text-white bg-cyan-500/20 border border-cyan-500/30'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                    }`}
                                            >
                                                {link.label}
                                                {active && (
                                                    <div className="absolute left-0 w-1 top-2 bottom-2 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-full" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800"
                            >
                                <div className={mobileWalletButtonStyles}>
                                    <ConnectButton />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
