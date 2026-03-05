import bcrypt from 'bcryptjs'

export default async function seedUsers (prisma, { institucionDemo, institucionSecundaria }) {
  console.log('[Seed-Users] Creating users...')

  await prisma.usuario.deleteMany()

  const rolAdmin = await prisma.rol.findFirst({ where: { nombre: 'Administrador' } })
  const rolEnfermero = await prisma.rol.findFirst({ where: { nombre: 'Enfermero' } })

  const passwordHash = await bcrypt.hash('password123', 10)

  const usuarioAdmin = await prisma.usuario.create({
    data: {
      institucionId: institucionDemo.id,
      email: 'admin@muba.com',
      passwordHash,
      nombre: 'Administrador del Sistema',
      rolId: rolAdmin.id,
      activo: true
    }
  })

  await prisma.usuario.create({
    data: {
      institucionId: institucionDemo.id,
      email: 'enfermero@muba.com',
      passwordHash,
      nombre: 'Juan Pérez',
      rolId: rolEnfermero.id,
      activo: true
    }
  })

  const usuarioAdminSecundaria = await prisma.usuario.create({
    data: {
      institucionId: institucionSecundaria.id,
      email: 'admin2@muba.com',
      passwordHash,
      nombre: 'Administrador Secundario',
      rolId: rolAdmin.id,
      activo: true
    }
  })

  console.log('[Seed-Users] Created 3 users')

  return { usuarioAdmin, usuarioAdminSecundaria }
}
