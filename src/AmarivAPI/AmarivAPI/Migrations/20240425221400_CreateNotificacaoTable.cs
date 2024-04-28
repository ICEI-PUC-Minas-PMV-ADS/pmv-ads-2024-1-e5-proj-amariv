using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmarivAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateNotificacaoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notificacao",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Titulo = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Corpo = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notificacao", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "17eb2539-a071-4e66-bb1b-b62fe368b620", "AQAAAAIAAYagAAAAEFQ+14NjPKWhPdalI0Lpt7mLsJzC3UDTTdaWylKpoaVN/1782y7N8F8r1p7zG+7VTw==", "5feeeea8-4800-4b2a-8492-29a1059407c7" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notificacao");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a5e7cbc8-a2ed-462f-ad6c-bf0fa0fa0df1", "AQAAAAIAAYagAAAAEElr+28CQnR2YHj5GzC85Acb94FViDInudxcyEzeTuzm6i7XwbOcKijM9LoOhGvgDA==", "42032ea2-9e96-46e5-b079-6719e3409cf6" });
        }
    }
}
