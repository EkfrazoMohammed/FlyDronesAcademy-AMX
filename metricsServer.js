/* eslint-disable prettier/prettier */
// metricsServer.js
import express from 'express';
import client from 'prom-client';

const app = express();
const register = new client.Registry();

// Collect default metrics like CPU and memory usage
client.collectDefaultMetrics({ register });

// Example of a custom counter for HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

// Endpoint to expose metrics in Prometheus format
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Start the metrics server
const metricsPort = 4001; // Avoid clashing with Vite dev server
app.listen(metricsPort, () => {
  console.log(
    `Prometheus metrics available at http://localhost:${metricsPort}/metrics`,
  );
});
