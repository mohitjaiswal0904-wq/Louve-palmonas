/**
 * PM2 — run from frontend root: pnpm exec pm2 start deployment/ecosystem.config.cjs
 * Rebuild + reload: make restart (from louve-frontend root)
 */
const path = require("path");

const root = path.resolve(__dirname, "..");

module.exports = {
  apps: [
    {
      name: "louve-frontend",
      cwd: root,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
