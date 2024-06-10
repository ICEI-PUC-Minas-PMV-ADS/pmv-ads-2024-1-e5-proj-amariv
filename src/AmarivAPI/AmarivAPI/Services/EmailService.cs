using MailKit.Net.Smtp;
using MimeKit;
using System.Web;

namespace AmarivAPI.Services
{
    public class EmailService
    {
        private IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void EnviarEmailConfirmacao(string[] destinatarios, string assunto, string usuarioId, string codigo) 
        {
            List<MailboxAddress> destinatario = [];
            destinatario.AddRange(destinatarios.Select(d => new MailboxAddress(d, d)));
            var encodedCode = HttpUtility.UrlEncode(codigo);
            string conteudo = $"Olá, bem vindo a Amariv!\n\rAcesse o link abaixo para confirmar seu email: \n\r http://localhost:3000/confirmaremail/{usuarioId}/{encodedCode}";

            var mensagemDeEmail = new MimeMessage();

            mensagemDeEmail.From.Add(new MailboxAddress("Amariv", _configuration.GetValue<string>("EmailSettings:From")));
            mensagemDeEmail.To.AddRange(destinatario);
            mensagemDeEmail.Subject = assunto;
            mensagemDeEmail.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = conteudo
            };

            Enviar(mensagemDeEmail);
        }

        public void EnviarEmailRecuperacao(string destinatarioEmail, string assunto, string codigo)
        {
            var encodedCode = HttpUtility.UrlEncode(codigo);
            MailboxAddress destinatario = new MailboxAddress(destinatarioEmail, destinatarioEmail);
            string conteudo = $"Recuperacao de senha\n\rAcesse o link abaixo para recuperar senha: \n\r http://localhost:3000/recuperarsenha/{destinatarioEmail}/{encodedCode}";

            var mensagemDeEmail = new MimeMessage();
            mensagemDeEmail.From.Add(new MailboxAddress("Amariv", _configuration.GetValue<string>("EmailSettings:From")));
            mensagemDeEmail.To.Add(destinatario);
            mensagemDeEmail.Subject = assunto;
            mensagemDeEmail.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = conteudo
            };

            Enviar(mensagemDeEmail);
        }

        public void Enviar (MimeMessage mensagem) 
        {
            using(var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_configuration.GetValue<string>("EmailSettings:SmtpServer"), _configuration.GetValue<int>("EmailSettings:Port"), true);
                    client.AuthenticationMechanisms.Remove("XOUATH2");
                    client.Authenticate(_configuration.GetValue<string>("EmailSettings:From"), _configuration.GetValue<string>("EmailSettings:Password"));
                    client.Send(mensagem);
                }
                catch
                {
                    throw;
                }
                finally 
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

       
    }
}
