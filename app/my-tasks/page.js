"use client";
import { useState } from 'react';
import Link from 'next/link'; 

export default function MyTasks() {
  const [filter, setFilter] = useState('Active');

  const allTasks = [
    {
      id: 1,
      title: "UI Design",
      sub: "Sustainability App",
      status: "In Progress",
      deadline: "Oct 24",
      budget: 45.00,
      description: "Designing 5 high-fidelity screens. Currently 60% complete.",
      type: "Active",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Java Backend",
      sub: "Student System",
      status: "Pending",
      deadline: "Oct 26",
      budget: 50.00,
      description: "Waiting for API documentation from the client to start debugging.",
      type: "Active",
      color: "bg-orange-500"
    },
    {
      id: 3,
      title: "Lab Report",
      sub: "Chemistry 101",
      status: "Completed",
      deadline: "Finished",
      budget: 20.00,
      description: "Successfully proofread and submitted. Payment received.",
      type: "Completed",
      color: "bg-green-500"
    }

  ];

  const filteredTasks = allTasks.filter(task => task.type === filter);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <Link
        href="/all-tasks"
        className="text-[10px] font-black tracking-[0.2em] text-black opacity-40 hover:opacity-100 mb-4 inline-block transition-all"
      >
        ← BACK TO ALL TASKS
      </Link>

      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-normal text-black tracking-tight">
            My <span className="text-brand-brown italic font-bold underline decoration-brand-cream underline-offset-8">Hustles</span>
          </h1>
        </div>

        {/* Filter Toggles */}
        <div className="flex bg-brand-light p-1.5 rounded-full border border-brand-cream">
          {['Active', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-8 py-2.5 rounded-full text-xs font-black tracking-widest transition-all ${filter === tab
                ? 'bg-brand-brown text-white shadow-md'
                : 'text-black opacity-40 hover:opacity-100'
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-6 mt-10">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className="bg-white p-6 pl-10 pr-10 rounded-[80px] border-2 border-brand-cream hover:border-brand-brown/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group">

              {/* Status Badge */}
              <div className="flex items-center gap-6 min-w-70">
                <div className="w-20 h-20 bg-brand-light border-2 border-brand-cream rounded-full flex flex-col items-center justify-center shadow-inner relative">
                  <div className={`absolute top-0 right-0 w-4 h-4 ${task.color} rounded-full border-2 border-white ${task.status !== 'Completed' && 'animate-pulse'}`}></div>
                  <span className="text-[9px] font-black text-black uppercase tracking-tighter opacity-30">Status</span>
                  <span className="text-[10px] font-bold text-black text-center leading-tight">
                    {task.status}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black tracking-tight">{task.title}</h2>
                  <p className="text-xs font-bold text-brand-brown italic">{task.sub}</p>
                </div>
              </div>

              {/*Description */}
              <div className="flex-1 border-x border-brand-cream/50 px-8 hidden lg:block">
                <p className="text-sm text-black font-medium italic">
                  "{task.description}"
                </p>
              </div>

              {/*Meta Info */}
              <div className="flex items-center gap-12 pr-4">
                <div className="text-center">
                  <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-30">
                    {task.type === 'Active' ? 'Due' : 'Closed'}
                  </p>
                  <p className="text-sm font-bold text-black">{task.deadline}</p>
                </div>

                <div className="text-right min-w-25">
                  <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-30 text-right">Budget</p>
                  <p className="text-2xl font-black text-black">${task.budget.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-brand-light/30 rounded-[60px] border-2 border-dashed border-brand-cream">
            <p className="text-black font-bold italic opacity-40">No {filter.toLowerCase()} tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
}