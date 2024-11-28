import React from 'react';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/Pxzfc08/short-hair-girl-posing-red-tshirt.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/85 to-indigo-900/90"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            <Sparkles className="h-3 w-3 text-yellow-300/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="h-16 w-16 text-yellow-400/50" />
              </div>
              <Sparkles className="h-16 w-16 text-yellow-400" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 text-white">
            <span className="inline-block animate-shimmer bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-[length:200%_100%] bg-clip-text text-transparent">
              Win a Brand New
            </span>
            <br />
            iPhone 16 Pro Max!
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Purchase our exclusive key tags and get multiple entries to win amazing prizes!
          </p>
          <a
            href="#packages"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] animate-pulse"
          >
            Get Your Entries Now
          </a>
        </div>
      </div>
    </div>
  );
}