"use client";
import { useState } from 'react';
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function Home() {
  const [showPostTask, setShowPostTask] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    budget: "",
    deadline: "",
    description: ""
  });

  // handlePost saves to Firebase and closes the overlay
  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: taskData.title,
        budget: taskData.budget,
        deadline: taskData.deadline,
        description: taskData.description,
        status: "open",
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      setShowPostTask(false);
      alert("Task posted successfully to the cloud! 🚀");

      // Reset form data
      setTaskData({ title: "", budget: "", deadline: "", description: "" });

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error posting task. Check console for details.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-16">
        <h1 className="text-6xl font-normal text-brand-dark tracking-tight">
          Welcome back, <span className="text-brand-brown italic font-bold underline decoration-brand-cream underline-offset-8">Hustler</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20">
        {/* Main Action Card */}
        <div className="bg-brand-brown p-12 rounded-[40px] text-white shadow-2xl shadow-brand-brown/20 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Need a hand?</h2>
            <p className="text-white font-normal mb-10 text-sm max-w-60 opacity-90 leading-relaxed">
              Post a new task and find the perfect student for the job in minutes.
            </p>
            <button
              onClick={() => setShowPostTask(true)}
              className="inline-block bg-white text-brand-brown px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl"
            >
              Post a Task
            </button>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-12 rounded-[40px] border-2 border-brand-cream shadow-sm flex flex-col justify-center">
          <h2 className="text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-3 opacity-30">
            Semester Revenue
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black tracking-tight">$245.00</span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md tracking-tighter">
              +12%
            </span>
          </div>
          <p className="text-[11px] font-medium text-black mt-4 opacity-60 leading-relaxed">
            Your earnings are up from last month. Keep up the hustle!
          </p>
        </div>
      </div>

      {/* Post a task overlay */}
      {showPostTask && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center pb-6 px-10"
          onClick={() => setShowPostTask(false)}
        >
          <div
            className="relative w-full max-w-200 bg-white rounded-[60px] shadow-2xl border-4 border-brand-cream p-12 animate-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPostTask(false)}
              className="absolute top-8 right-10 w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-black font-bold hover:bg-brand-cream transition-all z-20"
            >
              ✕
            </button>

            <form onSubmit={handlePost}>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Section */}
                <div className="w-full md:w-[40%] text-center md:border-r border-brand-cream/40 md:pr-10">
                  <div className="w-24 h-24 bg-brand-brown text-white rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold shadow-lg">
                    +
                  </div>
                  <h2 className="text-4xl font-black text-black tracking-tight">New Task</h2>
                  <p className="text-brand-brown font-bold italic text-sm mt-1 mb-8">Ready to hustle?</p>

                  <div className="space-y-5 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">Budget ($)</label>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={taskData.budget}
                        className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-2xl px-5 py-3 text-sm outline-none focus:border-brand-brown transition-all"
                        required
                        onChange={(e) => setTaskData({ ...taskData, budget: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">Deadline</label>
                      <input
                        type="date"
                        value={taskData.deadline}
                        className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-2xl px-5 py-3 text-sm outline-none focus:border-brand-brown transition-all"
                        required
                        onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-[60%] space-y-6 self-center">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">What do you need?</label>
                    <input
                      type="text"
                      placeholder="e.g. Debugging React App"
                      value={taskData.title}
                      className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-3xl px-8 py-5 text-lg font-bold outline-none focus:border-brand-brown transition-all"
                      required
                      onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">Details</label>
                    <textarea
                      placeholder="Describe the task instructions..."
                      value={taskData.description}
                      className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-[40px] px-8 py-6 text-sm font-medium leading-relaxed italic h-36 resize-none outline-none focus:border-brand-brown transition-all"
                      required
                      onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-brown text-white py-5 rounded-full font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-brand-brown/20"
                  >
                    Confirm & Post Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}