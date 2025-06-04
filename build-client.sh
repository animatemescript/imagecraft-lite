#!/bin/bash

# ImageCraft Lite - Client Build Script for Netlify Deployment

echo "Building ImageCraft Lite for static deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build client-only version
echo "Building client application..."
npx vite build

echo "Build complete! Deploy the 'dist' folder to Netlify."
echo "Build artifacts are ready in: ./dist"