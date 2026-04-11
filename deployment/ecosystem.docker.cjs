/**
 * PM2 inside Docker — Next.js standalone entry (`server.js` in /app).
 * Host/VM deploys use `deployment/ecosystem.config.cjs` with `next start`.
 */
module.exports = {
  apps: [
    {
      name: "louve-frontend",
      cwd: "/app",
      script: "./server.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
