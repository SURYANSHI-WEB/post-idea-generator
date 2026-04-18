import React, { useState } from 'react';

const IdeaList = ({ ideas }) => {
  return (
    <div className="grid gap-6 mt-8">
      {ideas.map(({ idea, steps }, index) => (
        <IdeaCard key={index} idea={idea} steps={steps} />
      ))}
    </div>
  );
};

const IdeaCard = ({ idea, steps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.01] border border-gray-700">
      {/* Title with gradient & neon glow */}
      <div
        className="cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-md">
          {idea}
        </h3>
        <p className="text-sm text-gray-400 mt-1">Click to view steps</p>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="mt-4 animate-fadeIn">
          <p className="font-semibold text-green-400 mb-2">How to:</p>
          <ul className="space-y-3 pl-4 border-l-2 border-purple-500">
            {steps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-200"
              >
                <span className="text-purple-400"></span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdeaList;
