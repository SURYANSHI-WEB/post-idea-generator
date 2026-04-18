// src/api.js
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const generateIdeas = async (promptText) => {
  if (!apiKey) return ['⚠️ Missing API key.'];

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: `
You are an expert content creator.

Given the niche: "${promptText}", generate a list of 10 viral short-form content ideas for Instagram Reels or YouTube Shorts.

Each idea should be:
- Short and catchy (1 line)
- Targeted to creators, influencers, or startups
- NOT educational definitions or explanations
- Written as post titles, e.g., "3 signs you're overthinking", "How rich people actually save money"

Return only the list, no extra text.
            `.trim()
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
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
  if (!apiKey) return ['⚠️ Missing API key.'];

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: 'You are a creative strategist who breaks ideas into actionable content execution steps.'
          },
          {
            role: 'user',
            content: `
Turn the following viral short-form content idea into a Reels/Shorts script with 5 punchy action steps.

Idea: "${idea}"

Instructions:
- Each step must be 1 line max
- No fluff, just practical direction for creators
- Avoid generic intros or conclusions

Return ONLY:
* [Step Title]
How to:
1. ...
2. ...
3. ...
4. ...
5. ...
            `.trim()
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    return content?.split('\n').filter(line => line.trim()) || ['⚠️ No useful steps returned.'];
  } catch (error) {
    console.error('Error generating steps:', error);
    return ['⚠️ Could not generate steps.'];
  }
};
