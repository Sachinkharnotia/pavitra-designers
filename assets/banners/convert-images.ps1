# Convert banner source images to WebP hero and thumbnail files
# Place your source images into assets/banners/raw

$sourceFolder = "assets/banners/raw"
$destFolder = "assets/banners"

New-Item -ItemType Directory -Path $destFolder -Force | Out-Null

# Map source files to hero files. Rename your source files as hero-src-1.jpg, hero-src-2.jpg, hero-src-3.jpg.
$files = @(
    @{src = "hero-src-1.jpg"; hero = "hero-1.webp"; thumb = "thumb-1.webp"},
    @{src = "hero-src-2.jpg"; hero = "hero-2.webp"; thumb = "thumb-2.webp"},
    @{src = "hero-src-3.jpg"; hero = "hero-3.webp"; thumb = "thumb-3.webp"}
)

if (-not (Test-Path $sourceFolder)) {
    Write-Error "Source folder not found: $sourceFolder"
    return
}

foreach ($item in $files) {
    $srcPath = Join-Path $sourceFolder $item.src
    if (-not (Test-Path $srcPath)) {
        Write-Warning "Missing source file: $srcPath"
        continue
    }

    $heroPath = Join-Path $destFolder $item.hero
    $thumbPath = Join-Path $destFolder $item.thumb

    if (Get-Command magick -ErrorAction SilentlyContinue) {
        magick $srcPath -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 78 -strip $heroPath
        magick $heroPath -resize 200x200^ -gravity center -extent 200x200 -quality 75 -strip $thumbPath
        Write-Host "Converted $srcPath -> $heroPath and $thumbPath"
    }
    elseif (Get-Command cwebp -ErrorAction SilentlyContinue) {
        $tmpJpg = "$env:TEMP\hero-temp-$([guid]::NewGuid()).jpg"
        magick $srcPath -resize 1920x1080^ -gravity center -extent 1920x1080 $tmpJpg
        cwebp -q 78 $tmpJpg -o $heroPath | Out-Null
        magick $tmpJpg -resize 200x200^ -gravity center -extent 200x200 $tmpJpg
        cwebp -q 75 $tmpJpg -o $thumbPath | Out-Null
        Remove-Item $tmpJpg -Force
        Write-Host "Converted $srcPath -> $heroPath and $thumbPath"
    }
    else {
        Write-Error "No ImageMagick or cwebp available. Install one and rerun."
        return
    }
}

Write-Host "Conversion complete. Place your new WebPs in assets/banners/ and reload the page."