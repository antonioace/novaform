"use client";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownDivider,
} from "@/components/ui/dropdown";
import { Dropdown } from "@/components/ui/dropdown";
import { SidebarItem } from "@/components/ui/sidebar";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { useAuth } from "@/contexts/AuthContext";
function Footer() {
  const { logout } = useAuth();
  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        <span className="flex min-w-0 items-center gap-3">
          <Avatar src="/users/erica.jpg" className="size-10" square alt="" />
          <span className="min-w-0">
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
              Erica
            </span>
            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
              erica@example.com
            </span>
          </span>
        </span>
        <ChevronUpIcon />
      </DropdownButton>
      <DropdownMenu className="min-w-64" anchor={"top start"}>
        <DropdownItem href="#">
          <UserCircleIcon />
          <DropdownLabel>My account</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="#">
          <ShieldCheckIcon />
          <DropdownLabel>Privacy policy</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="#">
          <LightBulbIcon />
          <DropdownLabel>Share feedback</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="#" onClick={logout}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
      {/*     <AccountDropdownMenu anchor="top start" /> */}
    </Dropdown>
  );
}

export default Footer;
