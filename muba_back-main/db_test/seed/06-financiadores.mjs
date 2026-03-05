export default async function seedFinanciadores (prisma, { institucionDemo }) {
  console.log('[Seed-Financiadores] Creating financiadores...')

  await prisma.financiador.deleteMany()

  const finan1 = await prisma.financiador.create({
    data: {
      institucionId: institucionDemo.id,
      nombre: 'OSDE',
      cuit: '30546665923',
      tipo: 'Prepaga',
      direccionFiscal: 'Av. del Libertador 5000, CABA',
      emailLiquidaciones: 'liquidaciones@osde.com.ar',
      telefono: '011-4320-5000',
      personaContacto: 'Carlos García',
      condicionesPago: '30 días fecha factura',
      requisitosFacturacion: 'Factura A o B según corresponda',
      estado: 'Activo'
    }
  })

  const finan2 = await prisma.financiador.create({
    data: {
      institucionId: institucionDemo.id,
      nombre: 'Swiss Medical',
      cuit: '30612345678',
      tipo: 'Prepaga',
      direccionFiscal: 'Av. Corrientes 1500, CABA',
      emailLiquidaciones: 'facturacion@swissmedical.com.ar',
      telefono: '011-4890-0000',
      personaContacto: 'María López',
      condicionesPago: '45 días',
      estado: 'Activo'
    }
  })

  const finan3 = await prisma.financiador.create({
    data: {
      institucionId: institucionDemo.id,
      nombre: 'IOMA',
      cuit: '30678901234',
      tipo: 'OSProvincial',
      direccionFiscal: 'Calle 50 entre 118 y 119, La Plata',
      emailLiquidaciones: 'facturacion@ioma.gba.gob.ar',
      telefono: '0221-429-1000',
      personaContacto: 'Pedro Martínez',
      condicionesPago: '60 días',
      estado: 'Activo'
    }
  })

  console.log('[Seed-Financiadores] Created 3 financiadores')

  return { finan1, finan2, finan3 }
}
