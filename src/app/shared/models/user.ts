export interface User {
  id: number;
  nome: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

export interface Register {
  nome: string;
  email: string;
  phone: string;
  address: string;
  cep: string;
  password: string;
  confirmpassword: string;
}

export interface UpdateUser {
  nome: string;
  email: string;
  phone: string;
}

export interface UserLogs {
  id: number | string;
  data_registro: string;
  id_usuario: number;
  usuario: string;
  id_acao: number;
  acao: string;
  descricao: string;
}
