
import { GoogleGenAI } from "@google/genai";

export async function AiSummarize(weatherData, forecastData, locationData) {
  const prompt = `
You are a friendly weather expert. Based on the following weather data, generate a helpful and visually structured summary in plain English.

**Current Weather:**  
${JSON.stringify(weatherData, null, 2)}

**Forecast:**  
${JSON.stringify(forecastData, null, 2)}

**Location:**  
${JSON.stringify(locationData, null, 2)}

---

Format the output as clean HTML. Use the following structure:

<strong>🌤️ Current Conditions</strong><br/>
Summarize temperature, sky, wind, and visibility.

<strong>📅 5-Day Forecast Highlights</strong><br/>
Give a day-by-day breakdown using emojis (☀️, 🌧️, etc.), using <ul> and <li> for readability.

<strong>💡 Suggestions & Tips</strong><br/>
Offer friendly, actionable advice using <ul> and <li>:
- What to wear 🧢
- Hydration 💧
- Sun & rain protection ☂️
-Trip Planning advice for 2 to 3 days

Tone:
- Friendly and concise
- Use clear language
- Tailor everything to <strong>${locationData?.name || "this location"}</strong>

Output only clean HTML. No Markdown or special characters like ** ** or backticks.
`;


  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
    });
    console.log(response.text);

    // Get the raw text
    let html = response.text;

    html = html
      .replace(/^```html\s*/i, '')
      .replace(/```$/g, '')
      .trim();
    print(response.text)
    return html
  }
  catch (error) {
    console.error("Error generating weather summary:", error);
    return null; // Or handle the error appropriately
  }
}

