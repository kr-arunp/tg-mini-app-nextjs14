# ETH Telegram Mini App 

## Getting Started

This repo helps you create a mini application integrated with Ethereum and Telegram. Follow the steps below to set up and run the project.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Setup Guide

1. **Clone the repository or click on the "Use this template" button:**

   ```bash
   git clone https://github.com/HAPPYS1NGH/tg-mini-app-nextjs
   ```

2. **Navigate to the project directory:**

   ```bash
   cd tg-mini-app-nextjs
   ```

3. **Create a `.env.local` file in the root directory and copy the contents of `.env.sample`:**

   - Obtain the WalletConnect project ID from [WalletConnect](https://cloud.walletconnect.com/).

   - Make sure to select the App Kit.

   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_wallet_connect_project_id>
   ```

   - According change the other environment details to development or production.

4. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   or using yarn:

   ```bash
   yarn install
   ```

5. **Start the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   or using yarn:

   ```bash
   yarn dev
   ```

6. **Open your web browser and navigate to `http://localhost:3000` to view the application.**

### Exposing Your Local Server

To test your application within Telegram, you need to expose your local server using a tunneling service like ngrok or localtunnel.

**Start the development server:**

Using npm:

```bash
npm run expose
```

or using yarn:

```bash
yarn expose
```

**Alternatively:**

You can always use ngrok or any proxy service to expose the endpoint.

### Registering Your Bot on Telegram

1. **Open Telegram and search for `BotFather`.**

2. **Register a new bot by using the /newbot command and follow the prompts to choose a name and username.**

3. **While in BotFather, use the /setmenubutton command (It may not autocomplete).**

4. **Click on the bottom right square to choose the bot**
   ![Selecting the Bot](/src/assets/botfather-tut1.png?raw=true)

5. **Paste the URL for your App in which will be LocalTunnel's during development.**

6. **Set the name of the button which will be used to start the mini app.**

7. **Go to the Bot and now you can see a small button next to the chat which will bring up the Mini App.**

8. **Repeat the steps 3-7 when you have the production URL.**

## Interacting with Contracts

This starter kit provides hooks from Wagmi v2 for interacting with smart contracts on the Arbitrum network. You can use these hooks to read and write data to contracts.

## Directory Structure

The project follows a standard directory structure for a Next.js application. Here's an overview:

```
.
├── README.md
├── components.json
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── arbitrum.svg
│   ├── arrow.svg
│   ├── butterfly.svg
│   ├── loader.svg
│   └── rabble.svg
├── src
│   ├── app
│   │   ├── contract
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── assets
│   │   └── Arrow.tsx
│   ├── components
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── Popup.tsx
│   │   ├── shared
│   │   │   └── Navbar.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── sonner.tsx
│   ├── constants
│   │   ├── abi.ts
│   │   └── index.ts
│   ├── containers
│   │   ├── contract
│   │   │   ├── ReadContract.tsx
│   │   │   └── WriteContract.tsx
│   │   └── home
│   │       └── Profile.tsx
│   ├── hooks
│   │   ├── useClientOnce.ts
│   │   ├── useDidMount.ts
│   │   └── useTelegramMock.ts
│   ├── lib
│   │   └── utils.ts
│   ├── providers
│   │   ├── Layout.tsx
│   │   ├── TelegramProvider.tsx
│   │   └── Web3Provider.tsx
│   └── utils
│       └── config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## FAQs

### What are Telegram Mini Apps?

Web Apps inside Telegram in the form of a bot.

### What is different in Mini Apps?

Mini Apps offer Telegram-specific UI elements like Main Button, Popups, Telegram Theme Params, and Viewport. They also provide features like Telegram Authentication, Cloud Storage, and more.

