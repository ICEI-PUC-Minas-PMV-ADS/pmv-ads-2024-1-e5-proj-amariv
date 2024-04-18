using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AmarivAPI.Migrations
{
    /// <inheritdoc />
    public partial class RolesClienteFuncionario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "clt", null, "cliente", "CLIENTE" },
                    { "fun", null, "funcionario", "FUNCIONARIO" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3a2e812e-920c-4e75-ad97-805c6f5e5dfc", "AQAAAAIAAYagAAAAEIvQKJIk0OOa40DYMmJ4bJF9AwnXtA21r7JqySqGh8XAZL6/EBhmYdRwMQBHRJ2jdQ==", "39701d1a-e986-49f4-a2ac-ae713c1e31a8" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "clt");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fun");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c6c97249-6221-4e94-b0dc-c131a8056589", "AQAAAAIAAYagAAAAEC9iCg3QWQ7g5FGVN54a0ltJC64X3d/s3OUftjqLvscBQEUm2gzL5ABJEYKwNBHoZw==", "5512ad05-cba1-4511-8f8b-63b31ba3068c" });
        }
    }
}
