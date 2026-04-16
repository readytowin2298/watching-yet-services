import 'dotenv/config';  // Must be FIRST
import fetchTranslation from './fetchTranslation.js';

async function main() {
  const arg = process.argv[2];

  if (!arg) {
    console.error('Please provide a translation code or comma-separated list. Example: kjv,kjva,bsb');
    process.exit(1);
  }

  const codes = arg.split(',').map(code => code.trim());

  console.log(`Seeding ${codes.length} translation(s): ${codes.join(', ')}`);

  for (const code of codes) {
    console.log(`\nFetching translation: ${code}`);
    await fetchTranslation(code);
    console.log(`Done: ${code}`);
  }

  console.log('\nAll translations seeded successfully.');
}

main().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});