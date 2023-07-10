"use client";

import useAuth from "@/hooks/useAuth";
import { isLoggedIn } from "@/services/auth";
import Link from "next/link";

export default function Navbar() {
  const { signOut } = useAuth();

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link href="/" className="border-white border-b border-dashed">
        Home
      </Link>
      {isLoggedIn() ? (
        <Link
          href="/signup"
          onClick={signOut}
          className="border-white border-b border-dashed"
        >
          Sign Out
        </Link>
      ) : (
        <button className="border-white border-b border-dashed">Sign Up</button>
      )}
    </nav>
  );
}
