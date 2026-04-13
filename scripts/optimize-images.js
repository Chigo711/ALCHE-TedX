#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];
const MAX_SIZE = 600;
const IMAGES_DIR = path.join(projectRoot, 'public', 'images');
const SOURCE_DIRS = [
    path.join(projectRoot, 'src'),
    path.join(projectRoot, 'config.js'),
    path.join(projectRoot, 'index.html')
];

// Track filename changes for source code updates
const filenameChanges = new Map();

async function findImages(dir) {
    const images = [];

    if (!fs.existsSync(dir)) {
        return images;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            images.push(...await findImages(fullPath));
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTENSIONS.includes(ext)) {
                images.push(fullPath);
            }
        }
    }

    return images;
}

async function processImage(imagePath) {
    const ext = path.extname(imagePath).toLowerCase();
    const basename = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);

    // Skip favicon and icon files
    if (basename.includes('favicon') || basename.includes('android-chrome') || basename.includes('apple-touch')) {
        console.log(`⏭️  Skipping icon file: ${path.relative(projectRoot, imagePath)}`);
        return;
    }

    try {
        const image = sharp(imagePath);
        const metadata = await image.metadata();

        const needsResize = metadata.width > MAX_SIZE || metadata.height > MAX_SIZE;
        const needsConvert = ext !== '.png';

        if (!needsResize && !needsConvert) {
            console.log(`✅ Already optimized: ${path.relative(projectRoot, imagePath)}`);
            return;
        }

        let pipeline = image;

        // Resize if needed
        if (needsResize) {
            pipeline = pipeline.resize(MAX_SIZE, MAX_SIZE, {
                fit: 'inside',
                withoutEnlargement: true
            });
            console.log(`📐 Resizing: ${metadata.width}x${metadata.height} -> max ${MAX_SIZE}px`);
        }

        // Convert to PNG
        pipeline = pipeline.png({ quality: 90 });

        const newFilename = `${basename}.png`;
        const newPath = path.join(dir, newFilename);

        // Write the new file
        await pipeline.toFile(newPath + '.tmp');

        // If extension changed, track for source code updates
        if (needsConvert && imagePath !== newPath) {
            const oldRelative = path.relative(path.join(projectRoot, 'public'), imagePath);
            const newRelative = path.relative(path.join(projectRoot, 'public'), newPath);
            filenameChanges.set(oldRelative, newRelative);
            filenameChanges.set('/' + oldRelative, '/' + newRelative);
            filenameChanges.set('/images/' + path.basename(imagePath), '/images/' + newFilename);

            // Delete old file
            fs.unlinkSync(imagePath);
            console.log(`🗑️  Deleted old file: ${path.relative(projectRoot, imagePath)}`);
        }

        // Rename temp file to final
        if (fs.existsSync(newPath) && imagePath !== newPath) {
            fs.unlinkSync(newPath);
        }
        fs.renameSync(newPath + '.tmp', newPath);

        console.log(`✨ Processed: ${path.relative(projectRoot, newPath)}`);

    } catch (error) {
        console.error(`❌ Error processing ${imagePath}:`, error.message);
    }
}

function findSourceFiles(target) {
    const files = [];

    if (!fs.existsSync(target)) {
        return files;
    }

    const stat = fs.statSync(target);

    if (stat.isFile()) {
        const ext = path.extname(target).toLowerCase();
        if (['.js', '.svelte', '.html', '.css', '.json'].includes(ext)) {
            files.push(target);
        }
    } else if (stat.isDirectory()) {
        const entries = fs.readdirSync(target, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
            files.push(...findSourceFiles(path.join(target, entry.name)));
        }
    }

    return files;
}

function updateSourceCode() {
    if (filenameChanges.size === 0) {
        console.log('\n📝 No filename changes to update in source code.');
        return;
    }

    console.log('\n📝 Updating source code references...\n');

    const allSourceFiles = [];
    for (const target of SOURCE_DIRS) {
        allSourceFiles.push(...findSourceFiles(target));
    }

    for (const filePath of allSourceFiles) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        for (const [oldName, newName] of filenameChanges) {
            if (content.includes(oldName)) {
                content = content.split(oldName).join(newName);
                modified = true;
                console.log(`   ${path.relative(projectRoot, filePath)}: ${oldName} → ${newName}`);
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

async function main() {
    console.log('🖼️  Image Optimization Script');
    console.log('============================\n');
    console.log(`Max dimensions: ${MAX_SIZE}x${MAX_SIZE}px`);
    console.log(`Output format: PNG\n`);

    const images = await findImages(IMAGES_DIR);

    if (images.length === 0) {
        console.log('No images found to process.');
        return;
    }

    console.log(`Found ${images.length} image(s) to process:\n`);

    for (const imagePath of images) {
        await processImage(imagePath);
    }

    updateSourceCode();

    console.log('\n✅ Done!');
}

main().catch(console.error);
