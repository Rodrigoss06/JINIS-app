export interface Participante {
    ID_USUARIO: number
    NOMBRES: string
    DNI:number
    APELLIDO_PATERNO: string
    APELLIDO_MATERNO: string
    ID_TIPO_USUARIO: number
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
  
  export interface Horario {
    ID_HORARIO: number
    HORA_INICIO: string
    HORA_FIN: string
    FECHA: string
    CREATED_AT: string
    UPDATED_AT: string
  }

  export interface Ubicacion {
    ID_UBICACION: number
    DESCRIPCION: string
    DIRECCION: string
    CAPACIDAD: number
    CREATED_AT: string
    UPDATED_AT: string
  }

  export interface EventoAsistido {
    ID_EVENTO_ASISTIDO: number
    ID_EVENTO: number
    ID_USUARIO: number
    FECHA_ASISTENCIA: string
    CREATED_AT: string
    UPDATED_AT: string
  }
  
  export interface TipoUsuario {
    ID_TIPO_USUARIO: number
    DESCRIPCION: string
    CREATED_AT: string
    UPDATED_AT: string
  }
  export interface TipoDocumento {
    ID_TIPO_DOCUMENTO: number
    DESCRIPCION: string
    CREATED_AT: string
    UPDATED_AT: string
  }