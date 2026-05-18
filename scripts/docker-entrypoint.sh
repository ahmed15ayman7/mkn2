#!/bin/sh
set -e

if [ -z "${DATABASE_URL}" ] && [ -n "${DATABASE_URI}" ]; then
  export DATABASE_URL="${DATABASE_URI}"
fi

if [ -n "${DATABASE_URL}" ]; then
  echo "Applying database migrations..."
  node ./node_modules/prisma/build/index.js migrate deploy
else
  echo "DATABASE_URL not set; skipping prisma migrate deploy"
fi

exec "$@"
