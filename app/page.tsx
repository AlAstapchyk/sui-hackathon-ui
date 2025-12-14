import { getAllServices } from './lib/service-utils';
import HeroSection from './components/explore/HeroSection';
import ServiceExplorer from './components/explore/ServiceExplorer';
import { Service } from './components/explore/ServiceCard';

export default async function Home() {
  const allServices = await getAllServices();

  const services: Service[] = allServices.map(s => ({
    ...s,
    category: s.category || 'General',
  }));

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection serviceCount={services.length} />

        <ServiceExplorer services={services} />
      </main>
    </div>
  );
}
