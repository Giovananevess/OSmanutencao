export interface Order {
  id: number;
  title: string;
  description: string;
  brand: string;
  machine: string;
  priority: string;
  images: string;
  daymaintenance: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

}

// export interface UpdateOrder {
//   title: string;
//   description: string;
//   brand: string;
//   machine: string;
//   priority: number;
//   daymaintenance: string;
//   userId: number;
//   createdAt: Date;
//   updatedAt: Date;
//   latitude: number;
//   longitude: number;
// }

export interface ImageOS {
  type1?: [{
    id: number;
    os_id: number;
    img_key: string;
    img_type: string;
  }];
  type2?: [{
    id: number;
    os_id: number;
    img_key: string;
    img_type: string;
  }];
}

export interface ConcludeOrders {
  ordem_servico_id: number;
  data_final: Date | string;
  material: string;
  relatorio: string;
  files: File;
}



export interface ConcludeOS {
  ordem_servico_id: number;
  data_final: Date | string;
  material: string;
  relatorio: string;
  files: File;
}

export interface ConcludeOsResponse {
  message: string;
  ordem_servico_id: number;
  data_final: Date | string;
  material: string;
  status: string;
  uploadResponse: any;
}
