#!/bin/bash
# AppCN — Start script
# Usage: ./start.sh [--host] [--port PORT]
#   --host    Écoute sur toutes les interfaces (accessible réseau local)
#   --port    Port personnalisé (défaut: 5173)

PORT=${2:-5173}
HOST_FLAG=""

if [ "$1" = "--host" ] || [ "$1" = "-h" ]; then
  HOST_FLAG="--host 0.0.0.0"
  echo "🔓 Mode réseau local activé (accessible depuis d'autres appareils)"
fi

echo "📦 Installation des dépendances si nécessaire..."
npm install --silent

echo "🏗️  Build..."
npx vite build --silent

echo ""
echo "🚀 AppCN lancé sur http://localhost:$PORT/CN/"
if [ -n "$HOST_FLAG" ]; then
  echo "   Réseau local: http://$(hostname -I | awk '{print $1}'):$PORT/CN/"
fi
echo "   Via Caddy : https://guaiguai2.duckdns.org/CN/"
echo "   Appuyez sur Ctrl+C pour arrêter"
echo ""

npx vite preview --port "$PORT" $HOST_FLAG
