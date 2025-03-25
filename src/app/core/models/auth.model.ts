export interface Admin {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    role: string;
    lastLogin: string; // Pode ser convertido para Date se necessário
    createdAt: string; // Pode ser convertido para Date se necessário
    updatedAt: string; // Pode ser convertido para Date se necessário
  }
  
 export interface AuthResponse {
    admin: Admin;
    access_token: string;
  }
  