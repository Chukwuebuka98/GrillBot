import { dummyInterviews } from '@/constants';
import React from 'react';
import InterviewCard from './InterviewCard';

const Interviews = () => {
  return (
    <div className="max-w-[1240px] mx-auto px-4">
      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}

          {/* <p>You have not taken any interview yet</p> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Interviews;
