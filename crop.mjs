import sharp from 'sharp';

async function generateFavicon() {
    const inputImagePath = 'C:\\Users\\Jooyoung\\.gemini\\antigravity\\brain\\020f8a6c-6623-4e74-9fa6-1bbadfd4b9e3\\media__1772511135421.jpg';
    const outputPath = 'public/favicon.jpg';

    try {
        await sharp(inputImagePath)
            .resize(256, 256, {
                fit: 'cover',
                position: 'top' // Shift the crop upwards to see more of the face
            })
            .toFile(outputPath);
        console.log('Successfully created face favicon!');
    } catch (err) {
        console.error('Error generating favicon:', err);
    }
}

generateFavicon();
