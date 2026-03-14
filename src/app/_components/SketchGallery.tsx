import { useState } from "react";

type Sketch = {
    id: number;
    src: string;
    thumb: string;
    label: string;
  };
  

export function SketchGallery({ sketches }: { sketches: Sketch[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i! - 1 + sketches.length) % sketches.length);
  const next = () => setActiveIndex((i) => (i! + 1) % sketches.length);

  return (
    <>
      {/* Thumbnail strip */}
      <div className="flex gap-3 justify-center flex-wrap mt-6">
        {sketches.map((sketch, index) => (
          <button
            key={sketch.id}
            onClick={() => openModal(index)}
            className="group relative w-24 h-16 rounded-lg overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-200 hover:scale-105 focus:outline-none"
          >
            <img
              src={sketch.thumb}
              alt={sketch.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-200" />
            <span className="absolute bottom-1 left-1 text-[10px] text-cyan-400/80 font-mono">
              {sketch.label}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-cyan-400/70 hover:text-cyan-400 font-mono text-sm tracking-widest transition-colors"
            >
              CLOSE ✕
            </button>

            {/* Image */}
            <div className="rounded-xl overflow-hidden border border-cyan-500/20 shadow-[0_0_60px_rgba(0,255,255,0.1)]">
              <img
                src={sketches[activeIndex].src}
                alt={sketches[activeIndex].label}
                className="w-full block"
              />
            </div>

            {/* Nav + label */}
            <div className="flex items-center justify-between mt-4 px-1">
              <button
                onClick={prev}
                className="text-cyan-400/70 hover:text-cyan-400 font-mono text-sm tracking-widest transition-colors border border-cyan-500/20 hover:border-cyan-400/60 px-4 py-2 rounded-lg"
              >
                ← PREV
              </button>
              <span className="text-cyan-400/60 font-mono text-xs tracking-widest">
                {sketches[activeIndex].label} &nbsp;·&nbsp; {activeIndex + 1} / {sketches.length}
              </span>
              <button
                onClick={next}
                className="text-cyan-400/70 hover:text-cyan-400 font-mono text-sm tracking-widest transition-colors border border-cyan-500/20 hover:border-cyan-400/60 px-4 py-2 rounded-lg"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}