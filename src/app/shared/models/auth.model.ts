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

// export interface Identify {
//   id: number;
//   name: string;
//   email: string;
//   userId: string;
//   nome: string;
//   phone: string;
//   address: string;
//   postal_code: string;
//   password: string;
//   confirmpassword: string;
// }
export interface Identify {
  id: number;
  name: string;
  email: string;
  userId: string;
  phone: string;
  address: string;
  postal_code: string;
  password?: string;
  confirmpassword?: string;
}


export interface ChangePassword {
  senhaVelha: string;
  senhaNova: string
}
