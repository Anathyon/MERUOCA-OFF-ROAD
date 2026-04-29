import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const assetsDir = '/home/maxuel/MERUOCA-OFF-ROAD/MERUOCA-OFF-ROAD/public/assets';

const files = fs.readdirSync(assetsDir);

files.forEach(file => {
  const filePath = path.join(assetsDir, file);
  const ext = path.extname(file).toLowerCase();
  
  if (ext === '.mp4') {
    console.log(`Optimizing video: ${file}`);
    const tempPath = filePath + '.tmp.mp4';
    try {
      // Compress video: scale to 720p, crf 28 (good balance), fast preset
      execSync(`ffmpeg -i "${filePath}" -vf "scale=-2:720" -vcodec libx264 -crf 30 -preset fast -y "${tempPath}"`);
      fs.renameSync(tempPath, filePath);
    } catch (e) {
      console.error(`Failed to optimize ${file}:`, e);
    }
  } else if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
    if (file === 'favicon.png' || file.includes('LOGO')) return; // skip small/brand assets
    
    console.log(`Optimizing image: ${file}`);
    const tempPath = filePath + '.tmp' + ext;
    try {
      // Resize to max 1920px width, quality 75
      execSync(`magick "${filePath}" -resize 1920x\> -quality 75 "${tempPath}"`);
      fs.renameSync(tempPath, filePath);
    } catch (e) {
      console.error(`Failed to optimize ${file}:`, e);
    }
  }
});

console.log('Optimization complete!');
