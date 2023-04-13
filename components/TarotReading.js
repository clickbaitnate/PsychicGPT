import React, { useState, useEffect } from 'react';

const TarotReading = ({ cards }) => {
  const [reading, setReading] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setApiKey(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    }

    if (cards.length > 0) {
      generateTarotReading(cards);
    }
  }, [cards, apiKey]);

  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    localStorage.setItem('openai_api_key', newApiKey);
  };

  const generateTarotReading = async (cards) => {
    const prompt = "I will now read you your fortune based on the following cards. I will get straight to the point and be brutally honest:";
    const cardNames = cards.map(card => `${card.name}${card.inverted === 1 ? ' (Reversed)' : ''}`).join(', ');
    const fullPrompt = `${prompt} Based on these cards: ${cardNames}, give a personalized reading and interpretation.`;
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a tarot reader who gives short, brutally honest and concise tarot readings the size of 2 twitter posts.' },
            { role: 'user', content: fullPrompt },
          ],
          temperature: 0.5,
        }),
      });
  
      const json = await response.json();
      const assistantMessage = json.choices[0].message.content.trim();
      setReading(assistantMessage);
    } catch (error) {
      console.error('Error generating tarot reading:', error);
    }
  };
   

  return (
    <div>
      <label>
        OpenAI API Key:
        <input
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter your OpenAI API Key"
        />
      </label>
      <h2>AI's Analysis of Your Situation</h2>
      <p><i>Needs an OpenAI API key to work. May take up to a minute.</i></p>
      <p>{reading}</p>
    </div>
  );
};

export default TarotReading;





