import 'dotenv/config';
import { auth } from '@/lib/auth';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

function showUsage() {
    console.log('Options:');
    console.log('  -n, --name      User name');
    console.log('  -e, --email     User email');
    console.log('  -p, --password  User password');
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
const password = argv.p || argv.password;

// Validate required arguments
if (!name || !email || !password) {
    console.error('Error: All arguments (-n, -e, -p) are required');
    console.error('');
    showUsage();
    process.exit(1);
}

console.log('Creating admin user...');
console.log(`Name: ${name}`);
console.log(`Email: ${email}`);

auth.api
    .createUser({
        body: {
            email: email,
            password: password,
            name: name,
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
