// The app itself. Its risks live in risks/risks.md.
const server = Bun.serve({ port: 3000, fetch: () => new Response('Hello from bun-app') });
console.log(`Listening on ${server.url}`);
