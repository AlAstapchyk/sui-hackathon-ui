'use client';

import { useState } from 'react';
import { useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { verifyPersonalMessageSignature } from '@mysten/sui/verify';
import {
    CheckCircleIcon,
    XCircleIcon,
    ClipboardDocumentIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';

export default function SignDemoPage() {
    const account = useCurrentAccount();
    const { mutateAsync: signMessage } = useSignPersonalMessage();

    const [payload, setPayload] = useState(JSON.stringify({
        payload: {
            args: 4,
            name: "Valera"
        }
    }, null, 2));

    const [signature, setSignature] = useState<string | null>(null);
    const [signedBytes, setSignedBytes] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<{
        valid: boolean;
        error?: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const handleSign = async () => {
        if (!account) {
            alert('Please connect your wallet first!');
            return;
        }

        try {
            JSON.parse(payload);
        } catch {
            alert('Invalid JSON payload!');
            return;
        }

        setLoading(true);
        setSignature(null);
        setVerificationResult(null);

        try {
            const messageBytes = new TextEncoder().encode(payload);

            const result = await signMessage({
                message: messageBytes,
            });

            console.log('Signature result:', result);
            setSignature(result.signature);
            setSignedBytes(result.bytes);
        } catch (error: any) {
            console.error('Signing error:', error);
            alert(`Signing failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!signature || !signedBytes || !account) {
            alert('No signature to verify!');
            return;
        }

        setVerifying(true);
        setVerificationResult(null);

        try {
            const publicKey = await verifyPersonalMessageSignature(
                new Uint8Array(Buffer.from(signedBytes, 'base64')),
                signature
            );
            const isValid = publicKey.toSuiAddress() === account.address;

            setVerificationResult({
                valid: isValid,
                error: isValid ? undefined : 'Public key does not match connected account'
            });

            console.log('Verification result:', {
                publicKey: publicKey.toSuiAddress(),
                accountAddress: account.address,
                isValid
            });
        } catch (error: any) {
            console.error('Verification error:', error);
            setVerificationResult({
                valid: false,
                error: error.message
            });
        } finally {
            setVerifying(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (!account) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
                    <p className="text-slate-400">Connect your wallet to test message signing</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Sui Message Signing Demo</h1>
                    <p className="text-slate-400">Sign a JSON payload with your Sui wallet and verify the signature</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-3">Connected Account</h2>
                    <code className="text-cyan-400 bg-slate-900/50 px-3 py-2 rounded-lg block font-mono text-sm break-all">
                        {account.address}
                    </code>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-white">JSON Payload to Sign</h2>
                        <PencilSquareIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <textarea
                        value={payload}
                        onChange={(e) => setPayload(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <button
                        onClick={handleSign}
                        disabled={loading}
                        className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Signing...' : 'Sign Message with Wallet'}
                    </button>
                </div>

                {signature && (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-white">Signature (Base64)</h2>
                            <button
                                onClick={() => copyToClipboard(signature)}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                title="Copy signature"
                            >
                                <ClipboardDocumentIcon className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <code className="text-emerald-400 bg-slate-900/50 px-3 py-2 rounded-lg block font-mono text-xs break-all">
                            {signature}
                        </code>

                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-slate-300 mb-2">Signed Bytes (Base64)</h3>
                            <code className="text-purple-400 bg-slate-900/50 px-3 py-2 rounded-lg block font-mono text-xs break-all">
                                {signedBytes}
                            </code>
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={verifying}
                            className="mt-4 w-full py-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {verifying ? 'Verifying...' : 'Verify Signature'}
                        </button>
                    </div>
                )}

                {verificationResult && (
                    <div className={`bg-slate-800/50 border rounded-2xl p-6 ${verificationResult.valid
                        ? 'border-emerald-500/50'
                        : 'border-red-500/50'
                        }`}>
                        <div className="flex items-center gap-3">
                            {verificationResult.valid ? (
                                <>
                                    <CheckCircleIcon className="w-8 h-8 text-emerald-400" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-emerald-400">Signature Valid ✓</h2>
                                        <p className="text-slate-400 text-sm">The signature was verified successfully</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <XCircleIcon className="w-8 h-8 text-red-400" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-red-400">Verification Failed</h2>
                                        <p className="text-slate-400 text-sm">{verificationResult.error}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">How It Works</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-cyan-400 mb-2">1. Sign a message:</h3>
                            <pre className="bg-slate-900/50 p-4 rounded-xl text-sm text-slate-300 overflow-x-auto">
                                {`import { useSignPersonalMessage } from '@mysten/dapp-kit';

const { mutateAsync: signMessage } = useSignPersonalMessage();

const payload = JSON.stringify({ payload: { args: 4, name: "Valera" }});
const messageBytes = new TextEncoder().encode(payload);

const { signature, bytes } = await signMessage({
    message: messageBytes,
});`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-purple-400 mb-2">2. Verify the signature:</h3>
                            <pre className="bg-slate-900/50 p-4 rounded-xl text-sm text-slate-300 overflow-x-auto">
                                {`import { verifyPersonalMessageSignature } from '@mysten/sui/verify';

const publicKey = await verifyPersonalMessageSignature(
    new Uint8Array(Buffer.from(signedBytes, 'base64')),
    signature
);

// Compare with expected address
const isValid = publicKey.toSuiAddress() === expectedAddress;`}
                            </pre>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
