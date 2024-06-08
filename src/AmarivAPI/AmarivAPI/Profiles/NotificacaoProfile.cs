using AutoMapper;
using AmarivAPI.Models;
using AmarivAPI.Data.Dtos.NotificacaoDtos;

namespace AmarivAPI.Profiles
{
    public class NotificacaoProfile : Profile
    {
        public NotificacaoProfile()
        {

            // Define um mapeamento de Notificacao para NotificacaoDto, permitindo a conversão de objetos do tipo Notificacao em objetos do tipo NotificacaoDto.

            CreateMap<Notificacao, NotificacaoDto>();

            // Define um mapeamento de CreateNotificacaoDto para Notificacao, permitindo a conversão de objetos do tipo CreateNotificacaoDto em objetos do tipo Notificacao.

            CreateMap<CreateNotificacaoDto, Notificacao>();
        }
    }
}

// Responsável por definir os mapeamentos entre os objetos Notificacao, NotificacaoDto, CreateNotificacaoDto e Notificacao.