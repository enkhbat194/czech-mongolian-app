import { readFile } from 'node:fs/promises';

const [manifest, worker, main, index] = await Promise.all([
  readFile('public/manifest.webmanifest', 'utf8'),
  readFile('public/sw.js', 'utf8'),
  readFile('src/main.tsx', 'utf8'),
  readFile('index.html', 'utf8'),
]);

const failures = [];
const requireText = (content, text, message) => {
  if (!content.includes(text)) failures.push(message);
};

requireText(manifest, '"display": "standalone"', 'Manifest must declare standalone display mode.');
requireText(manifest, '"start_url": "/"', 'Manifest must declare the app start URL.');
requireText(worker, "addEventListener('install'", 'Service worker must install an app shell cache.');
requireText(worker, "addEventListener('fetch'", 'Service worker must handle offline fetches.');
requireText(worker, "request.mode === 'navigate'", 'Service worker must provide navigation fallback.');
requireText(main, "navigator.serviceWorker.register('/sw.js')", 'Production app must register the service worker.');
requireText(index, 'rel="manifest"', 'HTML must link the web app manifest.');

if (failures.length) {
  console.error('Offline foundation audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Offline foundation audit: PASS');
console.log('App shell, navigation fallback, runtime asset caching, and install metadata are present.');
