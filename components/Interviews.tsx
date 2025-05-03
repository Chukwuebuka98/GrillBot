import React from 'react';
import InterviewCard from './InterviewCard';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getInterViewByUserId,
  getLatestInterviws,
} from '@/lib/actions/general.action';

const Interviews = async () => {
  const user = await getCurrentUser();
  if (!user?.id) {
    return null;
  }

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterViewByUserId(user.id),
    await getLatestInterviws({
      userId: user.id,
    }),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <div className="max-w-[1240px] mx-auto px-4">
      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}

          {/* <p>You have not taken any interview yet</p> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Interviews;
