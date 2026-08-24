import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b",
      messages: [{"role":"user","content":"Hello NVIDIA Nemotron AI!"}],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 100,
    });
    console.log("NVIDIA Output:", completion.choices[0]?.message?.content);
  } catch (err) {
    console.error("NVIDIA API Error:", err.message);
  }
}

main();
