"use client";
import { useState } from 'react';
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from "lucide-react"; 

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: name,
          email: email,
          createdAt: serverTimestamp(),
          revenue: 0,
          completedTasks: 0,
          type: "worker"
        });
      }
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email address first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-4 border-brand-cream rounded-[60px] p-10 shadow-2xl shadow-brand-brown/5">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-black tracking-tight mb-2">Hustle<span className="text-brand-brown italic">Hub</span></h1>
          <p className="text-xs font-bold text-brand-brown uppercase tracking-widest opacity-60">{isLogin ? "Access your account" : "Join the marketplace"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-4">Full Name</label>
              <input type="text" placeholder="Alex Rivera" className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-3xl px-6 py-4 text-sm outline-none focus:border-brand-brown transition-all" required onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-4">Email Address</label>
            <input type="email" placeholder="name@example.com" className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-3xl px-6 py-4 text-sm outline-none focus:border-brand-brown transition-all" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-4 flex justify-between">
              Password
              {isLogin && <button type="button" onClick={handleForgotPassword} className="hover:underline lowercase font-bold text-brand-brown">Forgot?</button>}
            </label>
            <div className="relative flex items-center">
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-3xl pl-6 pr-14 py-4 text-sm outline-none focus:border-brand-brown transition-all" required onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 text-black/30 hover:text-brand-brown transition-colors">
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-brand-brown text-white py-5 rounded-full font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-brand-brown/20 mt-4">
            {isLogin ? "Sign In" : "Get Started"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-xs font-bold text-black opacity-40 hover:opacity-100 transition-opacity underline underline-offset-4">
            {isLogin ? "New to HustleHub? Create an account" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}