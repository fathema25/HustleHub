"use client";
import { useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState({
    name: "Fathema Begum Ema",
    school: "Southern Alberta Institute of Technology",
    major: "Software Development",
    rating: 5.0,
    completed: 24,
    skills: ["React", "Next.js", "Java", "SQL", "Tailwind"],
    bio: "Full-stack software developer in training. I specialize in building clean, high-performance web applications and solving complex logic problems.",
  });

  const [tempBio, setTempBio] = useState(user.bio);

  const handleSave = () => {
    setUser({ ...user, bio: tempBio });
    setIsEditing(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    alert("Logout successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen relative">

      {/* HEADER */}
      <header className="mb-12 flex justify-between items-end">
        <h1 className="text-6xl font-normal text-black tracking-tight">
          My <span className="text-brand-brown italic font-bold underline decoration-brand-brown underline-offset-8">Profile</span>
        </h1>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="px-8 py-3 rounded-full border-2 border-brand-brown text-[10px] font-black text-brand-brown hover:bg-brand-brown hover:text-white transition-all tracking-widest shadow-sm"
        >
          LOGOUT
        </button>
      </header>

      {/* MAIN PROFILE CARD */}
      <div className="bg-white rounded-[80px] border-[6px] border-brand-brown/20 p-12 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-start">

          {/* LEFT SIDE: Identity */}
          <div className="w-full lg:w-1/3 text-center lg:border-r border-brand-brown/10 lg:pr-16">
            <div className="w-40 h-40 bg-brand-brown/5 border-4 border-brand-brown rounded-full mx-auto mb-8 flex items-center justify-center text-5xl font-bold text-brand-brown shadow-inner">
              {user.name.charAt(0)}
            </div>

            <h2 className="text-4xl font-black text-black tracking-tight leading-none mb-2">{user.name}</h2>
            <p className="text-brand-brown font-bold italic text-lg">{user.major}</p>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black opacity-30 mt-4 leading-relaxed">
              {user.school}
            </p>

            <div className="mt-10 bg-brand-brown/10 p-6 rounded-[40px] border border-brand-brown/20">
              <p className="text-[10px] font-black text-brand-brown opacity-60 uppercase tracking-widest mb-1">Rating</p>
              <p className="text-3xl font-black text-brand-brown">★ {user.rating}</p>
            </div>
          </div>

          {/* RIGHT SIDE: Skills & Bio */}
          <div className="w-full lg:w-2/3 space-y-10">
            <div>
              <h3 className="text-[11px] font-black text-black uppercase tracking-widest opacity-40 mb-4">My Skill Stack</h3>
              <div className="flex flex-wrap gap-3">
                {user.skills.map(skill => (
                  <span key={skill} className="bg-brand-brown text-white px-6 py-2 rounded-full text-[11px] font-bold tracking-tight shadow-md shadow-brand-brown/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-black text-black uppercase tracking-widest opacity-40">The Bio</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-[10px] font-black text-brand-brown flex items-center gap-2 hover:underline tracking-widest"
                  >
                    ✎ EDIT BIO
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="w-full bg-brand-brown/5 p-8 rounded-[40px] border-2 border-brand-brown outline-none text-[15px] text-black font-medium leading-relaxed italic h-40 resize-none shadow-inner"
                />
              ) : (
                <div className="bg-brand-brown/5 p-8 rounded-[40px] border-l-4 border-brand-brown">
                  <p className="text-[15px] text-black font-medium leading-relaxed italic">
                    "{user.bio}"
                  </p>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="w-full bg-brand-brown text-white py-6 rounded-full font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-brand-brown/20"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => { setIsEditing(false); setTempBio(user.bio); }}
                  className="w-full mt-4 text-[10px] font-black text-brand-brown opacity-40 hover:opacity-100 transition-all tracking-widest"
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOGOUT OVERLAY */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center pb-20 px-10"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="relative w-full max-w-[750px] bg-white rounded-[60px] shadow-2xl border-4 border-brand-brown p-12 animate-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-6 right-8 w-10 h-10 bg-brand-brown/5 rounded-full flex items-center justify-center text-black font-bold hover:bg-brand-brown/10 transition-all z-20"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Left Side */}
              <div className="w-full md:w-[40%] text-center md:border-r border-brand-brown/10 md:pr-10">
                <div className="w-24 h-24 bg-brand-brown text-white rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold shadow-lg shadow-brand-brown/20">
                  !
                </div>
                <h2 className="text-3xl font-bold text-black tracking-tight leading-tight">Logging Out?</h2>
                <p className="text-brand-brown font-bold italic text-sm mt-1 opacity-60">We'll miss you!</p>
              </div>

              {/* Right Side */}
              <div className="w-full md:w-[60%] space-y-6">
                <div>
                  <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">Confirmation</h3>
                  <p className="text-[15px] text-black font-medium leading-relaxed italic border-l-2 border-brand-brown/20 pl-4">
                    "Are you sure you want to log out? You will need to sign back in to continue managing your tasks and profile."
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-brand-brown text-white py-5 rounded-full font-bold text-sm tracking-widest hover:scale-[1.01] active:scale-[0.98] transition-all shadow-lg shadow-brand-brown/20"
                  >
                    YES, LOGOUT
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full py-4 rounded-full border-2 border-brand-brown/10 text-[10px] font-black text-brand-brown/40 hover:text-brand-brown hover:border-brand-brown/30 transition-all tracking-widest"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}