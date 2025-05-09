'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const wallpapers = {
  lakmigritchana: {
    background: '/images/large.jpg',
    mockups: ['/images/1.png', '/images/2.png', '/images/3.png'],
  },
  wealthgod: {
    background: '/images/large-2.jpg',
    mockups: [
      '/images/wealthgod-mockup-1.png',
      '/images/wealthgod-mockup-2.png',
      '/images/wealthgod-mockup-3.png',
    ],
  },
};

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const themeKey = searchParams.get('theme') || '';
  const data = wallpapers[themeKey as keyof typeof wallpapers];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const targetX = index * window.innerWidth;
    el.scrollTo({ left: targetX, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  // Handle scroll wheel to snap 1-by-1
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        let newIndex = currentIndex;

        if (e.deltaY > 30 && currentIndex < data.mockups.length - 1) {
          newIndex = currentIndex + 1;
        } else if (e.deltaY < -30 && currentIndex > 0) {
          newIndex = currentIndex - 1;
        }

        if (newIndex !== currentIndex) {
          isScrollingRef.current = true;
          scrollToIndex(newIndex);
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 500); // debounce
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [currentIndex, data.mockups.length]);

  // Optional: Track scroll to sync currentIndex (in case of manual swipe)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const index = Math.round(el.scrollLeft / window.innerWidth);
      setCurrentIndex(index);
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    let newIndex = currentIndex;

    if (direction === 'left' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (
      direction === 'right' &&
      currentIndex < data.mockups.length - 1
    ) {
      newIndex = currentIndex + 1;
    }

    scrollToIndex(newIndex);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        ไม่พบวอลเปเปอร์ที่เลือก
      </div>
    );
  }

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={data.background}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-black/40 backdrop-blur-sm" />
      </div>

      {/* Scrollable mockup */}
      <main
        ref={scrollRef}
        className="fixed top-0 left-0 w-screen h-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory flex z-10 scroll-smooth"
      >
        {data.mockups.map((mockup, index) => (
          <section
            key={index}
            className="h-screen w-screen flex items-center justify-center snap-start flex-shrink-0"
          >
            <div className="relative w-[550px] md:w-[500px] aspect-[9/19]">
              <Image
                src={mockup}
                alt={`Mockup ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </section>
        ))}
      </main>

      {/* Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => handleScroll('left')}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-red-600 rounded-full p-3 shadow-md backdrop-blur-md transition"
          aria-label="เลื่อนไปซ้าย"
        >
          <ChevronLeft size={28} strokeWidth={2.2} />
        </button>
      )}
      {currentIndex < data.mockups.length - 1 && (
        <button
          onClick={() => handleScroll('right')}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-red-600 rounded-full p-3 shadow-md backdrop-blur-md transition"
          aria-label="เลื่อนไปขวา"
        >
          <ChevronRight size={28} strokeWidth={2.2} />
        </button>
      )}

      {/* ต่อไป */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50">
        <Link
          href={`/checkout?theme=${themeKey}`}
          className="bg-red-500 text-white text-xl px-16 py-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          ต่อไป
        </Link>
      </div>

      {/* Dots indicator */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center space-x-2 z-50">
        {data.mockups.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-red-500' : 'bg-white/70'
            } transition-all duration-300`}
          />
        ))}
      </div>
    </>
  );
}
