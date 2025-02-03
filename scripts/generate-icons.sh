#!/bin/bash

# Create directories if they don't exist
mkdir -p public/icons
mkdir -p public/screenshots

# Source image should be at least 512x512
SOURCE_IMAGE="src/assets/logo.png"

# Generate PWA icons
convert "$SOURCE_IMAGE" -resize 72x72 public/icons/icon-72x72.png
convert "$SOURCE_IMAGE" -resize 96x96 public/icons/icon-96x96.png
convert "$SOURCE_IMAGE" -resize 128x128 public/icons/icon-128x128.png
convert "$SOURCE_IMAGE" -resize 144x144 public/icons/icon-144x144.png
convert "$SOURCE_IMAGE" -resize 152x152 public/icons/icon-152x152.png
convert "$SOURCE_IMAGE" -resize 192x192 public/icons/icon-192x192.png
convert "$SOURCE_IMAGE" -resize 384x384 public/icons/icon-384x384.png
convert "$SOURCE_IMAGE" -resize 512x512 public/icons/icon-512x512.png

# Generate Microsoft tile icons
convert "$SOURCE_IMAGE" -resize 70x70 public/icons/ms-icon-70x70.png
convert "$SOURCE_IMAGE" -resize 150x150 public/icons/ms-icon-150x150.png
convert "$SOURCE_IMAGE" -resize 310x310 public/icons/ms-icon-310x310.png

# Generate shortcut icons
convert "$SOURCE_IMAGE" -resize 96x96 public/icons/shortcut-book-96x96.png
convert "$SOURCE_IMAGE" -resize 96x96 public/icons/shortcut-products-96x96.png

# Generate favicon
convert "$SOURCE_IMAGE" -resize 32x32 public/favicon.ico

echo "Icons generated successfully!" 