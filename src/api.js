// src/api.js
import axios from 'axios';

// We no longer need the apiKey here because the proxy handles it!
export const generateIdeas = async (promptText) => {
  try {
    const response = await axios.post(
      '/api/openrouter-proxy', // Change this to your proxy endpoint
      {
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: `You are an expert content creator. Given the niche: "${promptText}", generate a list of 10 viral short-form content ideas...`.trim()
          }
        ]
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    return content?.split('\n').filter(line => line.trim()) || ['❌ No content returned'];
  } catch (error) {
    console.error('Error generating ideas:', error);
    return ['❌ Error generating ideas.'];
  }
};

export const generateStepsForIdea = async (idea) => {
  try {
    const response = await axios.post(
      '/api/openrouter-proxy', 
      {
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: 'You are a creative strategist who breaks ideas into actionable content execution steps.'
          },
          {
            role: 'user',
            content: `Turn the following viral short-form content idea into a Reels/Shorts script with 5 punchy action steps. Idea: "${idea}"...`.trim()
          }
        ]
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    return content?.split('\n').filter(line => line.trim()) || ['⚠️ No useful steps returned.'];
  } catch (error) {
    console.error('Error generating steps:', error);
    return ['⚠️ Could not generate steps.'];
  }
};