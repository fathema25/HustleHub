"use client";
import { useState } from 'react';

export default function ReviewPage() {
  const [reviews] = useState([
    {
      id: 1,
      user: "Anthony Ogamba",
      role: "LeadgerTech Crew",
      rating: 5,
      date: "March 28, 2026",
      comment: "Incredible work on the BudgetSync ADRs. The technical logic for the biometric authentication flow was flawless. A key asset to the team.",
    },
    {
      id: 2,
      user: "Sarah Chen",
      role: "UI/UX Designer",
      rating: 4,
      date: "March 15, 2026",
      comment: "The Next.js implementation of the shopping list was smooth. Firebase auth works perfectly. Just a tiny tweak needed on the mobile padding, but overall 10/10.",
    },
    {
      id: 3,
      user: "Stephen Noh",
      role: "LeadgerTech Crew",
      rating: 5,
      date: "February 20, 2026",
      comment: "The Java sorting algorithm project was handled with extreme precision. The JAR file output was clean and passed all test cases on the first run.",
    },
    {
      id: 4,
      user: "Professor Miller",
      role: "SAIT Instructor",
      rating: 5,
      date: "February 05, 2026",
      comment: "Exceptional use of PL/SQL triggers for the library system. The reservation check logic handled edge cases that most students missed.",
    },
    {
      id: 5,
      user: "Jordan Smith",
      role: "Product Manager",
      rating: 5,
      date: "January 12, 2026",
      comment: "Fathema's ability to humanize technical documentation is rare. The CustomizeIt sequence diagrams made the login flow clear for everyone.",
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen">

      {/* HEADER SECTION */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-6xl font-normal text-black tracking-tight">
            Client <span className="text-brand-brown italic font-bold underline decoration-brand-brown underline-offset-8">Reviews</span>
          </h1>
          <p className="mt-6 text-brand-brown/60 font-medium italic text-lg">
            Verified feedback from your software development projects.
          </p>
        </div>

        {/* SUMMARY RATING BOX */}
        <div className="bg-white border-4 border-brand-brown/10 rounded-[40px] px-10 py-6 text-center shadow-sm">
          <p className="text-[10px] font-black text-brand-brown opacity-40 uppercase tracking-widest mb-1">Overall Rating</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-black">4.9</span>
            <span className="text-2xl text-brand-brown">★★★★★</span>
          </div>
          <p className="text-[9px] font-bold text-brand-brown/40 mt-1">BASED ON {reviews.length} REVIEWS</p>
        </div>
      </header>

      {/* REVIEWS LIST */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-[60px] border-[6px] border-brand-brown/5 p-10 hover:border-brand-brown/20 transition-all group relative overflow-hidden"
          >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-brown/5 rounded-bl-[100px] -z-0" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">

              {/* Reviewer Identity */}
              <div className="w-full md:w-1/4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-brand-brown text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-brand-brown/20">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black leading-tight">{review.user}</h3>
                    <p className="text-[11px] font-bold text-brand-brown italic">{review.role}</p>
                  </div>
                </div>
                <p className="text-[10px] font-black text-black/20 uppercase tracking-tighter">{review.date}</p>
              </div>

              {/* Review Content */}
              <div className="w-full md:w-3/4 border-t md:border-t-0 md:border-l border-brand-brown/10 pt-6 md:pt-0 md:pl-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < review.rating ? 'text-brand-brown' : 'text-brand-brown/20'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[16px] text-black font-medium leading-relaxed italic pr-6">
                  "{review.comment}"
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-brand-brown/20" />
                  <span className="text-[9px] font-black text-brand-brown/40 uppercase tracking-widest">Verified Completion</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="py-20 text-center">
        <p className="text-[10px] font-black text-brand-brown/20 uppercase tracking-[0.5em]">End of Reviews</p>
      </div>
    </div>
  );
}