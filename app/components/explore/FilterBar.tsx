'use client';

import { motion, AnimatePresence } from 'motion/react';
import { XMarkIcon, CurrencyDollarIcon, UserPlusIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import AnimatedDropdown from './AnimatedDropdown';

interface FilterBarProps {
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    verifiedOnly: boolean;
    onVerifiedChange: (verified: boolean) => void;
    priceRange: string | null;
    onPriceRangeChange: (range: string | null) => void;
    acceptingUsersOnly: boolean;
    onAcceptingUsersChange: (accepting: boolean) => void;
}

const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'rpc', label: 'RPC Nodes' },
    { id: 'indexer', label: 'Indexers' },
    { id: 'analytics', label: 'Data & Analytics' },
    { id: 'storage', label: 'Storage' },
    { id: 'compute', label: 'Compute' },
    { id: 'security', label: 'Security' },
];

const priceRanges = [
    { id: 'all', label: 'Any Price' },
    { id: 'free', label: 'Free Tier Available' },
    { id: 'budget', label: 'Budget (< 5 SUI/mo)' },
    { id: 'standard', label: 'Standard (5-15 SUI/mo)' },
    { id: 'premium', label: 'Premium (> 15 SUI/mo)' },
];

interface ToggleFilterButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    activeColor: 'cyan' | 'emerald';
}

function ToggleFilterButton({ active, onClick, icon, label, activeColor }: ToggleFilterButtonProps) {
    const colorMap = {
        cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };

    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${active
                ? `${colorMap[activeColor]} border`
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-600'
                }`}
        >
            {icon}
            <span>{label}</span>
        </motion.button>
    );
}

export default function FilterBar({
    selectedCategory,
    onCategoryChange,
    verifiedOnly,
    onVerifiedChange,
    priceRange,
    onPriceRangeChange,
    acceptingUsersOnly,
    onAcceptingUsersChange,
}: FilterBarProps) {
    const activeFilters = [
        selectedCategory && selectedCategory !== 'all'
            ? categories.find(c => c.id === selectedCategory)?.label
            : null,
        verifiedOnly ? 'Sui Verified' : null,
        priceRange && priceRange !== 'all'
            ? priceRanges.find(p => p.id === priceRange)?.label
            : null,
        acceptingUsersOnly ? 'Accepting Users' : null,
    ].filter(Boolean) as string[];

    const hasFilters = activeFilters.length > 0;

    const clearAllFilters = () => {
        onCategoryChange(null);
        onVerifiedChange(false);
        onPriceRangeChange(null);
        onAcceptingUsersChange(false);
    };

    return (
        <div className="shrink-0">
            <div className="flex flex-wrap items-center gap-3">
                <AnimatedDropdown
                    options={categories}
                    value={selectedCategory}
                    onChange={onCategoryChange}
                    placeholder="Categories"
                    activeColor="cyan"
                />

                <AnimatedDropdown
                    options={priceRanges}
                    value={priceRange}
                    onChange={onPriceRangeChange}
                    placeholder="Price"
                    icon={<CurrencyDollarIcon className="w-4 h-4" />}
                    activeColor="purple"
                />

                <ToggleFilterButton
                    active={acceptingUsersOnly}
                    onClick={() => onAcceptingUsersChange(!acceptingUsersOnly)}
                    icon={<UserPlusIcon className="w-4 h-4" />}
                    label="Accepting Users"
                    activeColor="emerald"
                />

                <ToggleFilterButton
                    active={verifiedOnly}
                    onClick={() => onVerifiedChange(!verifiedOnly)}
                    icon={<CheckBadgeIcon className="w-4 h-4" />}
                    label="Sui Verified"
                    activeColor="cyan"
                />

                <AnimatePresence>
                    {hasFilters && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={clearAllFilters}
                            className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        >
                            <XMarkIcon className="w-4 h-4" />
                            Clear all
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
