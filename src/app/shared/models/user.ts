export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  password: string;
  confirmpassword: string;
}

export interface Register {
  name: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  password: string;
  confirmpassword: string;
}

export interface UpdateUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  password: string;
  confirmpassword: string;
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
