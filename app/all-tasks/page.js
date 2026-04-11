"use client";
import { useState, useEffect } from 'react';
import { db } from "@/firebase"; 
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";

export default function AllTasks() {
  const [showMore, setShowMore] = useState(false);
  const [liveTasks, setLiveTasks] = useState([]); // State for real Firestore tasks

  // LIVE DATA FROM FIREBASE
  useEffect(() => {
    // This connects the tasks collection in Firestore
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ ...doc.data(), id: doc.id });
      });
      setLiveTasks(tasksArray);
    });

    return () => unsubscribe();
  }, []);

  const initialTasks = [
    {
      id: 1,
      title: "UI Design for Sustainability App",
      posted: "2h ago",
      budget: 45.00,
      tags: ["Figma", "Visual Design"],
      category: "DESIGN",
      urgent: true,
      description: "Need a creative partner to help mock up high-fidelity screens for my senior capstone project. Focused on ecological tracking."
    },
    {
      id: 2,
      title: "Python Debugging Assistant",
      posted: "5h ago",
      budget: "30.00/hr",
      tags: ["Python", "PyTorch"],
      category: "ENGINEERING",
      urgent: false,
      description: "Looking for someone to help me debug my neural network implementation. The loss function isn't converging properly."
    },
    {
      id: 3,
      title: "Lab Report Proofreading",
      posted: "8h ago",
      budget: 20.00,
      tags: ["Technical Writing", "Chemistry"],
      category: "WRITING",
      urgent: false,
      description: "Need a second reader for a chemistry lab report focusing on organic synthesis. Just need a quick grammar check."
    }
  ];

  const extraTasks = [
    {
      id: 4,
      title: "Java Backend Bug Fix",
      posted: "1d ago",
      budget: 50.00,
      tags: ["Java", "Spring Boot"],
      category: "CODING",
      urgent: false,
      description: "Fixing a sorting algorithm issue in a student registration system. Should be a quick JAR file update."
    },
    {
      id: 5,
      title: "React Native Mobile Help",
      posted: "1d ago",
      budget: "35.00/hr",
      tags: ["React Native", "Expo"],
      category: "CODING",
      urgent: true,
      description: "Need help setting up Firebase Auth for a mobile budgeting app. Navigation is already done."
    }
  ];

  const staticTasks = showMore ? [...initialTasks, ...extraTasks] : initialTasks;

  const handleApply = (taskTitle) => {
    const confirmApply = window.confirm(`Are you sure you want to apply for: "${taskTitle}"?`);
    if (confirmApply) {
      alert("Application sent successfully! The poster will be notified.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-6xl font-normal text-brand-dark tracking-tight">
          Active <span className="text-brand-brown italic font-bold underline decoration-brand-cream underline-offset-8">Tasks</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6">
        
        {/* RENDER REAL LOGIC TASKS FROM FIREBASE */}
        {liveTasks.map(task => (
          <div key={task.id} className="bg-white p-6 pl-10 pr-10 rounded-[80px] border-2 border-brand-brown hover:border-brand-brown transition-all flex flex-col md:flex-row items-center justify-between gap-8 group shadow-sm">
            <div className="flex items-center gap-6 min-w-[320px]">
              <div className="w-20 h-20 bg-brand-light border-2 border-brand-brown/20 rounded-full flex flex-col items-center justify-center shadow-inner relative text-brand-brown">
                {/* Visual indicator for a live/new post */}
                <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                <span className="text-2xl font-bold italic">!</span>
              </div>
              <div className="max-w-50">
                <h2 className="text-xl font-bold text-black tracking-tight leading-tight group-hover:text-brand-brown transition-colors">
                  {task.title}
                </h2>
                <p className="text-[10px] font-bold text-brand-brown italic mt-1 uppercase tracking-wider">Verified Hustle</p>
              </div>
            </div>

            <div className="flex-1 border-x border-brand-cream/50 px-8 hidden lg:block">
              <p className="text-sm text-black font-medium italic mb-3 line-clamp-2">
                "{task.description}"
              </p>
              <div className="flex gap-2">
                <span className="bg-brand-brown text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter">Live from Cloud</span>
                <span className="bg-brand-light px-3 py-1 rounded-full text-[9px] font-bold text-black border border-brand-cream uppercase tracking-tighter">Newest</span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-center min-w-20">
                <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">Budget</p>
                <p className="text-xl font-black text-black">${task.budget}</p>
              </div>
              <button
                onClick={() => handleApply(task.title)}
                className="bg-brand-brown text-white px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-brand-brown/20"
              >
                Apply
              </button>
            </div>
          </div>
        ))}

        {/* RENDER ORIGINAL STATIC TASKS */}
        {staticTasks.map(task => (
          <div key={task.id} className="bg-white p-6 pl-10 pr-10 rounded-[80px] border-2 border-brand-cream hover:border-brand-brown/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="flex items-center gap-6 min-w-[320px]">
              <div className="w-20 h-20 bg-brand-light border-2 border-brand-cream rounded-full flex flex-col items-center justify-center shadow-inner relative">
                {task.urgent && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></span>
                )}
                <span className="text-2xl font-bold text-black">{task.category.charAt(0)}</span>
              </div>
              <div className="max-w-50">
                <h2 className="text-xl font-bold text-black tracking-tight leading-tight group-hover:text-brand-brown transition-colors">
                  {task.title}
                </h2>
                <p className="text-[10px] font-bold text-brand-brown italic mt-1 uppercase tracking-wider">{task.category}</p>
              </div>
            </div>

            <div className="flex-1 border-x border-brand-cream/50 px-8 hidden lg:block">
              <p className="text-sm text-black font-medium italic mb-3 line-clamp-2">
                "{task.description}"
              </p>
              <div className="flex gap-2">
                {task.tags.map(tag => (
                  <span key={tag} className="bg-brand-light px-3 py-1 rounded-full text-[9px] font-bold text-black border border-brand-cream">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-center min-w-20">
                <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">
                  {task.posted}
                </p>
                <p className="text-xl font-black text-black">
                  {typeof task.budget === 'number' ? `$${task.budget.toFixed(0)}` : task.budget}
                </p>
              </div>
              <button
                onClick={() => handleApply(task.title)}
                className="bg-brand-brown text-white px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-brand-brown/10"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
      {!showMore && (
        <div className="flex justify-center mt-16 mb-20">
          <button
            onClick={() => setShowMore(true)}
            className="px-12 py-5 rounded-full border-2 border-brand-brown text-brand-brown font-bold hover:bg-brand-brown hover:text-white transition-all shadow-sm flex items-center gap-3 group"
          >
            <span>Load More Tasks</span>
            <span className="group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>
      )}

      {showMore && (
        <div className="flex justify-center mt-12 mb-20">
          <p className="text-sm font-medium text-black opacity-30 italic">You&apos;ve reached the end of the hustle.</p>
        </div>
      )}
    </div>
  );
}