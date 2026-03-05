export default async function seedResidentes (prisma, { institucionDemo, usuarioAdmin, finan1, finan2, finan3, plan1, plan2, plan3, plan4, cama1, cama2, cama3, cama4, cama5, cama6 }) {
  console.log('[Seed-Residentes] Creating residents...')

  await prisma.asignacionCama.deleteMany()
  await prisma.coberturaResidente.deleteMany()
  await prisma.contactoEmergencia.deleteMany()
  await prisma.responsablePago.deleteMany()
  await prisma.historialEstadoResidente.deleteMany()
  await prisma.residente.deleteMany()

  const residente1 = await prisma.residente.create({
    data: {
      institucionId: institucionDemo.id,
      dni: '12345678',
      nombre: 'María González',
      fechaNacimiento: new Date('1955-03-15'),
      sexo: 'Femenino',
      telefono: '011-4567-8901',
      email: 'maria.gonzalez@email.com',
      direccionProcedencia: 'Calle Falsa 123, CABA',
      fotoUrl: null,
      estado: 'Activo',
      fechaIngreso: new Date('2024-01-15'),
      alergias: 'Penicilina, Mariscos',
      restriccionesAlimentarias: 'Sin sal, Sin azúcar',
      observacionesMedicas: 'Diabetes tipo 2, Hipertensión',
      medicoNombre: 'Dr. Alberto Romero',
      medicoMatricula: '45678',
      medicoEspecialidad: 'Clínica Médica',
      medicoTelefono: '011-4444-5555',
      medicoEmail: 'alberto.romero@hospital.com',
      eliminado: false,
      responsablePago: {
        create: {
          nombre: 'Carlos González',
          relacion: 'Hijo',
          cuitCuil: '20123456789',
          condicionIva: 'RespInscripto',
          direccionFiscal: 'Calle Falsa 123, CABA',
          tipoComprobante: 'A',
          emailFacturacion: 'carlos.gonzalez@email.com',
          telefono: '011-4567-8902'
        }
      },
      contactosEmergencia: {
        create: [
          {
            nombre: 'Ana González',
            relacion: 'Hija',
            telefonoPrimario: '011-4567-8903',
            telefonoSecundario: '011-4567-8904',
            email: 'ana.gonzalez@email.com',
            esPrincipal: true
          },
          {
            nombre: 'Pedro González',
            relacion: 'Hijo',
            telefonoPrimario: '011-4567-8905',
            email: 'pedro.gonzalez@email.com',
            esPrincipal: false
          }
        ]
      },
      coberturas: {
        create: {
          financiadorId: finan1.id,
          planId: plan1.id,
          nroAfiliado: 'OSDE-123456',
          fechaVigenciaDesde: new Date('2024-01-01'),
          fechaVigenciaHasta: new Date('2024-12-31'),
          activa: true,
          carnetUrl: null
        }
      },
      historialEstados: {
        create: {
          estadoAnterior: null,
          estadoNuevo: 'Activo',
          motivo: 'Ingreso inicial',
          usuarioId: usuarioAdmin.id
        }
      }
    }
  })

  await prisma.asignacionCama.create({
    data: {
      residenteId: residente1.id,
      camaId: cama2.id,
      fechaDesde: new Date('2024-01-15'),
      fechaHasta: null,
      motivoCambio: 'Asignación inicial',
      usuarioId: usuarioAdmin.id
    }
  })

  const residente2 = await prisma.residente.create({
    data: {
      institucionId: institucionDemo.id,
      dni: '87654321',
      nombre: 'Roberto Sánchez',
      fechaNacimiento: new Date('1950-08-22'),
      sexo: 'Masculino',
      telefono: '011-4567-8906',
      email: 'roberto.sanchez@email.com',
      direccionProcedencia: 'Av. Siempre Viva 456, CABA',
      estado: 'Activo',
      fechaIngreso: new Date('2024-02-01'),
      medicoNombre: 'Dra. Silvia Martínez',
      medicoMatricula: '56789',
      medicoEspecialidad: 'Cardiología',
      eliminado: false,
      responsablePago: {
        create: {
          nombre: 'Laura Sánchez',
          relacion: 'Esposa',
          cuitCuil: '27087654321',
          condicionIva: 'ConsFinal',
          direccionFiscal: 'Av. Siempre Viva 456, CABA',
          tipoComprobante: 'C',
          emailFacturacion: 'laura.sanchez@email.com',
          telefono: '011-4567-8907'
        }
      },
      contactosEmergencia: {
        create: {
          nombre: 'Laura Sánchez',
          relacion: 'Esposa',
          telefonoPrimario: '011-4567-8907',
          telefonoSecundario: '011-4567-8908',
          email: 'laura.sanchez@email.com',
          esPrincipal: true
        }
      },
      coberturas: {
        create: {
          financiadorId: finan2.id,
          planId: plan3.id,
          nroAfiliado: 'SM-789012',
          fechaVigenciaDesde: new Date('2024-01-01'),
          fechaVigenciaHasta: new Date('2024-12-31'),
          activa: true
        }
      },
      historialEstados: {
        create: {
          estadoAnterior: null,
          estadoNuevo: 'Activo',
          motivo: 'Ingreso inicial',
          usuarioId: usuarioAdmin.id
        }
      }
    }
  })

  await prisma.asignacionCama.create({
    data: {
      residenteId: residente2.id,
      camaId: cama4.id,
      fechaDesde: new Date('2024-02-01'),
      fechaHasta: null,
      motivoCambio: 'Asignación inicial',
      usuarioId: usuarioAdmin.id
    }
  })

  const residente3 = await prisma.residente.create({
    data: {
      institucionId: institucionDemo.id,
      dni: '11222333',
      nombre: 'Elena Pérez',
      fechaNacimiento: new Date('1960-05-10'),
      sexo: 'Femenino',
      telefono: '011-4567-8909',
      email: 'elena.perez@email.com',
      direccionProcedencia: 'Calle Nueva 789, Provincia',
      estado: 'AusenciaTemporal',
      fechaIngreso: new Date('2023-11-01'),
      fechaEgreso: new Date('2024-03-01'),
      alergias: null,
      restriccionesAlimentarias: null,
      observacionesMedicas: 'Requiere supervisión básica',
      eliminado: false,
      responsablePago: {
        create: {
          nombre: 'Miguel Pérez',
          relacion: 'Hijo',
          cuitCuil: '20112223334',
          condicionIva: 'Monotributista',
          direccionFiscal: 'Calle Nueva 789, Provincia',
          tipoComprobante: 'B',
          emailFacturacion: 'miguel.perez@email.com'
        }
      },
      contactosEmergencia: {
        create: {
          nombre: 'Miguel Pérez',
          relacion: 'Hijo',
          telefonoPrimario: '011-4567-8910',
          email: 'miguel.perez@email.com',
          esPrincipal: true
        }
      },
      coberturas: {
        create: {
          financiadorId: finan3.id,
          planId: plan4.id,
          nroAfiliado: 'IOMA-345678',
          fechaVigenciaDesde: new Date('2023-11-01'),
          fechaVigenciaHasta: new Date('2024-10-31'),
          activa: true
        }
      },
      historialEstados: {
        create: {
          estadoAnterior: 'Activo',
          estadoNuevo: 'AusenciaTemporal',
          motivo: 'Vacaciones con familia',
          usuarioId: usuarioAdmin.id
        }
      }
    }
  })

  console.log('[Seed-Residentes] Created 3 residentes')

  return { residente1, residente2, residente3 }
}
