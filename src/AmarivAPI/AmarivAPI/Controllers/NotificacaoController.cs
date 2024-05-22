using AmarivAPI.Data.Dtos.NotificacaoDtos;
using AmarivAPI.Data.Requests;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AmarivAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificacaoController : ControllerBase
    {
        private readonly NotificacaoService _notificacaoService;



        public NotificacaoController(NotificacaoService notificacaoService)
        {
            _notificacaoService = notificacaoService;
        }

        //  Recebe um objeto CreateNotificacaoDto e chama o método CreateNotification do serviço NotificacaoService para criar uma nova notificação. Retorna um objeto NotificacaoDto em caso de sucesso ou um BadRequest em caso de falha.

        [HttpPost]
        public async Task<ActionResult<NotificacaoDto>> CreateNotification(CreateNotificacaoDto createDto)
        {
            var result = await _notificacaoService.CreateNotification(createDto);   
            return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Errors);
        }

        // Recebe um userId como parâmetro e chama o método GetNotificationsByUserId do serviço NotificacaoService para obter a lista de notificações daquele usuário. Retorna uma lista de NotificacaoDto em caso de sucesso ou um BadRequest em caso de falha.

        [HttpGet]
        public async Task<ActionResult<NotificacaoDto>> GetNotificationsByUserId(string userId)
        {
            var result = await _notificacaoService.GetNotificationsByUserId(userId);
            return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Errors);
        }

        //  Recebe um id e um objeto UpdateNotificacaoDto como parâmetros e chama o método UpdateNotification do serviço NotificacaoService para atualizar uma notificação existente. Retorna um Ok em caso de sucesso ou um BadRequest em caso de falha.

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, UpdateNotificacaoDto updateDto)
        {
            var result = await _notificacaoService.UpdateNotification(id, updateDto);
            return result.IsSuccess ? Ok() : BadRequest(result.Errors);
        }

        // Recebe um id como parâmetro e chama o método DeleteNotification do serviço NotificacaoService para remover uma notificação. Retorna um Ok em caso de sucesso ou um BadRequest em caso de falha.

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var result = await _notificacaoService.DeleteNotification(id);
            return result.IsSuccess ? Ok() : BadRequest(result.Errors);
        }
    }
}


// Controlador que expõe endpoints http para as operações relacionadas a notificação.