'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const HeroContent = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ['for Practice', 'for Improvement', 'for Success'],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="flex gap-3 flex-col">
      <h1 className="text-3xl md:text-5xl max-w-2xl tracking-tighter text-center font-regular">
        <span>AI-Powered Interview Coach</span>
        <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
          &nbsp;
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute font-semibold text-primary-200"
              initial={{ opacity: 0, y: '-100' }}
              transition={{ type: 'spring', stiffness: 50 }}
              animate={
                titleNumber === index
                  ? {
                      y: 0,
                      opacity: 1,
                    }
                  : {
                      y: titleNumber > index ? -150 : 150,
                      opacity: 0,
                    }
              }
            >
              {title}
            </motion.span>
          ))}
        </span>
      </h1>

      <p className="text-sm md:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-lg md:max-w-2xl text-center px-6 nd:px-0">
        GrillBot helps you prepare for job interviews with AI-driven mock
        sessions, real-time feedback, and personalized insights. Sharpen your
        skills and boost your confidence before the big day!
      </p>
    </div>
  );
};

export default HeroContent;
