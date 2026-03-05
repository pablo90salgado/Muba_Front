export default async function seedInstituciones (prisma) {
  console.log('[Seed-Instituciones] Creating demo institutions...')

  await prisma.institucion.deleteMany()

  const institucionDemo = await prisma.institucion.create({
    data: {
      nombre: 'Institución Demo Muba',
      cuit: '30712345678',
      tipo: 'GERIATRICO',
      direccion: 'Av. Siempre Viva 742, CABA',
      emailAdmin: 'admin@muba-demo.com',
      planSaas: 'BASICO',
      activa: true
    }
  })

  const institucionSecundaria = await prisma.institucion.create({
    data: {
      nombre: 'Institución Secundaria Muba',
      cuit: '30787654321',
      tipo: 'GERIATRICO',
      direccion: 'Av. Rivadavia 1000, CABA',
      emailAdmin: 'admin@segunda-muba.com',
      planSaas: 'BASICO',
      activa: true
    }
  })

  console.log('[Seed-Instituciones] ******************* Created 2 instituciones demo *******************')

  return { institucionDemo, institucionSecundaria }
}

