export default async function seedEdificios (prisma, { institucionDemo }) {
  console.log('[Seed-Edificios] Creating buildings and rooms...')

  await prisma.sector.deleteMany()
  await prisma.piso.deleteMany()
  await prisma.edificio.deleteMany()

  const edificio1 = await prisma.edificio.create({
    data: {
      institucionId: institucionDemo.id,
      nombre: 'Edificio Principal',
      direccion: 'Av. San Martín 1234',
      descripcion: 'Edificio principal de la institución',
      activo: true
    }
  })

  const edificio2 = await prisma.edificio.create({
    data: {
      institucionId: institucionDemo.id,
      nombre: 'Edificio Anexo',
      direccion: 'Av. Belgrano 567',
      descripcion: 'Anexo para residentes autónomos',
      activo: true
    }
  })

  const piso1Edif1 = await prisma.piso.create({
    data: {
      edificioId: edificio1.id,
      nombre: 'Planta Baja',
      orden: 1,
      activo: true
    }
  })

  const piso2Edif1 = await prisma.piso.create({
    data: {
      edificioId: edificio1.id,
      nombre: 'Primer Piso',
      orden: 2,
      activo: true
    }
  })

  const piso1Edif2 = await prisma.piso.create({
    data: {
      edificioId: edificio2.id,
      nombre: 'Planta Baja',
      orden: 1,
      activo: true
    }
  })

  const sector1 = await prisma.sector.create({
    data: {
      pisoId: piso1Edif1.id,
      nombre: 'Sector A',
      activo: true
    }
  })

  const sector2 = await prisma.sector.create({
    data: {
      pisoId: piso1Edif1.id,
      nombre: 'Sector B',
      activo: true
    }
  })

  const sector3 = await prisma.sector.create({
    data: {
      pisoId: piso2Edif1.id,
      nombre: 'Sector C',
      activo: true
    }
  })

  const sector4 = await prisma.sector.create({
    data: {
      pisoId: piso1Edif2.id,
      nombre: 'Sector D',
      activo: true
    }
  })

  console.log('[Seed-Edificios] Created 2 edificios, 3 pisos, 4 sectores')

  return { edificio1, edificio2, piso1Edif1, piso2Edif1, piso1Edif2, sector1, sector2, sector3, sector4 }
}
