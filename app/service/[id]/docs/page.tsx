import { notFound } from 'next/navigation';
import { getServiceById } from '@/app/lib/service-utils';
import ServiceDocsContent from '@/app/components/service/ServiceDocsContent';

interface ServiceDocsPageProps {
    params: Promise<{ id: string }>;
}

export default async function ServiceDocsPage({ params }: ServiceDocsPageProps) {
    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) notFound();

    return <ServiceDocsContent service={service} />;
}
