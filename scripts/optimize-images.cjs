/**
 * Image Optimization Script
 * Converts PNG/JPEG to WebP and resizes for mobile
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const MAX_WIDTH = 800; // Max width for mobile
const WEBP_QUALITY = 80;

async function optimizeImages() {
  const files = fs.readdirSync(ASSETS_DIR);
  const imageFiles = files.filter(f => /\.(png|jpe?g)$/i.test(f));
  
  console.log(`Found ${imageFiles.length} images to optimize...\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(ASSETS_DIR, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(ASSETS_DIR, `${baseName}.webp`);
    
    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginal += originalStats.size;
      
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Resize if wider than MAX_WIDTH, convert to WebP
      let pipeline = sharp(inputPath);
      
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      
      await pipeline
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);
      
      const optimizedStats = fs.statSync(outputPath);
      totalOptimized += optimizedStats.size;
      
      const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
      console.log(`✅ ${file} → ${baseName}.webp (${formatSize(originalStats.size)} → ${formatSize(optimizedStats.size)}, -${savings}%)`);
      
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }
  
  console.log(`\n📊 Total: ${formatSize(totalOriginal)} → ${formatSize(totalOptimized)}`);
  console.log(`💾 Saved: ${formatSize(totalOriginal - totalOptimized)} (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%)`);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

optimizeImages().catch(console.error);
