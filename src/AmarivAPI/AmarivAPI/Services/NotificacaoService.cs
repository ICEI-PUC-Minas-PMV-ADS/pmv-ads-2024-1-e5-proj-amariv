using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.NotificacaoDtos;
using AmarivAPI.Data.Requests;
using AmarivAPI.Models;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmarivAPI.Services
{
    public class NotificacaoService
    {
        private readonly AmarivContext _context;

        public NotificacaoService(AmarivContext context)
        {
            _context = context;
        }

        // Cria uma nova notificação no banco de dados com base nos dados fornecidos no DTO CreateNotificacaoDto.

        public async Task<Result<NotificacaoDto>> CreateNotification(CreateNotificacaoDto createDto)
        {
            var notification = new Notificacao
            {
                UserId = createDto.UserId,
                Titulo = createDto.Titulo,
                Corpo = createDto.Corpo,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Notificacao.AddAsync(notification);
            await _context.SaveChangesAsync();

            var notificationDto = new NotificacaoDto
            {
                Id = notification.Id,
                UserId = notification.UserId,
                Titulo = notification.Titulo,
                Corpo = notification.Corpo,
                CreatedAt = notification.CreatedAt
            };

            return Result.Ok(notificationDto);
        }

        // Retorna uma lista de notificações de um usuário específico.

        public async Task<Result<List<NotificacaoDto>>> GetNotificationsByUserId(string userId)
        {
            var notifications = await _context.Notificacao
                .Where(n => n.UserId == userId)
                .ToListAsync();

            var notificationsDto = notifications.Select(n => new NotificacaoDto
            {
                Id = n.Id,
                UserId = n.UserId,
                Titulo = n.Titulo,
                Corpo = n.Corpo,
                CreatedAt = n.CreatedAt
            }).ToList();

            return Result.Ok(notificationsDto);
        }

        // Atualiza uma notificação existente com base no ID e nos dados fornecidos no DTO UpdateNotificacaoDto.

        public async Task<Result> UpdateNotification(int id, UpdateNotificacaoDto updateDto)
        {
            var notification = await _context.Notificacao.FindAsync(id);
            if (notification == null)
                return Result.Fail("Notification not found");

            notification.Titulo = updateDto.Titulo;
            notification.Corpo = updateDto.Corpo;
            _context.Notificacao.Update(notification);
            await _context.SaveChangesAsync();

            return Result.Ok();
        }

        // Remove uma notificação com base no ID fornecido.

        public async Task<Result> DeleteNotification(int id)
        {
            var notification = await _context.Notificacao.FindAsync(id);
            if (notification == null)
                return Result.Fail("Notification not found");

            _context.Notificacao.Remove(notification);
            await _context.SaveChangesAsync();

            return Result.Ok();
        }
    }
}