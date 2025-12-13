import { notFound } from 'next/navigation';
import { getService } from '@/app/lib/service-utils';
import ServicePricingDisplay from '@/app/components/service/ServicePricingDisplay';

interface ServicePricingPageProps {
    params: Promise<{ id: string }>;
}

export default async function ServicePricingPage({ params }: ServicePricingPageProps) {
    const { id } = await params;
    const service = getService(id);

    if (!service) {
        notFound();
    }

    return <ServicePricingDisplay service={service} />;
}
