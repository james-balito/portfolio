import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './App.css'
import Body from './layout/body'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const saved = localStorage.getItem('theme');
  //   return saved === 'dark';
  // });
  const [showMainContent, setShowMainContent] = useState(false);

  const bodyRef = useRef(null);
  const introRef = useRef(null);
  const introTextRef = useRef(null);
  const overlayRef = useRef(null);

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('light');
  //     localStorage.setItem('theme', 'dark');
  //   } else {
  //     document.documentElement.classList.remove('light');
  //     localStorage.setItem('theme', 'light');
  //   }
  // }, [isDarkMode]);

  // Opening animation with text reveal
  useEffect(() => {
    // Hide main content initially
    gsap.set([bodyRef.current], {
      opacity: 0,
      y: 30
    });

    const openingTl = gsap.timeline({
      onComplete: () => {
        setShowMainContent(true);
        startEntranceAnimation();
      }
    });

    // Animate intro text
    openingTl.fromTo(introTextRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(0.7)"
      }
    )
      .to(introTextRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        delay: 0.8,
        ease: "power2.in"
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        pointerEvents: "none"
      });

  }, []);

  const startEntranceAnimation = () => {
    const tl = gsap.timeline();

    tl.to(bodyRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
  };

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  gsap.registerPlugin(ScrollTrigger);

  return (
    <div className="App">
      {/* Opening Animation Overlay */}
      {!showMainContent && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-color)]"
        >
          <div ref={introRef}>
            <h1
              ref={introTextRef}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              James Balito
            </h1>
          </div>
        </div>
      )}

      <div ref={bodyRef} className='opacity-0'>
        <Body />
      </div>
    </div>
  )
}

export default App