/**
 * User model
 */
export class User {
  constructor(
    public id: string,
    public nome: string,
    public email: string, 
    public telefone?: string 
  ) {}  
}