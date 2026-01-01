"use client"

import { useState } from 'react';

  type Writing = {
    title: string;
    description: string;
    date: string;
    url: string;
    tags: string[]; 
};

export default function Writings() {
    const [selectedPdf, setSelectedPdf] = useState<Writing | null>(null);

    const writings: Writing[] = [
    {
        title: "Two Approaches to Mayakovsky's Life",
        description: "Just an analysis on a Russian Futurist Poet",
        date: "Oct 2025",
        url: "https://docs.google.com/document/d/1BJ8bh_OVvXpMEQEdq43GpPOr4Vn9_hoK/edit?usp=sharing&ouid=113320499547063960171&rtpof=true&sd=true",
        tags: ["Poetry", "Comparison Notes"],
    },
    ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">My Writing</h1>
          <p className="text-xl text-gray-600">
            Thoughts, essays, and reflections
          </p>
        </div>

        {/* Writings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {writings.map((writing, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedPdf(writing)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">📄</span>
                  <span className="text-sm text-gray-500">{writing.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {writing.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {writing.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {writing.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPdf && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedPdf.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{selectedPdf.date}</p>
              </div>
              <button
                onClick={() => setSelectedPdf(null)}
                className="text-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-600 font-bold"
              >
                ×
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${selectedPdf.url}#view=FitH`}
                className="w-full h-full"
                title={selectedPdf.title}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-gray-600">{selectedPdf.description}</p>
              <a
                href={selectedPdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open in New Tab →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}