import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const rootElement = document.getElementById('root');

function showStartupError(error: unknown) {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  if (!rootElement) return;

  rootElement.innerHTML = `
    <main style="min-height:100dvh;background:#0C0C0E;color:#FFF;font-family:Inter,system-ui,sans-serif;padding:24px;box-sizing:border-box">
      <section style="max-width:560px;margin:0 auto;background:#1C1C1F;border:1px solid #7F1D1D;border-radius:18px;padding:18px">
        <p style="margin:0 0 8px;color:#F87171;font-weight:800">Апп эхлэх үед алдаа гарлаа</p>
        <p style="margin:0 0 12px;color:#D1D1D6;line-height:1.5">Доорх error-ийг screenshot хийгээд явуул. Хар дэлгэцийн шалтгааныг ингэж шууд харна.</p>
        <pre style="margin:0;white-space:pre-wrap;word-break:break-word;background:#141416;border-radius:12px;padding:12px;color:#FCA5A5;font-size:13px">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      </section>
    </main>
  `;
}

void import('./App.tsx')
  .then(({ default: App }) => {
    if (!rootElement) return;
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch(showStartupError);

window.addEventListener('error', (event) => showStartupError(event.error ?? event.message));
window.addEventListener('unhandledrejection', (event) => showStartupError(event.reason));
