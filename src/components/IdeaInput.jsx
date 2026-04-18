import React from 'react';

function IdeaInput({ input, setInput, onGenerate, loading }) {
  return (
    <>
      <textarea
        className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-white resize-none"
        rows={5}
        placeholder="Enter your topic, vibe, or idea here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-200 font-semibold py-3 rounded-xl"
        onClick={onGenerate}
      >
        {loading ? '⏳ Generating...' : 'Generate Post'}
      </button>
    </>
  );
}

export default IdeaInput;
