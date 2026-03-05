export default async function seedCamas (prisma, { habitacion1, habitacion2, habitacion3, habitacion4, habitacion5 }) {
  console.log('[Seed-Camas] Creating beds...')

  await prisma.cama.deleteMany()

  const cama1 = await prisma.cama.create({
    data: {
      habitacionId: habitacion1.id,
      identificador: 'A',
      estado: 'Disponible',
      activo: true
    }
  })

  const cama2 = await prisma.cama.create({
    data: {
      habitacionId: habitacion2.id,
      identificador: 'A',
      estado: 'Ocupada',
      activo: true
    }
  })

  const cama3 = await prisma.cama.create({
    data: {
      habitacionId: habitacion2.id,
      identificador: 'B',
      estado: 'Disponible',
      activo: true
    }
  })

  const cama4 = await prisma.cama.create({
    data: {
      habitacionId: habitacion3.id,
      identificador: 'A',
      estado: 'EnLimpieza',
      activo: true
    }
  })

  const cama5 = await prisma.cama.create({
    data: {
      habitacionId: habitacion3.id,
      identificador: 'B',
      estado: 'Disponible',
      activo: true
    }
  })

  const cama6 = await prisma.cama.create({
    data: {
      habitacionId: habitacion4.id,
      identificador: 'A',
      estado: 'Disponible',
      activo: true
    }
  })

  for (let i = 1; i <= 4; i++) {
    await prisma.cama.create({
      data: {
        habitacionId: habitacion5.id,
        identificador: String.fromCharCode(64 + i),
        estado: i <= 2 ? 'Ocupada' : 'Disponible',
        activo: true
      }
    })
  }

  console.log('[Seed-Camas] Created 9 beds')

  return { cama1, cama2, cama3, cama4, cama5, cama6 }
}
