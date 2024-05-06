export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  message: string;
  // cargo: string;
}

export interface Identify {
  nome: string;
  email: string;
  cargo: string;
  id_usuario: number;
}


export interface ChangePassword {
  senhaVelha: string;
  senhaNova: string
}
