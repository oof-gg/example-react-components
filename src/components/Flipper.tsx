import React, { useState, useEffect, useRef, FC } from 'react';
import gsap from 'gsap';

interface Props {
  wordList: string[];
}

const Flipper: FC<Props> = ({ wordList }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track current word index
  const wordRef = useRef<HTMLDivElement>(null); // Ref to the word element

  const words = React.useMemo(() => wordList, [wordList]); // Array of words to flip

  useEffect(() => {
    const flipTimeline = gsap.timeline({
      repeat: -1, // Infinite loop
      repeatDelay: 1, // Delay between repeats
      onRepeat: () => {
        // Update the word index after each flip
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      },
    });

    // Flip animation for the entire word
    flipTimeline
      .to(wordRef.current, { rotationX: 90, duration: 0.2, ease: 'power1.in', onComplete: () => {
          // Change the word when the flip reaches 90 degrees (hidden)
          if (wordRef.current) {
            wordRef.current.textContent = words[currentWordIndex];
          }
        }
      })
      .to(wordRef.current, { rotationX: 0, duration: 0.2, ease: 'power1.out' });

    return () => {
      flipTimeline.kill(); // Cleanup the animation on unmount
    };
  }, [currentWordIndex, words]);

  return (
    <div style={{ perspective: '1000px', display: 'flex', justifyContent: 'left', alignItems: 'center', height: '60px', width: '250px' }}>
      <div
        ref={wordRef}
        style={{
          fontWeight: 'bold',
          display: 'inline-block',
          color: 'white',
          transformOrigin: 'center center',
          textAlign: 'left',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {words[0]} {/* Initial word */}
      </div>
    </div>
  );
};

export default Flipper;
