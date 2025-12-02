const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const randomPhone = Math.floor(1000000000 + Math.random() * 9000000000).toString();


    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });
        console.log('Existing user updated to ADMIN:', user);
    } else {
        const user = await prisma.user.create({
            data: {
                email,
                name: 'Admin User',
                password: hashedPassword,
                phone: randomPhone,
                role: 'ADMIN',
            },
        });
        console.log('New Admin user created:', user);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
