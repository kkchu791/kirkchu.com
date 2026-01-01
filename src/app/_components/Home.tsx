"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";
import { Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const fireworksRef = useRef<HTMLDivElement>(null);
  const fireworksInstance = useRef<Fireworks | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (fireworksRef.current) {
      // Initialize fireworks
      fireworksInstance.current = new Fireworks(fireworksRef.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: "round",
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 30,
          max: 60,
        },
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3,
          },
          trace: {
            min: 1,
            max: 2,
          },
        },
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
      });

      const interval = setInterval(() => {
        if (fireworksInstance.current) {
          fireworksInstance.current.start();
          setTimeout(() => {
            if (fireworksInstance.current) {
              fireworksInstance.current.stop();
            }
          }, 6000);
        }
      }, 21000);

      // Initial fireworks display
      fireworksInstance.current.start();
      setTimeout(() => {
        if (fireworksInstance.current) {
          fireworksInstance.current.stop();
        }
      }, 6000);

      return () => {
        clearInterval(interval);
        if (fireworksInstance.current) {
          fireworksInstance.current.stop();
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full bg-black flex items-center justify-center py-12 md:py-16 overflow-hidden">
        <div
          ref={fireworksRef}
          className="absolute inset-0 pointer-events-none z-10"
        />

        <div className="w-full max-w-5xl px-6 relative z-0">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full rounded-lg shadow-2xl"
            >
              <source src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/Boy+Toy.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col md:flex-row items-center max-w-4xl p-6">
          {/* Image */}
          <Image
            src="/IMG_3345.jpg"
            alt="Kirk"
            width={256}
            height={256}
            className="w-64 h-64 object-cover rounded-xl shadow-md mb-6 md:mb-0 md:mr-8"
          />

          {/* Description */}
          <div className="text-center md:text-left">
            <p className="text-lg text-gray-700">
              {`I'm just a Software Engineer...I'm not your Boy Toy.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}