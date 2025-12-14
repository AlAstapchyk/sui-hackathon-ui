"use client";

import { useCurrentAccount } from "@mysten/dapp-kit";
import { useState, useEffect, useCallback } from "react";

export interface User {
  address: string;
  nickname: string;
  name: string;
  createdAt: Date;
}

interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  isRegistered: boolean;
  error: string | null;
  register: (nickname?: string, name?: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserResult {
  const account = useCurrentAccount();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to prevent flash
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!account?.address) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users?address=${account.address}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        setError(data.error || "Failed to fetch user");
      }
    } catch (err) {
      setError("Network error");
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  }, [account?.address]);

  const register = useCallback(
    async (nickname?: string, name?: string): Promise<boolean> => {
      if (!account?.address) {
        setError("No wallet connected");
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: account.address,
            nickname,
            name,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          return true;
        } else {
          setError(data.error || "Failed to register");
          return false;
        }
      } catch (err) {
        setError("Network error");
        console.error("Error registering user:", err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [account?.address]
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    isLoading,
    isRegistered: !!user,
    error,
    register,
    refetch: fetchUser,
  };
}
