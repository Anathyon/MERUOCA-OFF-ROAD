#!/bin/bash

ASSETS_DIR="/home/maxuel/MERUOCA-OFF-ROAD/MERUOCA-OFF-ROAD/public/assets"

cd "$ASSETS_DIR"

for file in *; do
    ext="${file##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    if [ "$ext" == "mp4" ]; then
        echo "Optimizing video: $file"
        # Try libopenh264
        ffmpeg -i "$file" -vf "scale=-2:720" -vcodec libopenh264 -b:v 1500k -maxrate 2000k -bufsize 3000k -an -y "tmp_$file"
        if [ -f "tmp_$file" ]; then
            mv "tmp_$file" "$file"
        else
            echo "Failed to optimize $file with libopenh264"
        fi
    elif [ "$ext" == "jpeg" ] || [ "$ext" == "jpg" ] || [ "$ext" == "png" ]; then
        if [[ "$file" == *"favicon"* ]] || [[ "$file" == *"LOGO"* ]]; then
            continue
        fi
        echo "Optimizing image: $file"
        magick "$file" -resize 1920x\> -quality 70 "tmp_$file"
        if [ -f "tmp_$file" ]; then
            mv "tmp_$file" "$file"
        fi
    fi
done

echo "Optimization complete!"
