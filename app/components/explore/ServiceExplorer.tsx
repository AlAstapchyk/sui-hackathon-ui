'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import ServiceCard, { Service } from './ServiceCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

interface PricingTier {
    name: string;
    price: string;
    requests: string;
    features: string[];
}

interface ServiceWithPricing extends Service {
    pricingTiers?: PricingTier[];
}

interface ServiceExplorerProps {
    services: Service[];
}

const hasFreeTier = (service: ServiceWithPricing): boolean => {
    if (!service.pricingTiers) return false;
    return service.pricingTiers.some((tier) =>
        tier.price.toLowerCase().includes('free')
    );
};

export default function ServiceExplorer({ services }: ServiceExplorerProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [priceRange, setPriceRange] = useState<string | null>(null);
    const [acceptingUsersOnly, setAcceptingUsersOnly] = useState(false);

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    service.name.toLowerCase().includes(query) ||
                    service.description.toLowerCase().includes(query) ||
                    service.provider.toLowerCase().includes(query) ||
                    service.category.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            if (selectedCategory) {
                const categoryMap: Record<string, string[]> = {
                    'rpc': ['RPC'],
                    'indexer': ['Indexer'],
                    'analytics': ['Analytics', 'Data'],
                    'storage': ['Storage'],
                    'compute': ['Compute'],
                    'security': ['Security'],
                };
                const validCategories = categoryMap[selectedCategory] || [];
                if (!validCategories.some(cat =>
                    service.category.toLowerCase().includes(cat.toLowerCase())
                )) {
                    return false;
                }
            }

            if (verifiedOnly && !service.is_verified) {
                return false;
            }

            if (priceRange) {
                const monthlyPrice = service.price_ms / 1_000_000;
                switch (priceRange) {
                    case 'free':
                        if (!hasFreeTier(service)) return false;
                        break;
                    case 'budget':
                        if (monthlyPrice >= 5) return false;
                        break;
                    case 'standard':
                        if (monthlyPrice < 5 || monthlyPrice > 15) return false;
                        break;
                    case 'premium':
                        if (monthlyPrice <= 15) return false;
                        break;
                }
            }

            if (acceptingUsersOnly && !service.acceptingNewUsers) return false;

            return true;
        });
    }, [services, searchQuery, selectedCategory, verifiedOnly, priceRange, acceptingUsersOnly]);

    const clearAllFilters = () => {
        setSelectedCategory(null);
        setVerifiedOnly(false);
        setSearchQuery('');
        setPriceRange(null);
        setAcceptingUsersOnly(false);
    };

    return (
        <>
            <motion.div
                className="mb-8 scroll-mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                id='services'
            >
                <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search services..."
                        className="w-full xl:min-w-48 xl:grow xl:shrink"
                    />
                    <FilterBar
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        verifiedOnly={verifiedOnly}
                        onVerifiedChange={setVerifiedOnly}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        acceptingUsersOnly={acceptingUsersOnly}
                        onAcceptingUsersChange={setAcceptingUsersOnly}
                    />
                </div>

                <p className="text-slate-400 text-sm mt-4">
                    Showing{' '}
                    <span className="font-semibold text-white">
                        {filteredServices.length}
                    </span>{' '}
                    services
                </p>
            </motion.div>


            {filteredServices.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
                    <p className="text-slate-400 mb-6">
                        Try adjusting your filters or search query
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearAllFilters}
                        className="px-6 py-3 bg-slate-800 text-white rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                        Clear all filters
                    </motion.button>
                </motion.div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: Math.min(index * 0.05, 0.5),
                                duration: 0.3
                            }}
                        >
                            <ServiceCard service={service} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </>
    );
}
