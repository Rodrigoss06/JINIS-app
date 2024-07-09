export interface Participante {
    ID_PARTICIPANTE: number
    NOMBRES: string
    APELLIDO_PATERNO: string
    APELLIDO_MATERNO: string
    ID_TIPO_PARTICIPANTE: number
    CORREO_ELECTRONICO: string
    ID_TIPO_DOCUMENTO: number
    TELEFONO: string
    CONTRASENA: string
    ID_EVENTOS_ASISTIDOS: number
    FECHA_NACIMIENTO: string
    DIRECCION: string
    GENERO: string
    CREATED_AT: string
    UPDATED_AT: any
  }

  export interface Evento {
    ID_EVENTO: number
    NOMBRE: string
    ID_PONENTE: number
    ID_UBICACION: number
    ID_HORARIO: number
    DESCRIPCION: string
    CREATED_AT: string
    UPDATED_AT: string
  }
  export interface Ponente {
    ID_PONENTE: number
    ID_TIPO_DOCUMENTO: number
    DOCUMENTO: string
    NOMBRES: string
    APELLIDOS: string
    ENTIDAD: string
    BIOGRAFIA: string
    EMAIL: string
    TELEFONO: string
    CREATED_AT: string
    UPDATED_AT: string
  }
  