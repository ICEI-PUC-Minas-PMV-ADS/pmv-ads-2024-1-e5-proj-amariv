using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmarivAPI.Migrations
{
    /// <inheritdoc />
    public partial class novaColunaColeta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "LocalidadeExata",
                table: "Coletas",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "aa307265-66a0-40cb-93ec-0c233fd9311a", "AQAAAAIAAYagAAAAEK//c1t5kOdkUnbwpJAEBkp9z7FOD4LRMPEsbC+df1BmSvD6lLpG5EdRW/Z9dhL3KQ==", "a1273bd4-678b-4603-8068-129c874e0d41" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocalidadeExata",
                table: "Coletas");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "adm",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f8b98eef-6e61-4921-9924-9cb33c07b1ae", "AQAAAAIAAYagAAAAEL8j5CtU8I2zdrLIKA8xXhZfdMRZ65x2kzNaIz7WugTAcEuM11scL7ei2Nj3gQJ4Mg==", "4aa35d1a-b470-434f-aaed-822d22b4f955" });
        }
    }
}
