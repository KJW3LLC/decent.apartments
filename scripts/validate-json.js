const fs = require('fs');
const path = require('path');

// Files to validate
const JSON_FILES = [
  'topics.json',
  'generated-topics.json',
  'generation-failures.json',
  'package.json'
];

let hasErrors = false;

console.log('🔍 Validating JSON files...\n');

JSON_FILES.forEach(file => {
  const filePath = path.join(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: File not found (skipping)`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    if (file === 'generation-failures.json' && !Array.isArray(data)) {
      throw new Error('generation-failures.json must contain an array');
    }

    console.log(`✅ ${file}: Valid`);
  } catch (error) {
    console.error(`❌ ${file}: Invalid JSON`);
    console.error(`   Error: ${error.message}`);

    // Show context around the error
    if (error.message.includes('position')) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const match = error.message.match(/position (\d+)/);
        if (match) {
          const position = parseInt(match[1]);
          const start = Math.max(0, position - 50);
          const end = Math.min(content.length, position + 50);
          console.error(`   Context: ...${content.substring(start, end)}...`);
        }
      } catch (e) {
        // Ignore context errors
      }
    }

    hasErrors = true;
  }
});

if (hasErrors) {
  console.error('\n❌ JSON validation failed');
  process.exit(1);
} else {
  console.log('\n✅ All JSON files are valid');
  process.exit(0);
}
