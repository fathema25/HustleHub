"use client";
import { useState } from 'react';

export default function AllUsers() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "Anthony Ogamba",
      school: "Tech University",
      major: "Software Development",
      rating: 4.9,
      completed: 12,
      skills: ["React", "Node.js", "SQL"],
      status: "Available",
      bio: "Full-stack dev specializing in rapid prototyping. I love solving logic puzzles."
    },
    {
      id: 2,
      name: "Sarah Chen",
      school: "City Arts College",
      major: "New Media Production",
      rating: 5.0,
      completed: 8,
      skills: ["Figma", "Branding", "UI/UX"],
      status: "Busy",
      bio: "Helping students turn their basic wireframes into pixel-perfect designs."
    },
    {
      id: 3,
      name: "Stephen Noh",
      school: "State Business School",
      major: "Business Admin",
      rating: 4.7,
      completed: 15,
      skills: ["Tutoring", "Excel", "Finance"],
      status: "Available",
      bio: "Need help crushing your Accounting midterms? I have the spreadsheets to help."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto relative">
      <header className="mb-12">
        <h1 className="text-6xl font-normal text-black tracking-tight">
          Top <span className="text-brand-brown italic font-bold underline decoration-brand-cream underline-offset-8">Hustlers</span>
        </h1>
      </header>

      {/* User List */}
      <div className="grid grid-cols-1 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white p-6 pl-10 pr-10 rounded-[80px] border-2 border-brand-cream hover:border-brand-brown/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="flex items-center gap-6 min-w-75">
              <div className="w-20 h-20 bg-brand-light border-2 border-brand-cream rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black tracking-tight">{user.name}</h2>
                <p className="text-xs font-bold text-brand-brown italic">{user.major}</p>
              </div>
            </div>

            <div className="flex-1 border-x border-brand-cream/50 px-8 hidden lg:block">
              <p className="text-sm text-black font-medium italic mb-3">"{user.bio}"</p>
              <div className="flex gap-2">
                {user.skills.slice(0, 2).map(skill => (
                  <span key={skill} className="bg-brand-light px-3 py-1 rounded-full text-[10px] font-bold text-black border border-brand-cream">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-center">
                <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">Rating</p>
                <p className="text-xl font-black text-black">★ {user.rating}</p>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className="bg-brand-brown text-white px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-brand-brown/10"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*  HORIZONTAL CARD */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z- flex items-end justify-center pb-20 px-10"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="relative w-full max-w-187.5 bg-white rounded-[60px] shadow-2xl border-4 border-brand-cream p-10 animate-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >

            {/* X Button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-6 right-8 w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-black font-bold hover:bg-brand-cream transition-all shadow-sm z-20"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-10 items-center">

              {/*Identity */}
              <div className="w-full md:w-[40%] text-center md:border-r border-brand-cream/40 md:pr-10">
                <div className="w-24 h-24 bg-brand-light border-4 border-brand-cream rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-black shadow-inner">
                  {selectedUser.name.charAt(0)}
                </div>
                <h2 className="text-3xl font-bold text-black tracking-tight">{selectedUser.name}</h2>
                <p className="text-brand-brown font-bold italic text-sm mt-1">{selectedUser.major}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black opacity-30 mt-2">{selectedUser.school}</p>

                <div className="mt-6 flex justify-center">
                  <div className="bg-brand-light/50 px-4 py-1.5 rounded-xl border border-brand-cream/50">
                    <p className="text-[13px] font-black text-black tracking-tighter">★ {selectedUser.rating}</p>
                  </div>
                </div>
              </div>

              {/* Stats & Details */}
              <div className="w-full md:w-[60%] space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-light/40 p-4 rounded-[25px] border border-brand-cream/30">
                    <p className="text-[9px] font-black text-black opacity-30 uppercase tracking-widest mb-0.5">Success</p>
                    <p className="text-xl font-bold text-black">100%</p>
                  </div>
                  <div className="bg-brand-light/40 p-4 rounded-[25px] border border-brand-cream/30">
                    <p className="text-[9px] font-black text-black opacity-30 uppercase tracking-widest mb-0.5">Tasks</p>
                    <p className="text-xl font-bold text-black">{selectedUser.completed}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-2 opacity-40">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.skills.map(skill => (
                      <span key={skill} className="bg-black text-white px-4 py-1 rounded-full text-[9px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">About</h3>
                  <p className="text-[13px] text-black font-medium leading-relaxed italic border-l-2 border-brand-brown/20 pl-4">
                    "{selectedUser.bio}"
                  </p>
                </div>

                <button className="w-full bg-brand-brown text-white py-4 rounded-full font-bold text-sm hover:scale-[1.01] active:scale-[0.98] transition-all shadow-lg shadow-brand-brown/15 mt-2">
                  Message to Hire
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}