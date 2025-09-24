#!/bin/bash
set -e

echo "🚀 Starting DevJob build process..."

# Navigate to frontend directory
cd projt

echo "📦 Installing dependencies..."
npm ci --only=production

echo "🏗️ Building application..."
npx vite build --base=./

echo "✅ Build completed successfully!"
ls -la dist/
