# Etapa de construcción
FROM node:21-alpine3.18 as builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

COPY package*.json *-lock.yaml ./
RUN apk add --no-cache python3 make g++ && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
RUN apk del python3 make g++

# Etapa de despliegue
FROM node:21-alpine3.18 as deploy
WORKDIR /app

ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

COPY --from=builder /app/assets ./assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json /app/*-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate 
ENV PNPM_HOME=/usr/local/bin

# Configurar permisos
RUN npm cache clean --force && pnpm install --production --ignore-scripts \
    && addgroup -g 1001 -S nodejs && adduser -S -u 1001 nodejs

# Asegurar permisos en /app
RUN chown -R nodejs:nodejs /app
RUN touch /app/core.class.log && chown nodejs:nodejs /app/core.class.log && chmod 666 /app/core.class.log

# Usar usuario con permisos adecuados
USER nodejs

CMD ["pnpm", "start"]
