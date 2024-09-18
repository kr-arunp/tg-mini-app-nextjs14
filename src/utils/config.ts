import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  compassWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { cookieStorage, createStorage } from "wagmi"
import {
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
} from "wagmi/chains"

const { wallets } = getDefaultWallets()

export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn(
    "You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  )
}
export const config = getDefaultConfig({
  appName: "RainbowKit",
  projectId: WALLETCONNECT_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet, compassWallet,],
    },
  ],
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [sepolia, optimismSepolia, polygonAmoy]
      : [mainnet, optimism, polygon]),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
    key: "tg-mini-app-nextjs"
  })
})
