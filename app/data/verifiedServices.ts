// TODO: Replace with on-chain Admin object

export const VERIFIED_SERVICE_IDS = [
  "0x268060691fbe57a86e16d41a8ba0a277441a7566beb9ddb2774430d68ef4a912", // SuperNode RPC
];

export const isVerified = (serviceId: string) => {
  return VERIFIED_SERVICE_IDS.includes(serviceId);
};
