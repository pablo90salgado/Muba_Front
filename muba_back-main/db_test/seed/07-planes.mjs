export default async function seedPlanes (prisma, { finan1, finan2, finan3 }) {
  console.log('[Seed-Planes] Creating plans...')

  await prisma.plan.deleteMany()

  const plan1 = await prisma.plan.create({
    data: {
      financiadorId: finan1.id,
      nombre: 'Plan 210',
      coberturaDias: 30,
      serviciosIncluidos: { hospedaje: true, alimentacion: true, enfermeria: true, medicina: true },
      serviciosExcluidos: { cirugias: true, odontologia: false },
      coseguros: { consulta: 100, urgencia: 500 },
      auditoriasRequeridas: 'Para estadías mayores a 15 días',
      estado: 'Vigente'
    }
  })

  const plan2 = await prisma.plan.create({
    data: {
      financiadorId: finan1.id,
      nombre: 'Plan 310',
      coberturaDias: 60,
      serviciosIncluidos: { hospedaje: true, alimentacion: true, enfermeria: true, medicina: true, kinesiologia: true },
      serviciosExcluidos: {},
      coseguros: { consulta: 50, urgencia: 300 },
      estado: 'Vigente'
    }
  })

  const plan3 = await prisma.plan.create({
    data: {
      financiadorId: finan2.id,
      nombre: 'Plan Classic',
      coberturaDias: 30,
      serviciosIncluidos: { hospedaje: true, alimentacion: true, enfermeria: true },
      estado: 'Vigente'
    }
  })

  const plan4 = await prisma.plan.create({
    data: {
      financiadorId: finan3.id,
      nombre: 'Plan IOMA Universal',
      coberturaDias: 90,
      serviciosIncluidos: { hospedaje: true, alimentacion: true, enfermeria: true, medicina: true },
      estado: 'Vigente'
    }
  })

  console.log('[Seed-Planes] Created 4 planes')

  return { plan1, plan2, plan3, plan4 }
}
