using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AmarivAPI.Migrations
{
    /// <inheritdoc />
    public partial class materiais : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ccbe241b-a036-440f-9573-246a35266d38", "AQAAAAIAAYagAAAAELjo08LifoNe9Ld4Q9UsdcaCHwLb7ynJZAesq7HptAK1cI7iU7N+vbNeg9z0SlhEfw==", "eeffb46a-59ef-449c-b32f-e495490d4631" });

            migrationBuilder.InsertData(
                table: "Materiais",
                columns: new[] { "Id", "Data_criacao", "Descricao", "Tipo" },
                values: new object[,]
                {
                    { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Metal", "Metal" },
                    { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Plástico", "Plástico" },
                    { 3, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Papel", "Papel" },
                    { 4, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Vidro", "Vidro" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Materiais",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Materiais",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Materiais",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Materiais",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "11ef760a-cc41-4b65-add2-e19a2da1b745", "AQAAAAIAAYagAAAAEJYs33nBUhLdWS0iJpO6nv/8PXLzKCaLZ0NwUGQDkFAV0hwA2ZaQjdYVc2d7ZQcvGg==", "a916c2f6-17c5-49fd-9d96-aa6e3f32669f" });
        }
    }
}
