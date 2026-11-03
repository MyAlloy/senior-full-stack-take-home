FROM node:22-slim
RUN corepack enable
USER node
WORKDIR /app
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node apps/api/package.json apps/api/
COPY --chown=node:node apps/web/package.json apps/web/
# Dependency install scripts stay off; esbuild is the one known package that needs its own.
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm rebuild esbuild
COPY --chown=node:node . .
EXPOSE 4000 5173
CMD ["pnpm", "dev"]
