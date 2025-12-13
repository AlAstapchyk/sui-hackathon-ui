import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { PACKAGE_ID, REGISTRY_ID } from "../constants";

export interface Subscription {
  serviceId: number;
  amount: number;
  user: string;
}

/**
 * Fetches the user's subscription for a specific service from the challenge contract.
 * Subscriptions are stored as dynamic fields on the ServiceRegistry.
 */
export function useUserSubscription(serviceId: number = 1) {
  const client = useSuiClient();
  const account = useCurrentAccount();

  return useQuery({
    queryKey: ["subscription", account?.address, serviceId, PACKAGE_ID],
    queryFn: async (): Promise<Subscription | null> => {
      if (!account?.address) return null;

      try {
        // Query dynamic field using SubscriptionKey { service_id, user }
        const dynamicField = await client.getDynamicFieldObject({
          parentId: REGISTRY_ID,
          name: {
            type: `${PACKAGE_ID}::challenge::SubscriptionKey`,
            value: {
              service_id: serviceId.toString(),
              user: account.address,
            },
          },
        });

        if (!dynamicField.data?.content) return null;

        const content = dynamicField.data.content as any;
        const subscriptionField = content?.fields?.value?.fields;

        if (!subscriptionField) return null;

        return {
          serviceId: Number(subscriptionField.service_id || serviceId),
          amount: Number(subscriptionField.amount || 0),
          user: subscriptionField.user || account.address,
        };
      } catch (error) {
        // Dynamic field doesn't exist = no subscription
        console.log("No subscription found for user:", error);
        return null;
      }
    },
    enabled: !!account?.address,
    refetchInterval: 30000,
  });
}

/**
 * Format the subscription amount as MIST or SUI
 */
export function formatSubscriptionAmount(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(4)} SUI`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)}M MIST`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(2)}K MIST`;
  }
  return `${amount} MIST`;
}
