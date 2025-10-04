import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ContestHub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform for tracking and discovering programming contests from top competitive programming platforms.
          </p>
        </div>

        {/* Project Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Project</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                ContestHub aims to centralize contest information from various programming platforms, 
                making it easier for competitive programmers to discover, track, and participate in 
                coding contests without having to visit multiple websites.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🚀 Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Multi-Platform Support:</strong> Codeforces, LeetCode, and GeeksforGeeks</li>
                <li><strong>Smart Filtering:</strong> Filter contests by platform, status, and time</li>
                <li><strong>Real-time Updates:</strong> Automatic refresh of contest data</li>
                <li><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile</li>
                <li><strong>Upcoming & Completed:</strong> View both future and past contests</li>
                <li><strong>Direct Links:</strong> Quick access to contest registration and results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🛠️ Technology Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Frontend</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• React 19</li>
                    <li>• Tailwind CSS</li>
                    <li>• JavaScript ES6+</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Backend</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Node.js</li>
                    <li>• Express.js</li>
                    <li>• MongoDB</li>
                    <li>• REST API</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Developer</h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">SJ</span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shivang Jha</h3>
              <p className="text-gray-600 mb-4">
                Full-Stack Developer & Programming Enthusiast
              </p>
              
              <div className="space-y-3">
                <p className="text-gray-700">
                  Passionate about building innovative solutions that solve real-world problems. 
                  ContestHub was created to address the need for a centralized platform where 
                  competitive programmers can easily discover and track contests from multiple platforms.
                </p>
              
              </div>
            </div>
          </div>
        </div>

         {/* Contact Information */}
         <div className="bg-white rounded-lg shadow-lg p-8">
           <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Repository</h3>
               <p className="text-gray-600 mb-4">
                 ContestHub is an open-source project. Feel free to contribute, report issues, or suggest new features.
               </p>
               <a 
                 href="https://github.com/ShivaangJha" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
               >
                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                 </svg>
                 View on GitHub
               </a>
             </div>
             
             <div>
               <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
               <div className="space-y-3">
                 <div className="flex items-center">
                   <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                   <a 
                     href="mailto:shivangjha5584@gmail.com"
                     className="text-blue-600 hover:text-blue-800 transition-colors"
                   >
                     shivangjha5584@gmail.com
                   </a>
                 </div>
                 <div className="flex items-center">
                   <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                   </svg>
                   <a 
                     href="https://github.com/ShivaangJha"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-800 transition-colors"
                   >
                     @ShivaangJha
                   </a>
                 </div>
               </div>
               <p className="text-gray-600 mt-4">
                 Feel free to reach out for collaboration, feedback, or just to say hello!
               </p>
             </div>
           </div>
         </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Built by <span className="font-semibold text-gray-700">Shivang Jha</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            ContestHub © 2024 - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
