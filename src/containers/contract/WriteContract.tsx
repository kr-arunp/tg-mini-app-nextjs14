"use client";
import * as React from "react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { toast } from "sonner";

import { counterAbi } from "@/constants/abi";
import { counterAddress } from "@/constants";

export function WriteContract() {
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("value") as string;
    console.log(tokenId);
    writeContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: "setNumber",
      args: [BigInt(tokenId)],
    });
  }

  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction Successful");
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirmed, error]);

  return (
    <form onSubmit={submit}>
      <p className=" text-gray-500 text-lg">
        Make this counter your favorite number
      </p>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
        <Input
          name="value"
          placeholder="14"
          type="number"
          required
          className="bg-slate-100 text-gray-600 rounded-full  bg-card text-base p-5"
        />
        <Button
          disabled={isPending || isConfirming}
          type="submit"
          variant={"default"}
          className="rounded-2xl text-base"
          size={"lg"}
        >
          {isPending ? "Confirming..." : "Set Number"}
        </Button>
      </div>
    </form>
  );
}
