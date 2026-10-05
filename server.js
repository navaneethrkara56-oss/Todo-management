import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const jsonServerPath = require.resolve('json-server/lib/bin.js');
const port = process.env.PORT || 3000;

const server = spawn(process.execPath, [jsonServerPath, 'db.json', '--host', '0.0.0.0', '--port', port], {
  stdio: 'inherit'
});

server.on('close', code => process.exit(code));