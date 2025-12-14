import { notFound } from 'next/navigation';
import { getServiceById } from '@/app/lib/service-utils';
import ServiceFeatures from '@/app/components/service/ServiceFeatures';
import ServiceDescription from '@/app/components/service/ServiceDescription';

interface ServicePageProps {
    params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <ServiceFeatures service={service} />
            <ServiceDescription service={service} />
        </div>
    );
}
