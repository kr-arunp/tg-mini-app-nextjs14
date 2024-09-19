"use client";
import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="mx-3 my-4">
      <div className="flex items-end">
        <Link  href="/" className="flex justify-center items-center gap-3">
          <Image src="/eth.svg" alt="Eth" width={52.8} height={21.6} />
          <h1 className="md:text-xl text-base font-semibold italic">TG Mini App</h1>
        </Link>
        <div className="ml-auto flex items-center ">
          <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
        </div>
      </div>
      <hr className="bg-black my-2" />
      <div className="flex space-x-4 ">
        <Link
          href="/"
          className={`${pathname == "/" ? "text-cyan-400" : "text-color  hover:text-cyan-400/90"
            } `}
        >
          Home
        </Link>
        <Link
          href="/send"
          className={`${pathname == "/send"
              ? "text-cyan-400"
              : "text-color hover:text-cyan-400/90"
            } `}
        >
          Send
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
