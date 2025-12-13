import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getService } from '@/app/lib/service-utils';
import ServiceHeader from '@/app/components/service/ServiceHeader';
import ServiceNav from '@/app/components/service/ServiceNav';
import ServiceAccessPanel from '@/app/components/service/ServiceAccessPanel';

interface ServiceLayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

export default async function ServiceLayout({ children, params }: ServiceLayoutProps) {
    const { id } = await params;
    const service = getService(id);

    if (!service) {
        notFound();
    }

    if (!service.pricingTiers) {
        return (
            <div className="min-h-screen bg-slate-900">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Back to Marketplace</span>
                    </Link>
                    <ServiceHeader service={service} />
                    <div className="mt-6">
                        {children}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>Back to Marketplace</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ServiceHeader service={service} />
                        <ServiceNav serviceId={id} />
                        {children}
                    </div>

                    <div className="lg:col-span-1">
                        <ServiceAccessPanel service={service} />
                    </div>
                </div>
            </main>
        </div>
    );
}
