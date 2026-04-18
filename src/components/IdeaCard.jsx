import React from 'react';

const IdeaCard = ({ idea, steps = [] }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">{idea}</h3>
      <ul className="list-disc list-inside space-y-1">
        {(steps || []).map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaCard;
