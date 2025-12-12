import { useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { isVerified } from "../data/verifiedServices";
import { PACKAGE_ID } from "../constants";

export interface Service {
  id: string;
  name: string;
  description: string;
  price_ms: number;
  owner: string;
  tags: string[];
  is_verified: boolean;
}

export function useServices() {
  const client = useSuiClient();

  return useQuery({
    queryKey: ["services", PACKAGE_ID],
    queryFn: async (): Promise<Service[]> => {
      const events = await client.queryEvents({
        query: {
          MoveModule: {
            package: PACKAGE_ID,
            module: "service_platform",
          },
        },
        limit: 50,
        order: "descending",
      });

      const serviceIds = events.data
        .filter((e) => e.type.includes("::ServiceCreated"))
        .map((e) => (e.parsedJson as any).service_id);

      if (serviceIds.length === 0) return [];

      const objects = await client.multiGetObjects({
        ids: serviceIds,
        options: { showContent: true },
      });
      return objects
        .map((obj) => {
          const content = obj.data?.content as any;
          const fields = content?.fields;
          if (!fields) return null;

          return {
            id: obj.data?.objectId || "",
            name: fields.name,
            description: fields.description,
            price_ms: Number(fields.price_ms),
            owner: fields.owner,
            tags: ["RPC"],
            is_verified: isVerified(obj.data?.objectId || ""),
          };
        })
        .filter((s): s is Service => s !== null);
    },
    refetchInterval: 10000,
  });
}
