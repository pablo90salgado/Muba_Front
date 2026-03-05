export default async function seedHabitaciones (prisma, { sector1, sector2, sector3, sector4 }) {
  console.log('[Seed-Habitaciones] Creating rooms...')

  await prisma.habitacion.deleteMany()

  const habitacion1 = await prisma.habitacion.create({
    data: {
      sectorId: sector1.id,
      numero: '101',
      tipo: 'Individual',
      amenities: { wifi: true, tv: false, banio: true },
      precioReferencial: 25000,
      estado: 'Activa',
      activo: true
    }
  })

  const habitacion2 = await prisma.habitacion.create({
    data: {
      sectorId: sector1.id,
      numero: '102',
      tipo: 'Doble',
      amenities: { wifi: true, tv: true, banio: true },
      precioReferencial: 20000,
      estado: 'Activa',
      activo: true
    }
  })

  const habitacion3 = await prisma.habitacion.create({
    data: {
      sectorId: sector2.id,
      numero: '103',
      tipo: 'Triple',
      amenities: { wifi: false, tv: true, banio: false },
      precioReferencial: 15000,
      estado: 'Activa',
      activo: true
    }
  })

  const habitacion4 = await prisma.habitacion.create({
    data: {
      sectorId: sector3.id,
      numero: '201',
      tipo: 'Individual',
      amenities: { wifi: true, tv: true, banio: true },
      precioReferencial: 28000,
      estado: 'Activa',
      activo: true
    }
  })

  const habitacion5 = await prisma.habitacion.create({
    data: {
      sectorId: sector4.id,
      numero: '101',
      tipo: 'Compartida',
      amenities: { wifi: true, tv: false, banio: true },
      precioReferencial: 12000,
      estado: 'Activa',
      activo: true
    }
  })

  console.log('[Seed-Habitaciones] Created 5 habitaciones')

  return { habitacion1, habitacion2, habitacion3, habitacion4, habitacion5 }
}
