export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  name: string;
  message: string;
  // cargo: string;
}

export interface CheckUser {
  nome: string;
  email: string;
  cargo: string;
  userId: number;
}


export interface ChangePassword {
  senhaVelha: string;
  senhaNova: string
}
