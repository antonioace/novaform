"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/ui/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/ui/sidebar-layout";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";

import { usePathname } from "next/navigation";
import {
  NavigationSection,
  NavigationItem as NavItem,
} from "@/config/navigation";
import { useState } from "react";

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
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
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

function NavigationItem({
  item,
  current,
  pathname,
}: {
  item: NavItem;
  current: boolean;
  pathname?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  if (!hasChildren) {
    return (
      <SidebarItem href={item.href} current={current}>
        <Icon />
        <SidebarLabel>{item.name}</SidebarLabel>
      </SidebarItem>
    );
  }

  return (
    <>
      <SidebarItem
        as="button"
        onClick={() => setIsOpen(!isOpen)}
        current={current}
      >
        <Icon />
        <SidebarLabel>{item.name}</SidebarLabel>
        <ChevronDownIcon
          className={`ml-auto h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </SidebarItem>
      {isOpen && (
        <div className="ml-4 space-y-1">
          {item.children?.map((child) => (
            <NavigationItem
              key={child.href}
              item={child}
              current={pathname === child.href}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function ApplicationLayout({
  children,
  footer,
  mainNavigation,
  expandable = false,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  mainNavigation: NavigationSection[];
  expandable?: boolean;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar
          className={
            isExpanded
              ? `transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`
              : undefined
          }
        >
          <SidebarHeader>
            {expandable && (
              <NavbarSection>
                <NavbarItem
                  as="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Bars3Icon className="h-5 w-5" />
                </NavbarItem>
              </NavbarSection>
            )}

            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="https://images.squarespace-cdn.com/content/v1/6788d438405dc03eabea6c99/1737020479975-V3ZE94TGRALPK7D15TNY/image-asset.png" />
                <SidebarLabel>Tony dashboard</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <Avatar
                    slot="icon"
                    initials="BE"
                    className="bg-purple-500 text-white"
                  />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            {mainNavigation.map((section, index) => (
              <SidebarSection key={index}>
                {section.title && (
                  <SidebarHeading>{section.title}</SidebarHeading>
                )}
                {section.items.map((item) => (
                  <NavigationItem
                    key={item.href}
                    item={item}
                    current={
                      pathname === item.href ||
                      (item.children?.some(
                        (child) => pathname === child.href
                      ) ??
                        false)
                    }
                    pathname={pathname || null}
                  />
                ))}
              </SidebarSection>
            ))}
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">{footer}</SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
