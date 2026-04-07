"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // The sidebar will ONLY appear on the root homepage
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-brand-light font-sans text-black">
        {/* TOP NAVBAR */}
        <nav className="flex justify-between items-center px-8 py-4 bg-brand-light border-b border-brand-cream sticky top-0 z-50">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-bold text-brand-brown tracking-tighter">
              HustleHub
            </Link>
            <div className="hidden md:flex gap-8 text-[11px] font-medium uppercase tracking-[0.15em] text-black">
              <Link href="/all-tasks" className="hover:text-brand-brown transition">All Tasks</Link>
              <Link href="/all-users" className="hover:text-brand-brown transition">All Users</Link>
              <Link href="/my-tasks" className="hover:text-brand-brown transition">My Tasks</Link>
              <Link href="/my-profile" className="hover:text-brand-brown transition">Profile</Link>
              <Link href="/reviews" className="hover:text-brand-brown transition">Review</Link>
            </div>
          </div>
          <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white cursor-pointer shadow-md">
            👤
          </div>
        </nav>

        <div className="flex flex-1">
          {/* SIDEBAR - Only rendered on the Home Page */}
          {isHomePage && (
            <aside className="w-72 border-r border-brand-cream p-8 space-y-10 hidden lg:block">
              {/* Campus Hustler Section */}
              <div>
                <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4 opacity-50">
                  Campus Hustler
                </h3>
                <div className="bg-white p-5 rounded-2xl border border-brand-cream shadow-sm mb-10">
                  <p className="text-[11px] font-semibold text-black mb-3 leading-tight">
                    You've completed 4 tasks this week. Reach 5 for a bonus!
                  </p>
                  <div className="w-full bg-brand-light rounded-full h-2">
                    <div
                      className="bg-brand-brown h-2 rounded-full"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Top Categories Section */}
              <div>
                <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-4 opacity-50">
                  Top Categories
                </h3>
                <nav className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-medium text-black cursor-pointer hover:text-brand-brown transition">
                    <span>Coding</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-black/5">124</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-black cursor-pointer hover:text-brand-brown transition">
                    <span>Graphic Design</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-black/5">89</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-black cursor-pointer hover:text-brand-brown transition">
                    <span>Tutoring</span>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-black/5">42</span>
                  </div>
                </nav>
              </div>

              {/* Quick Tip Section */}
              <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
                <p className="text-[9px] font-bold text-yellow-800 uppercase mb-2 tracking-wider">
                  💡 Quick Tip
                </p>
                <p className="text-[11px] text-black font-normal leading-relaxed">
                  Mention your specific <span className="text-brand-brown font-bold underline underline-offset-2">SAIT course</span> to get more responses!
                </p>
              </div>
            </aside>
          )}

          {/* MAIN CONTENT */}
          <main className={`flex-1 p-10 bg-[#fdfaf7] ${!isHomePage ? 'flex justify-center' : ''}`}>
            {/* If it's not the home page, we use a wider container to make the profile/tasks look better */}
            <div className={isHomePage ? "max-w-5xl" : "w-full max-w-7xl"}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}