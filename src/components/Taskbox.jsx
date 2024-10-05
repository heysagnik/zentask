import React from 'react';
import './matrix.css';
export const Taskbox = ({ title, task }) => {
  return (
   <div className='matrix-container'>
   {/*Do It*/}
    <div className='matrix-card do-it'>
      <h2>✔️ Do It</h2>
      <p>Things with clear deadlines and consequences for not taking immediate action.</p>
        <h3>Examples</h3>
        <ul>
          <li>Finishing a client project</li>
          <li>Submitting a draft article</li>
          <li>Responding to some emails</li>
          <li>Picking up your sick kid from school</li>
        </ul>
    </div>
     {/* Schedule It */}
     <div className="matrix-card schedule-it">
        <h2>🕑 Schedule It</h2>
        <p>Activities without a set deadline that bring you closer to your goals. Easy to procrastinate on.</p>
        <h3>Examples</h3>
        <ul>
          <li>Strategic planning</li>
          <li>Professional development</li>
          <li>Networking</li>
          <li>Exercise</li>
        </ul>
      </div>

      {/* Delegate It */}
      <div className="matrix-card delegate-it">
        <h2>👤➕ Delegate It</h2>
        <p>Things that need to be done, but don’t require your specific skills. Busy work.</p>
        <h3>Examples</h3>
        <ul>
          <li>Uploading blog posts</li>
          <li>Scheduling</li>
          <li>Responding to some emails</li>
          <li>Meal prep</li>
        </ul>
      </div>

      {/* Delete It */}
      <div className="matrix-card delete-it">
        <h2>🗑️ Delete It</h2>
        <p>Distractions that make you feel worse afterward. Can be okay but only in moderation.</p>
        <h3>Examples</h3>
        <ul>
          <li>Social media</li>
          <li>Watching TV</li>
          <li>Video games</li>
          <li>Eating junk food</li>
        </ul>
      </div>
    
   </div> 
  );
};
