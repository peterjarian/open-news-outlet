import 'dotenv/config';
import { auth } from '@/lib/auth';
import minimist from 'minimist';
import { randomBytes } from 'crypto';

const argv = minimist(process.argv.slice(2));

function showUsage() {
  console.log('Options:');
  console.log('  -n, --name      User name');
  console.log('  -e, --email     User email');
  console.log('  -h, --help      Show this help message');
}

// Check for help flag
if (argv.h || argv.help) {
  showUsage();
  process.exit(0);
}

// Get arguments
const name = argv.n || argv.name;
const email = argv.e || argv.email;

// Validate required arguments
if (!name || !email) {
  console.error('Error: All arguments (-n, -e) are required');
  console.error('');
  showUsage();
  process.exit(1);
}

console.log('Creating admin user...');

auth.api
  .createUser({
    body: {
      email: email,
      name: name,
      // We use a invite-like system so we don't have passwords.
      // Still, better-auth doesn't allow users to be created without a password.
      password: randomBytes(32).toString('hex'),
      role: 'admin',
    },
  })
  .then(() => {
    console.log('Admin user created successfully!');
  })
  .catch((error) => {
    console.error('Error creating admin user:', error);
    process.exit(1);
  });
