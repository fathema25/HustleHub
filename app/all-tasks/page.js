"use client";
import { useState, useEffect } from 'react';
import { db, auth } from "@/firebase"; 
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy,
  doc,
  deleteDoc,
  updateDoc 
} from "firebase/firestore";

export default function AllTasks() {
  const [showMore, setShowMore] = useState(false);
  const [liveTasks, setLiveTasks] = useState([]); 
  const [editingTask, setEditingTask] = useState(null);

  // LIVE DATA FROM FIREBASE
  useEffect(() => {
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

  const myTasks = liveTasks.filter(task => task.creatorId === auth.currentUser?.uid);
  const othersTasks = liveTasks.filter(task => task.creatorId !== auth.currentUser?.uid);

  const handleDelete = async (taskId, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete your task: "${title}"?`);
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "tasks", taskId));
        alert("Task deleted successfully.");
      } catch (error) {
        alert("Failed to delete task.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const taskRef = doc(db, "tasks", editingTask.id);
      await updateDoc(taskRef, {
        title: editingTask.title,
        budget: editingTask.budget,
        deadline: editingTask.deadline,
        description: editingTask.description
      });
      setEditingTask(null);
      alert("Task updated successfully! 🚀");
    } catch (error) {
      alert("Error updating task.");
    }
  };

  const handleApply = (taskTitle) => {
    const confirmApply = window.confirm(`Are you sure you want to apply for: "${taskTitle}"?`);
    if (confirmApply) {
      alert("Application sent successfully!");
    }
  };

  const initialTasks = [
    { id: 1, title: "UI Design for Sustainability App", posted: "2h ago", budget: 45.00, tags: ["Figma", "Visual Design"], category: "DESIGN", urgent: true, description: "Need a creative partner to help mock up high-fidelity screens for my senior capstone project." },
    { id: 2, title: "Python Debugging Assistant", posted: "5h ago", budget: "30.00/hr", tags: ["Python", "PyTorch"], category: "ENGINEERING", urgent: false, description: "Looking for someone to help me debug my neural network implementation." },
    { id: 3, title: "Lab Report Proofreading", posted: "8h ago", budget: 20.00, tags: ["Technical Writing", "Chemistry"], category: "WRITING", urgent: false, description: "Need a second reader for a chemistry lab report focusing on organic synthesis." }
  ];

  const extraTasks = [
    { id: 4, title: "Java Backend Bug Fix", posted: "1d ago", budget: 50.00, tags: ["Java", "Spring Boot"], category: "CODING", urgent: false, description: "Fixing a sorting algorithm issue in a student registration system." },
    { id: 5, title: "React Native Mobile Help", posted: "1d ago", budget: "35.00/hr", tags: ["React Native", "Expo"], category: "CODING", urgent: true, description: "Need help setting up Firebase Auth for a mobile budgeting app." }
  ];

  const staticTasks = showMore ? [...initialTasks, ...extraTasks] : initialTasks;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 relative">
      <header className="mb-12">
        <h1 className="text-6xl font-normal text-brand-dark tracking-tight">
          Active <span className="text-brand-brown italic font-bold underline decoration-brand-cream underline-offset-8">Tasks</span>
        </h1>
      </header>

      {/*  EDIT TASK OVERLAY  */}
      {editingTask && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center pb-6 px-10"
          onClick={() => setEditingTask(null)}
        >
          <div
            className="relative w-full max-w-200 bg-white rounded-[60px] shadow-2xl border-4 border-brand-cream p-12 animate-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingTask(null)}
              className="absolute top-8 right-10 w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-black font-bold hover:bg-brand-cream transition-all z-20"
            >
              ✕
            </button>

            <form onSubmit={handleUpdate}>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Section */}
                <div className="w-full md:w-[40%] text-center md:border-r border-brand-cream/40 md:pr-10">
                  <div className="w-24 h-24 bg-brand-brown text-white rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold shadow-lg">
                    ✎
                  </div>
                  <h2 className="text-4xl font-black text-black tracking-tight">Edit Task</h2>
                  <p className="text-brand-brown font-bold italic text-sm mt-1 mb-8">Ready to hustle?</p>

                  <div className="space-y-5 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">Budget ($)</label>
                      <input
                        type="number"
                        value={editingTask.budget}
                        className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-2xl px-5 py-3 text-sm outline-none focus:border-brand-brown transition-all"
                        required
                        onChange={(e) => setEditingTask({ ...editingTask, budget: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">Deadline</label>
                      <input
                        type="date"
                        value={editingTask.deadline}
                        className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-2xl px-5 py-3 text-sm outline-none focus:border-brand-brown transition-all"
                        required
                        onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
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
                      value={editingTask.title}
                      className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-3xl px-8 py-5 text-lg font-bold outline-none focus:border-brand-brown transition-all text-black"
                      required
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest ml-2">Details</label>
                    <textarea
                      value={editingTask.description}
                      className="w-full bg-brand-light/40 border border-brand-cream/30 rounded-[40px] px-8 py-6 text-sm font-medium leading-relaxed italic h-36 resize-none outline-none focus:border-brand-brown transition-all text-black"
                      required
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-brown text-white py-5 rounded-full font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-brand-brown/20"
                  >
                    Confirm & Update Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TASK LISTINGS */}
      <div className="grid grid-cols-1 gap-6">
        {myTasks.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-black text-brand-brown uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-brown rounded-full animate-pulse"></span>
              My Postings
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {myTasks.map(task => (
                <div key={task.id} className="bg-brand-brown/5 p-6 pl-10 pr-10 rounded-[80px] border-2 border-brand-brown flex flex-col md:flex-row items-center justify-between gap-8 group shadow-sm">
                  <div className="flex items-center gap-6 min-w-[320px]">
                    <div className="w-20 h-20 bg-brand-light border-2 border-brand-brown/20 rounded-full flex flex-col items-center justify-center shadow-inner relative text-brand-brown">
                      <span className="text-2xl font-bold italic">★</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-black tracking-tight leading-tight group-hover:text-brand-brown transition-colors">{task.title}</h2>
                      <p className="text-[10px] font-bold text-brand-brown italic mt-1 uppercase tracking-wider">Your Post</p>
                    </div>
                  </div>
                  <div className="flex-1 border-x border-brand-cream/50 px-8 hidden lg:block italic text-black">"{task.description}"</div>
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-20">
                      <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">Budget</p>
                      <p className="text-xl font-black text-black">${task.budget}</p>
                    </div>
                    <button onClick={() => setEditingTask(task)} className="bg-white border-2 border-brand-cream p-4 rounded-2xl hover:border-brand-brown transition-all shadow-sm">✎</button>
                    <button onClick={() => handleDelete(task.id, task.title)} className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-red-600 transition-colors shadow-lg">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Hustles & Static Tasks */}
        <h2 className="text-xs font-black text-black/30 uppercase tracking-[0.3em] mb-2">Available Hustles</h2>
        {othersTasks.concat(staticTasks).map(task => (
          <div key={task.id} className="bg-white p-6 pl-10 pr-10 rounded-[80px] border-2 border-brand-brown hover:border-brand-brown transition-all flex flex-col md:flex-row items-center justify-between gap-8 group shadow-sm">
             <div className="flex items-center gap-6 min-w-[320px]">
              <div className="w-20 h-20 bg-brand-light border-2 border-brand-brown/20 rounded-full flex flex-col items-center justify-center shadow-inner relative text-brand-brown">
                <span className="text-2xl font-bold italic">{task.category ? task.category.charAt(0) : '!'}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-black tracking-tight leading-tight group-hover:text-brand-brown transition-colors">{task.title}</h2>
                <p className="text-[10px] font-bold text-brand-brown italic mt-1 uppercase tracking-wider">
                  {task.category || (task.creatorEmail ? `By: ${task.creatorEmail}` : "Verified Hustle")}
                </p>
              </div>
            </div>
            <div className="flex-1 border-x border-brand-cream/50 px-8 hidden lg:block text-black">
              <p className="text-sm font-medium italic mb-3 line-clamp-2">"{task.description}"</p>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-center min-w-20">
                <p className="text-[9px] font-black text-black uppercase tracking-widest mb-1 opacity-40">Budget</p>
                <p className="text-xl font-black text-black">${task.budget}</p>
              </div>
              <button onClick={() => handleApply(task.title)} className="bg-brand-brown text-white px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-brand-brown/20">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}