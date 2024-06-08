interface Employee {
    id: number;
    nome: string;
    email: string;
    sexo: string;
    telefone: string;
    cargo: string;
    senha: string;
    suportaPeso: string;
    // Adicione outras propriedades relevantes conforme necessário
  }
  
  interface EmployeeCardProps {
    employee: Employee;
    onEdit: () => void;
    onDelete: () => void;
  }
  
  const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold">{employee.nome}</h3>
        <div className="mt-2">
          <p>Email: {employee.email}</p>
          <p>Sexo: {employee.sexo}</p>
          <p>Telefone: {employee.telefone}</p>
          <p>Cargo: {employee.cargo}</p>
          <p>Suporte de Peso: {employee.suportaPeso}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
            onClick={onEdit}
          >
            Editar
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onDelete}
          >
            Excluir
          </button>
        </div>
      </div>
    );
  };
  
  export default EmployeeCard;