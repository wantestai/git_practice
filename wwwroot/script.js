const form = document.getElementById('generator-form');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');

function buildPrompt(data) {
  const keyPoints = data.keyPoints
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => `${index + 1}. ${line}`)
    .join('\n');

  return `Create a high-impact infographic in French.

Topic: ${data.topic}
Target audience: ${data.audience}
Visual style: ${data.style}
Output format: ${data.format}
Editorial tone: ${data.tone}
Number of sections: ${data.sections}
Main color palette: ${data.palette}

Mandatory structure:
- A bold headline section with a concise value proposition.
- ${data.sections} clearly separated content blocks with visual hierarchy.
- Icons, charts or visual metaphors to support comprehension.
- Clear CTA in the final block.

Key points to include:
${keyPoints}

Design constraints:
- Keep spacing breathable and typography highly legible.
- Use contrast to guide reading order.
- Prioritize concise wording and data storytelling.
- Final result must look premium and social-media ready.`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    topic: document.getElementById('topic').value,
    audience: document.getElementById('audience').value,
    style: document.getElementById('style').value,
    format: document.getElementById('format').value,
    tone: document.getElementById('tone').value,
    sections: document.getElementById('sections').value,
    keyPoints: document.getElementById('keyPoints').value,
    palette: document.getElementById('palette').value
  };

  output.value = buildPrompt(formData);
});

copyBtn.addEventListener('click', async () => {
  if (!output.value.trim()) {
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    copyBtn.textContent = 'Copié !';
    setTimeout(() => {
      copyBtn.textContent = 'Copier';
    }, 1500);
  } catch {
    copyBtn.textContent = 'Échec copie';
    setTimeout(() => {
      copyBtn.textContent = 'Copier';
    }, 1500);
  }
});
