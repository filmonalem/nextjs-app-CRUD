"use client";
import { locales } from "@/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative inline-block px-4">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
        onClick={toggleDropdown}
        className="px-4  rounded-md"
      >
        <span className="sr-only">Toggle Language</span>
        <span className="text-sm font-medium">Language</span>
      </button>

      {isOpen && (
        <ul className=" absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {locales.map((locale) => {
            const newPath = `/${locale}${pathname.substring(3)}`;
            return (
              <li key={locale} className="px-4 py-2 hover:bg-blue-100">
                <Link href={newPath} className="block text-sm text-black">
                  {locale}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

