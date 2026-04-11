"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser && pathname !== "/login") {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-brand-light font-sans text-black">
        {loading ? (
         
          <div className="flex items-center justify-center min-h-screen font-bold text-brand-brown animate-pulse text-xl">
            HustleHub...
          </div>
        ) : (
          /* ACTUAL APP CONTENT */
          <>
            {/* TOP NAVBAR */}
            <nav className="flex justify-between items-center px-8 py-4 bg-brand-light border-b border-brand-cream sticky top-0 z-50">
              <div className="flex items-center gap-10">
                <Link href="/" className="text-2xl font-bold text-brand-brown tracking-tighter">
                  HustleHub
                </Link>
                {user && (
                  <div className="hidden md:flex gap-8 text-[11px] font-medium uppercase tracking-[0.15em] text-black">
                    <Link href="/all-tasks" className="hover:text-brand-brown transition">All Tasks</Link>
                    <Link href="/all-users" className="hover:text-brand-brown transition">All Users</Link>
                    <Link href="/my-tasks" className="hover:text-brand-brown transition">My Tasks</Link>
                    <Link href="/my-profile" className="hover:text-brand-brown transition">Profile</Link>
                    <Link href="/reviews" className="hover:text-brand-brown transition">Review</Link>
                  </div>
                )}
              </div>
              
              <Link href={user ? "/settings" : "/login"}>
                <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white cursor-pointer shadow-md hover:scale-110 transition-transform active:scale-95 border-2 border-transparent hover:border-brand-brown" title="Account">
                  {user ? user.email[0].toUpperCase() : "👤"}
                </div>
              </Link>
            </nav>

            <div className="flex flex-1">
              {/* SIDEBAR */}
              {user && isHomePage && (
                <aside className="w-72 border-r border-brand-cream p-8 space-y-10 hidden lg:block">
                  <div>
                    <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4 opacity-50">User Account</h3>
                    <div className="bg-white p-5 rounded-2xl border border-brand-cream shadow-sm mb-10">
                      <p className="text-[11px] font-semibold text-black mb-3 leading-tight truncate">{user.email}</p>
                      <div className="w-full bg-brand-light rounded-full h-2">
                        <div className="bg-brand-brown h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4 opacity-50">Top Categories</h3>
                    <nav className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-medium text-black cursor-pointer hover:text-brand-brown transition">
                        <span>Coding</span>
                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-black/5">124</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium text-black cursor-pointer hover:text-brand-brown transition">
                        <span>Graphic Design</span>
                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-black/5">89</span>
                      </div>
                    </nav>
                  </div>
                </aside>
              )}

              <main className={`flex-1 p-10 bg-brand-light ${!isHomePage ? 'flex justify-center' : ''}`}>
                <div className={isHomePage ? "max-w-5xl w-full" : "w-full max-w-7xl"}>
                  {children}
                </div>
              </main>
            </div>
          </>
        )}
      </body>
    </html>
  );
}