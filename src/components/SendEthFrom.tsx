'use client'

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { Address, isAddress, parseGwei } from 'viem';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { waitForTransactionReceipt } from 'wagmi/actions';
import { config } from '@/utils/config';
import { toast } from 'sonner';


export const SentEthForm = () => {
    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isSendTxPending, setIsSendTxPending] = useState<boolean>(false);
    const { address, chainId } = useAccount();
    const { data: userBalance, refetch: refetchUserBalance } = useBalance({
        address,
        chainId,
        query: {
            enabled: !!address
        }
    });
    const [recipientAddress, setRecipientAddress] = useState<Address | string | null>(null);
    const { data: hash, isPending: isSendPending, sendTransactionAsync } = useSendTransaction();

    if (!address) {
        return (
            <Alert className="w-full items-center justify-center text-center gap-3">
                <AlertTitle className='text-red-400 text-center mb-3 text-xl'>
                    Please Connect Wallet
                </AlertTitle>
                <div className='flex justify-center w-full'>
                    <ConnectButton />
                </div>
                <AlertDescription className='mt-1 text-base'>Connect your wallet to view your balance.</AlertDescription>
            </Alert>
        );
    }


    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        let toastId;
        if (!amount || !recipientAddress || !isAddress(address!)) {
            setError("Please enter valid recipient address.");
            return;
        }
        if (parseFloat(amount) > parseFloat(userBalance?.formatted ?? "0")) {
            setError("Insufficient balance.");
            return;
        }
        setIsSendTxPending(true);
        try {
            toastId = toast.loading('Transactoion is being processing...');
            const txHash = await sendTransactionAsync({
                value: parseGwei(amount),
                account: address,
                to: recipientAddress as Address,
            });
            //lets wait for the transaction to be mined before displaying the result
            const txResult = await waitForTransactionReceipt(config, {
                hash: hash! || txHash!,
                retryCount: 100,
                retryDelay: 1000,
                timeout: 100000,
            })
            if (txResult?.status === "success") {
                await refetchUserBalance()
                toast.success("Transaction Successful!");
                setSuccess(true);
                setIsSendTxPending(false);
                setRecipientAddress(null)
                toast.dismiss(toastId);
                return;
            }
            setError("Transaction Failed!");
            toast.error('Transaction Failed!');
            setIsSendTxPending(false)
            setRecipientAddress(null)
            setSuccess(false);
            toast.dismiss(toastId);
            return;
        } catch (error) {
            setError("An error occurred while sending the transaction.");
            setSuccess(false);
            toast.error('An error occurred while sending the transaction.');
        }
        setIsSendTxPending(false);
        setRecipientAddress(null)
        toast.dismiss(toastId);

    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Send ETH</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Label htmlFor="balance">Your Balance</Label>
                    <Input id="balance" value={`${userBalance?.formatted ?? "0"} ETH`} disabled />
                </div>
                <form onSubmit={handleSend} className="space-y-4">
                    <div>
                        <Label htmlFor="address">Recipient Address</Label>
                        <Input
                            id="recipient Address"
                            placeholder="0x..."
                            value={recipientAddress ?? ""}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="amount">Amount (ETH)</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.0001"
                            placeholder="0.1"
                            min={"0"}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={!address || isSendPending || isSendTxPending}>Send ETH</Button>
                </form>
                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {success && (
                    <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription className='text-green-500'>Transaction of amount {amount} ETH sent successfully!</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default SentEthForm;