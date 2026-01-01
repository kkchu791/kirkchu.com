"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slides: string[];
}

const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

const projects: Project[] = [
  {
    id: "scented-cow",
    title: "Scented Cow Desk Piece",
    description: "Tackling work burnout through silliness and play",
    thumbnail: `${S3_BASE_URL}/Product+Pitch+Images.001.jpeg`,
    slides: [
      `${S3_BASE_URL}/Product+Pitch+Images.001.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.002.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.003.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.004.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.005.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.006.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.007.jpeg`,
      `${S3_BASE_URL}/Product+Pitch+Images.008.jpeg`,
    ],
  },
  {
    id: "chopped-ingredients-holder",
    title: "Chopped Ingredients Holder",
    description: "Kitchen organization solution",
    thumbnail: `${S3_BASE_URL}/Chopped+Ingredients+Holder.001.jpeg`,
    slides: [
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.001.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.002.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.003.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.004.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.005.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.006.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.007.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.008.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.009.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.010.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.011.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.012.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.013.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.014.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.015.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.016.jpeg`,
      `${S3_BASE_URL}/Chopped+Ingredients+Holder.017.jpeg`,
    ],
  },
  {
    id: "emotion-awareness-bracelet",
    title: "Emotional Awareness Bracelet",
    description: "Wearable emotional wellness tool",
    thumbnail: `${S3_BASE_URL}/Emoional+Awareness+Bracelet.001.jpeg`,
    slides: [
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.001.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.002.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.003.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.004.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.005.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.006.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.007.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.008.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.009.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.010.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.011.jpeg`,
      `${S3_BASE_URL}/Emoional+Awareness+Bracelet.012.jpeg`,
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentSlide(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (selectedProject && currentSlide < selectedProject.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const previousSlide = () => {
    if (selectedProject && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") previousSlide();
    if (e.key === "Escape") closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">My Projects</h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => openModal(project)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 text-left"
            >
              <div className="relative h-64 bg-gray-200">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-6"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div
              className="relative w-full h-full max-w-[65vw] max-h-[65vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Slide Counter */}
              <div className="absolute -top-12 left-0 text-white text-lg">
                {currentSlide + 1} / {selectedProject.slides.length}
              </div>

              {/* Slides Container */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedProject.slides[currentSlide]}
                    alt={`${selectedProject.title} - Slide ${currentSlide + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={previousSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {selectedProject.slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white bg-opacity-50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}