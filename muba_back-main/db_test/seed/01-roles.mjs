export default async function seedRoles (prisma) {
  console.log('[Seed-Roles] Creating roles...')

  await prisma.rol.deleteMany()

  const rolAdmin = await prisma.rol.create({
    data: {
      nombre: 'Administrador',
      permisos: {
        residentes: ['create', 'read', 'update', 'delete'],
        habitaciones: ['create', 'read', 'update', 'delete'],
        camas: ['create', 'read', 'update', 'delete'],
        financiadores: ['create', 'read', 'update', 'delete'],
        reportes: ['read', 'export']
      },
      descripcion: 'Usuario con acceso completo al sistema'
    }
  })

  const rolEnfermero = await prisma.rol.create({
    data: {
      nombre: 'Enfermero',
      permisos: {
        residentes: ['read', 'update'],
        habitaciones: ['read'],
        camas: ['read', 'update'],
        financiadores: ['read'],
        reportes: []
      },
      descripcion: 'Personal de enfermería'
    }
  })

  const rolUsuario = await prisma.rol.create({
    data: {
      nombre: 'Usuario',
      permisos: {
        residentes: ['read'],
        habitaciones: ['read'],
        camas: ['read'],
        financiadores: ['read'],
        reportes: []
      },
      descripcion: 'Usuario de solo lectura'
    }
  })

  console.log('[Seed-Roles] Created 3 roles')

  return { rolAdmin, rolEnfermero, rolUsuario }
}
