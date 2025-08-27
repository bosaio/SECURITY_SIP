import { PrismaClient } from '@prisma/client'
import { userService } from '../services/userService'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting database setup...')

  try {
    // Check if admin user already exists
    const adminExists = await userService.adminExists()
    
    if (adminExists) {
      console.log('✅ Admin user already exists, skipping setup')
      return
    }

    // Create admin user
    console.log('👤 Creating admin user...')
    const adminUser = await userService.createAdminUser(
      'admin@securitysip.com',
      'admin123',
      'Security SIP Admin'
    )

    console.log('✅ Admin user created successfully!')
    console.log(`📧 Email: ${adminUser.email}`)
    console.log(`🔑 Password: admin123`)
    console.log('⚠️  Please change this password after first login!')

    // Create some initial categories
    console.log('🏷️  Creating initial categories...')
    const categories = [
      { name: 'Application Security', color: 'blue', description: 'Web and mobile application security' },
      { name: 'API Security', color: 'green', description: 'API and microservices security' },
      { name: 'Vulnerability Assessment', color: 'red', description: 'Security testing and vulnerability discovery' },
      { name: 'Web Security', color: 'purple', description: 'Web application security practices' },
      { name: 'Code Security', color: 'indigo', description: 'Secure coding practices and code review' },
      { name: 'Penetration Testing', color: 'orange', description: 'Ethical hacking and penetration testing' }
    ]

    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category.name,
          color: category.color,
          description: category.description,
          slug: category.name.toLowerCase().replace(/\s+/g, '-')
        }
      })
    }

    console.log('✅ Initial categories created successfully!')

    // Create some initial tags
    console.log('🏷️  Creating initial tags...')
    const tags = [
      'security', 'cybersecurity', 'web', 'api', 'testing', 'vulnerability',
      'penetration-testing', 'code-review', 'authentication', 'authorization'
    ]

    for (const tag of tags) {
      await prisma.tag.create({
        data: {
          name: tag,
          slug: tag.toLowerCase().replace(/\s+/g, '-')
        }
      })
    }

    console.log('✅ Initial tags created successfully!')

    console.log('🎉 Database setup completed successfully!')
    console.log('📝 You can now log in with the admin credentials above')

  } catch (error) {
    console.error('❌ Error during setup:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
