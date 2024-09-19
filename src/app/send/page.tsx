import SentEthForm from "@/components/SendEthFrom";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Send ETH - Ethereum Minimal App",
    description: "Send Ethereum Ether (ETH) to any Ethereum address using your wallet."
}

const SendEthPage = () => {
    return (
        <main className="w-full flex justify-center items-center">
            <div className="flex w-[32rem] flex-col justify-start ">
                <h1 className="text-center  mb-3 text-pretty text-xl font-mono ">Send ETH from Your Account</h1>
                {/* Send ETH form */}
                <SentEthForm />
            </div>
        </main>
    )
}

export default SendEthPage;