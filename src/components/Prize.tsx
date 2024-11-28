import React from 'react';
import { Gift, Clock, Star } from 'lucide-react';

export function Prize() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl transform rotate-6 group-hover:rotate-3 transition-transform duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl transform -rotate-6 group-hover:-rotate-3 transition-transform duration-300"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80"
                alt="Premium Smartphone"
                className="rounded-2xl shadow-2xl relative transform group-hover:scale-105 transition-transform duration-300 w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <span className="inline-block bg-yellow-400/90 text-black px-4 py-1 rounded-full font-semibold text-sm">
                  Latest Model
                </span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg animate-bounce">
              <Star className="h-6 w-6" />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              Grand Prize
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              iPhone 16 Pro Max
            </h2>
            <p className="text-gray-600 text-lg">
              Get a chance to win the latest iPhone with its revolutionary features and stunning design. 
              The more entries you have, the higher your chances of winning!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Gift className="h-6 w-6 text-purple-600" />
                <span className="text-gray-700 font-medium">Guaranteed Winner</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
                <span className="text-gray-700 font-medium">Draw: March 31, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}