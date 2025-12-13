import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, REGISTRY_ID } from "../constants";

export interface Subscription {
  serviceId: number;
  amount: number;
  user: string;
}

/**
 * Fetches the user's subscription amount using devInspect.
 * Calls get_subscription_amount(registry, user, service_id)
 */
export function useUserSubscription(serviceId: number = 1) {
  const client = useSuiClient();
  const account = useCurrentAccount();

  return useQuery({
    queryKey: ["subscription", account?.address, serviceId, PACKAGE_ID],
    queryFn: async (): Promise<Subscription | null> => {
      if (!account?.address) return null;

      try {
        const tx = new Transaction();
        tx.moveCall({
          target: `${PACKAGE_ID}::challenge::get_subscription_amount`,
          arguments: [
            tx.object(REGISTRY_ID),
            tx.pure.address(account.address),
            tx.pure.u64(serviceId),
          ],
        });

        const result = await client.devInspectTransactionBlock({
          transactionBlock: tx,
          sender: account.address,
        });

        console.log("devInspect result:", result);

        if (result.results && result.results.length > 0) {
          const returnValues = result.results[0].returnValues;
          if (returnValues && returnValues.length > 0) {
            const [amountBytes] = returnValues[0];
            const amount = new DataView(new Uint8Array(amountBytes).buffer).getBigUint64(0, true);
            console.log("Subscription amount:", amount.toString());

            return {
              serviceId,
              amount: Number(amount),
              user: account.address,
            };
          }
        }

        return null;
      } catch (error) {
        console.log("Error fetching subscription:", error);
        return null;
      }
    },
    enabled: !!account?.address,
    refetchInterval: 30000,
  });
}

/**
 * Fetches the price per request for a service using devInspect.
 * Calls get_request_price_per_request(registry, service_id)
 */
export function useRequestPrice(serviceId: number = 1) {
  const client = useSuiClient();

  return useQuery({
    queryKey: ["requestPrice", serviceId, PACKAGE_ID],
    queryFn: async (): Promise<number | null> => {
      try {
        const tx = new Transaction();
        tx.moveCall({
          target: `${PACKAGE_ID}::challenge::get_request_price_per_request`,
          arguments: [tx.object(REGISTRY_ID), tx.pure.u64(serviceId)],
        });

        const result = await client.devInspectTransactionBlock({
          transactionBlock: tx,
          sender: "0x0000000000000000000000000000000000000000000000000000000000000000",
        });

        console.log("Request price devInspect result:", result);

        if (result.results && result.results.length > 0) {
          const returnValues = result.results[0].returnValues;
          if (returnValues && returnValues.length > 0) {
            const [priceBytes] = returnValues[0];
            const price = new DataView(new Uint8Array(priceBytes).buffer).getBigUint64(0, true);
            console.log("Request price per request:", price.toString(), "MIST");
            return Number(price);
          }
        }

        return null;
      } catch (error) {
        console.log("Error fetching request price:", error);
        return null;
      }
    },
    refetchInterval: 60000,
  });
}
