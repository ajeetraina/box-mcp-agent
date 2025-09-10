#!/bin/bash

# Quick start script for README Analyzer Agent

echo "🚀 Starting README Analyzer Agent..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Pull required images
echo "📥 Pulling required images..."
docker compose pull

# Start the services
echo "🔄 Starting services..."
docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service status..."
docker compose ps

echo ""
echo "✅ README Analyzer Agent is running!"
echo ""
echo "🌐 Access points:"
echo "   • Main Agent:  http://localhost:7777"
echo "   • React UI:    http://localhost:3001"  
echo "   • OpenWebUI:   http://localhost:3000"
echo ""
echo "💡 Try typing 'analyze readme' in any interface!"
echo ""
echo "📋 Useful commands:"
echo "   • View logs:    docker compose logs -f"
echo "   • Stop:         docker compose down"
echo "   • Restart:      docker compose restart"
echo ""
