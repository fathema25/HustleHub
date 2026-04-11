"use client";

import { auth, db } from "@/firebase";
import { signOut, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth.currentUser) {
        setCurrentUser(auth.currentUser);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will delete your account forever. This cannot be undone."
    );

    if (confirmDelete) {
      try {
        const user = auth.currentUser;
        if (user) {
          // Remove users data from Firestore
          await deleteDoc(doc(db, "users", user.uid));
          // Remove them from Auth
          await deleteUser(user);
          router.push("/login");
        }
      } catch (error) {
        alert("For security, please log out and back in before deleting your account.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pt-10 pb-20 flex flex-col items-start px-4">
      {/* HEADER SECTION */}
      <div className="mb-10 text-left w-full">
        <h1 className="text-5xl font-black text-black leading-none uppercase tracking-tighter">Settings</h1>
        <p className="text-[11px] font-black text-brand-brown opacity-60 uppercase tracking-[0.2em] mt-2 ml-1">
          Manage your account
        </p>
      </div>
      
      {/* MAIN SETTINGS CARD */}
      <div className="w-full bg-white p-10 rounded-[60px] border-4 border-brand-cream space-y-8 shadow-2xl shadow-brand-brown/10">
        <div className="space-y-1">
          <label className="text-[10px] font-black opacity-30 uppercase tracking-widest ml-4">
            Logged in as
          </label>
          <p className="font-bold text-lg text-black px-4 truncate">
            {currentUser?.email || "Loading..."}
          </p>
        </div>

        <div className="pt-4 space-y-6">
          {/* SIGN OUT BUTTON */}
          <button 
            onClick={handleSignOut}
            className="w-full bg-brand-brown text-white py-5 rounded-full font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-brand-brown/20 uppercase tracking-widest"
          >
            Sign Out
          </button>

          {/* DELETE ACCOUNT BUTTON */}
          <button 
            onClick={handleDeleteAccount}
            className="w-full py-2 text-red-500 font-bold text-[11px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity hover:underline"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* BACK NAVIGATION */}
      <div className="mt-10 w-full text-center">
        <button 
          onClick={() => router.push("/")}
          className="text-[10px] font-black opacity-70 uppercase tracking-widest hover:opacity-100 transition-opacity"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}