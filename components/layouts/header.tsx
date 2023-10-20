"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  RiShoppingCartLine,
  RiMessage3Line,
  RiNotification4Line,
} from "react-icons/ri";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface currentUserProps {
  currentUser?: User | null;
}

export default function Header(props: currentUserProps) {
  const { currentUser } = props;

  console.log(currentUser);

  return (
    <nav
      className={`fixed flex items-center justify-end sm:justify-between w-full py-4 px-4 h-18 gap-6`}
    >
      <div className="hidden sm:flex items-center gap-8">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="flex items-center justify-center gap-4 w-full sm:w-6/12">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          {/* <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList> */}
        </Command>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Button variant="ghost" className="p-0">
            <RiNotification4Line size={24} />
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="p-0">
            <RiMessage3Line size={24} />
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="p-0">
            <RiShoppingCartLine size={24} />
          </Button>
        </li>
      </ul>
      <div className="hidden sm:flex items-center gap-4">
        {currentUser ? (
          <>
            <Avatar>
              <AvatarImage
                src={currentUser?.image || "https://github.com/shadcn.png"}
              />
            </Avatar>
          </>
        ) : (
          // <Button
          //   variant="default"
          //   className="w-full"
          //   onClick={() => signOut()}
          // >
          //   Keluar
          // </Button>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="w-full">
              <Button variant="outline" className="w-full">
                Masuk
              </Button>
            </Link>
            <Link href="/sign-up" className="w-full">
              <Button variant="default" className="w-full">
                Daftar
              </Button>
            </Link>
          </div>
        )}
      </div>
      <ul className="flex sm:hidden items-center gap-8">
        <li className="flex items-center gap-2">
          <Sheet key={"bottom"}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0">
                <RxHamburgerMenu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"} className="h-full w-full">
              <SheetHeader>
                <SheetTitle>Menu Utama</SheetTitle>
              </SheetHeader>
              {currentUser ? (
                <div className="flex flex-col gap-8 mt-6">
                  <div className="flex gap-4 items-center">
                    <Avatar className={cn("h-16 w-16")}>
                      <AvatarImage
                        src={
                          currentUser?.image || "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold">{currentUser.name}</h3>
                      <p className="text-sm text-gray-500">
                        {currentUser.email}
                      </p>
                      <p className="text-sm text-gray-500">5000 poin</p>
                    </div>
                  </div>
                  {/* <h5 className="text-lg font-semibold">{`hello ${currentUser.name} !`}</h5> */}
                  <Button variant="default" onClick={() => signOut()}>
                    Keluar
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 mt-4">
                  <Link href="/sign-in" className="w-full">
                    <Button variant="outline" className="w-full">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/sign-up" className="w-full">
                    <Button variant="default" className="w-full">
                      Daftar
                    </Button>
                  </Link>
                </div>
              )}
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant={"ghost"}></Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}
