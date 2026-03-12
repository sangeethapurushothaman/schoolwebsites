import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assumes you are using react-router-dom

const LegalPage = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  const content = {
    privacy: {
      title: "Privacy Policy",
      text: `
We respect student and parent privacy. Personal data is collected
only for academic and administrative purposes.

• Data is encrypted and securely stored  
• No data is sold to third parties  
• Access is restricted to authorized staff only  
• Users may request data removal anytime  
      `,
    },
    terms: {
      title: "Terms of Service",
      text: `
By accessing this platform, users agree to comply with institutional rules.

• Credential sharing is prohibited  
• Harassment or abuse leads to termination  
• Content misuse may result in legal action  
• Terms may be updated without notice  
      `,
    },
  };

  return (
    /* Changed z-10 to z-0 to prevent blocking Header/Footer links */
    <main className="relative z-0 bg-slate-50 min-h-screen pt-[120px] pb-24 px-4">
      
      {/* --- BACK TO HOME BUTTON --- */}
      <div className="fixed top-24 left-4 md:left-8 z-[100]">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all font-medium text-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
      {/* --------------------------- */}

      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Legal Center
          </h1>
          <p className="mt-2 text-slate-600">
            Transparency, compliance, and user trust
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <nav className="flex lg:flex-col gap-3 sticky top-32">
              {Object.keys(content).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                    activeTab === key
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
                  }`}
                >
                  {content[key].title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <section className="lg:w-3/4 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
              {content[activeTab].title}
            </h2>

            <pre className="text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">
              {content[activeTab].text}
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LegalPage;