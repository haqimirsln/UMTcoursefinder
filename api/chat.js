export const config = { runtime: 'edge' };

export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const body = await req.json();
    const key = process.env.OPENROUTER_API_KEY;

    // Debug: return key info before even calling OpenRouter
    if (!key) {
      return new Response(JSON.stringify({
        content: [{ type: 'text', text: 'DEBUG: OPENROUTER_API_KEY is missing!' }]
      }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'HTTP-Referer': 'https://umt.edu.my',
        'X-Title': 'UMT Course Finder',
      },
      body: JSON.stringify({
model: 'openrouter/auto',
        max_tokens: 500,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    // Debug: show raw OpenRouter response if no choices
    if (!data.choices?.[0]?.message?.content) {
      return new Response(JSON.stringify({
        content: [{ type: 'text', text: 'DEBUG: ' + JSON.stringify(data) }]
      }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    const text = data.choices[0].message.content;
    return new Response(JSON.stringify({
      content: [{ type: 'text', text }]
    }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });

  } catch (err) {
    return new Response(JSON.stringify({
      content: [{ type: 'text', text: 'DEBUG ERROR: ' + err.message }]
    }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}
