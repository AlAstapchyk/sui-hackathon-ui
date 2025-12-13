'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ServiceNavProps {
    serviceId: string;
}

export default function ServiceNav({ serviceId }: ServiceNavProps) {
    const pathname = usePathname();

    const tabs = [
        { name: 'Overview', href: `/service/${serviceId}` },
        { name: 'Pricing', href: `/service/${serviceId}/pricing` },
        { name: 'Docs', href: `/service/${serviceId}/docs` },
    ];

    const isActive = (href: string) => {
        if (href === `/service/${serviceId}`) {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="flex gap-2 border-b border-slate-700">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    href={tab.href}
                    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${isActive(tab.href)
                        ? 'text-cyan-400 border-cyan-400'
                        : 'text-slate-400 border-transparent hover:text-white'
                        }`}
                >
                    {tab.name}
                </Link>
            ))}
        </div>
    );
}
