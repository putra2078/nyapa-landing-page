"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dynamic header based on path
  let headerTitle = "Dashboard";
  let headerSubtitle = "Overview";

  if (pathname?.includes("/cms/artikel/create")) {
    headerTitle = "Posts";
    headerSubtitle = "Create Article";
  } else if (pathname?.includes("/cms/artikel")) {
    headerTitle = "Posts";
    headerSubtitle = "List Content";
  } else if (pathname === "/cms") {
    headerTitle = "Dashboard";
    headerSubtitle = "Overview";
  }

  const isDashboard = pathname === "/cms";
  const isArtikel = pathname?.includes("/cms/artikel") ?? false;
  const isTags = pathname?.includes("/cms/tag-artikel") ?? false;

  return (
    <div className="flex h-screen bg-[#f4f5f7] font-sans overflow-hidden text-sm">
      {/* 1. Leftmost Dark Sidebar */}
      <div className="w-[80px] bg-[#1a1c23] flex flex-col items-center py-4 text-gray-400 border-r border-[#2a2c35] flex-shrink-0">
        {/* Logo */}
        <div className="mb-8 text-white">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 w-full space-y-2">
          <Link href="/cms">
            <NavItem
              icon={
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  strokeWidth="2"
                />
              }
              label="Dashboard"
              active={isDashboard}
            />
          </Link>
          <Link href="/cms/artikel">
            <NavItem
              icon={
                <>
                  <path
                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                    strokeWidth="2"
                  />
                  <path
                    d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                    strokeWidth="2"
                  />
                </>
              }
              label="Content"
              active={isArtikel || isTags}
            />
          </Link>
        </nav>

        {/* Bottom Nav */}
        <div className="w-full">
          <NavItem
            icon={
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                strokeWidth="2"
              />
            }
            label="Logout"
          />
        </div>
      </div>

      {/* 2. Secondary White Sidebar */}
      <div className="w-[240px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Blog Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-gray-900 text-base">CMS Nyapa</h2>
            <p className="text-xs text-gray-500">Content Management System</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        {/* Content Header section */}
        <div className="p-4 flex justify-between items-center text-gray-800 font-semibold text-sm">
          <span>Content</span>
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Menu List */}
        <div className="flex-1 overflow-y-auto pb-4">
          <ul className="space-y-1 px-2">
            <Link href="/cms">
              <SidebarLink label="Dashboard" active={isDashboard} />
            </Link>
            <Link href="/cms/artikel">
              <SidebarLink label="Posts" active={pathname === "/cms/artikel"} />
            </Link>
            <Link href="/cms/artikel/create">
              <SidebarLink
                label="Create Article"
                active={pathname === "/cms/artikel/create"}
              />
            </Link>
            <Link href="/cms/tag-artikel">
              <SidebarLink
                label="Tags"
                active={pathname === "/cms/tag-artikel"}
              />
            </Link>
          </ul>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
        {/* Top Navbar Header */}
        <header className="bg-white border-b border-gray-200 h-14 w-full flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center text-gray-800">
            <span className="font-bold text-lg">{headerTitle}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">{headerSubtitle}</span>
          </div>
          {/* Dynamic injected actions based on path */}
          {pathname?.includes("/cms/artikel/create") && (
            <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center">
              Save
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </header>

        {/* Scrollable Content Workspace */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`w-full flex-col items-center justify-center py-3 cursor-pointer group flex relative ${active ? "bg-[#2a2c35] text-white" : "hover:text-white"}`}
    >
      <div className="mb-1 opacity-80 group-hover:opacity-100 flex items-center justify-center w-6 h-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <span className="text-[10px] lowercase">{label}</span>
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 rounded-r"></div>
      )}
    </div>
  );
}

function SidebarLink({
  label,
  active = false,
  icon,
}: {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <li
      className={`flex items-center px-4 py-2 rounded-md cursor-pointer text-sm ${active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
    >
      {icon}
      {label}
    </li>
  );
}
