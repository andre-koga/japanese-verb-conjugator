"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LightSwitch from "@/components/LightSwitch";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header>
      <p className="bg-destructive/60 text-destructive-foreground px-2 py-1.5 text-center text-sm">
        This app is still under development!
      </p>
      <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/favicon.svg" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold">日本語動詞活用練習</span>
            </Link>
            <div className="flex items-center gap-1">
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm">
                <Link href="/">Practice</Link>
              </Button>
              <Button
                variant={isActive("/jlpt/n5") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/jlpt/n5">N5</Link>
              </Button>
              <Button
                variant={isActive("/jlpt/n4") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/jlpt/n4">N4</Link>
              </Button>
              <Button
                variant={isActive("/jlpt/n3") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/jlpt/n3">N3</Link>
              </Button>
              <Button
                variant={isActive("/jlpt/n2") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/jlpt/n2">N2</Link>
              </Button>
              <Button
                variant={isActive("/jlpt/n1") ? "default" : "ghost"}
                size="sm"
              >
                <Link href="/jlpt/n1">N1</Link>
              </Button>
              <div className="w-1" />
              <LightSwitch />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
