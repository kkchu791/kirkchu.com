"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fireworks } from "fireworks-js";
import { Volume2, VolumeX } from "lucide-react";
import { SketchGallery } from './SketchGallery';

const ea_bracelet = [
  { id: 'ea1', src: "ea-bracelet-01.jpg", thumb: "ea-bracelet-01.jpg", label: "ea-bracelet-01" },
  { id: 'ea2', src: "ea-bracelet-02.jpg", thumb: "ea-bracelet-02.jpg", label: "ea-bracelet-02" },
  { id: 'ea3', src: "ea-bracelet-03.jpg", thumb: "ea-bracelet-03.jpg", label: "ea-bracelet-03" },
];

const rachael_sketches = [
  { id: 1, src: "ecs-blade-runner.png", thumb: "ecs-blade-runner.png", label: "ecs blade runner" },
  { id: 2, src: "github-actions-client.png", thumb: "github-actions-client.png", label: "github-actions-client" },
  { id: 3, src: "appconfig-parameter-store.png", thumb: "github-actions-client.png", label: "appconfig-parameter-store" },
  { id: 4, src: "kafka-brainstorm.png", thumb: "kafka-brainstorm.png", label: "kafka-brainstorm" },
];

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
            {/* <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full rounded-lg shadow-2xl"
            >
              <source src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_BASE_URL}/Boy+Toy.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            
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

      <div className="flex flex-col md:flex-column items-center justify-center py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl px-6">
          {/* Photo */}
          <Image
            src="/IMG_3345.jpg"
            alt="Kirk"
            width={256}
            height={256}
            className="w-64 h-64 object-cover rounded-xl shadow-md"
          />

          {/* Video */}
          <div className="relative">
            <div>My talk on the Emotional Awareness Bracelet</div>
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="object-cover rounded-xl shadow-md"
            >
              <source src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_BASE_URL}/me-speaking.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              onClick={toggleMute}
              className="absolute bottom-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <SketchGallery
          sketches={ea_bracelet}
        /> 
      </div>

      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col md:flex-column items-center justify-center gap-8 max-w-4xl px-6">
          A visual piece to give a feeling of what fear and breaking free of fear look likes for the audience. Done in the style of Blade Runner where you're meant to be viewing a replicant's (Rachael) memories
          <div>
            <SketchGallery
              sketches={rachael_sketches}
            /> 
          </div>
        </div>

        {/* Screenshot preview */}
        <div className="flex flex-col items-center mt-10">
          <div className="rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.15)] border border-cyan-500/20 max-w-3xl w-full mx-auto">
            {/* Browser chrome bar */}
            <div className="bg-[#0d1117] px-4 py-3 flex items-center gap-2 border-b border-cyan-500/20">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 bg-[#1a2332] rounded px-3 py-1 text-xs text-cyan-400/60 font-mono tracking-wide">
                https://rachaels-frontend.vercel.app/
              </span>
            </div>
            {/* Screenshot */}
            <a
              href="https://rachaels-frontend.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative"
            >
              <img
                src="/NoFearVisualization.png"
                alt="NoFear project screenshot"
                className="w-full block"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-cyan-400 font-mono text-sm tracking-widest border border-cyan-400/50 px-4 py-2 rounded backdrop-blur-sm">
                  VIEW LIVE ↗
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}