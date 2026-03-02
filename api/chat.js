export const config = { runtime: 'edge' };

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const models = [
    'arcee-ai/trinity-large-preview:free',
    'stepfun/step-3-5-flash:free',
    'z-ai/glm-4.5-air:free',
    'nvidia/nemotron-3-nano-30b-a3b:free',
  ];
  try {
    const body = await req.json();
    let lastError = '';

    for (const model of models) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://umt.edu.my',
            'X-Title': 'UMT Course Finder',
          },
          body: JSON.stringify({
            model,
            max_tokens: 800,
            messages: body.messages,
          }),
        });

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (text) {
          return new Response(JSON.stringify({
            content: [{ type: 'text', text }]
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        lastError = JSON.stringify(data.error || 'No content');
      } catch (e) {
        lastError = e.message;
      }
    }

    // All models failed
    return new Response(JSON.stringify({
      content: [{ type: 'text', text: `Sorry, all models are currently unavailable. Please contact UMT at +609-633 3333. (${lastError})` }]
    }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
