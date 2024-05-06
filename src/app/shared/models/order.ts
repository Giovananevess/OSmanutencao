export interface Order {
  id: number;
  title: string;
  description: string;
  brand: string;
  machine: string;
  priority: number;
  daymaintenance: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
