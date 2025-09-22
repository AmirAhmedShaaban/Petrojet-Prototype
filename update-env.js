// update-env.js
const fs = require('fs');

const PORT = 43437; // Same port used in live-server
const newOrigin = `CLIENT_ORIGIN=http://127.0.0.1:${PORT}`;

let env = '';
try {
  env = fs.readFileSync('.env', 'utf-8');
} catch (e) {
  console.log('ℹ️ No existing .env file found, creating a new one...');
}

if (env.includes('CLIENT_ORIGIN=')) {
  env = env.replace(/CLIENT_ORIGIN=.*/, newOrigin);
} else {
  if (env.length && !env.endsWith('\n')) env += '\n';
  env += newOrigin;
}

fs.writeFileSync('.env', env);
console.log('✅ .env updated:', newOrigin);
