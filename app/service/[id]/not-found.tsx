import Link from 'next/link';

export default function ServiceNotFound() {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
                <Link
                    href="/"
                    className="text-cyan-400 hover:underline"
                >
                    Return to Marketplace
                </Link>
            </div>
        </div>
    );
}
