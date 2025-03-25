export interface UserData{
    id: number;
    name: string;
    matricula: string;
    cpf: string;
    rg: string;
    vinculo: string;
    lotacao: string;
    endereco: string;
    email: string;
    phone: string;
    photo: string;
    birthDay: string; // ISO string format
    status: boolean;
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    firstAccess:string;
  }
export interface UpdateData {
    name: string;
    matricula: string;
    cpf: string;
    rg: string;
    vinculo: string;
    lotacao: string;
    endereco: string;
    email: string;
    phone: string;
    birthDay:string,
    photo: File | null;
}

export interface userResponse {
    access_token:string
    user:UserData
}