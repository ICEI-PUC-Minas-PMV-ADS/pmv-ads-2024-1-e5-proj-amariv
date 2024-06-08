namespace AmarivAPI.Data.Dtos.NotificacaoDtos
{
    public class CreateNotificacaoDto
    {
        public string UserId { get; set; }
        public string Titulo { get; set; }
        public string Corpo { get; set; }
    }
}

// utilizada para transferir os dados necessários para a criação de uma notificação do controlador para o serviço.