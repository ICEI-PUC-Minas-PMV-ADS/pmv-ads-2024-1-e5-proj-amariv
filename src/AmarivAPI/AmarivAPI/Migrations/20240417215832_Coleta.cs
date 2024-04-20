using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmarivAPI.Migrations
{
    /// <inheritdoc />
    public partial class Coleta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coletas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DataDeColeta = table.Column<DateTime>(type: "DATETIME", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColetasId", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Coletas_UserId", column: x => x.UserId,
                        principalTable: "AspNetUsers", principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict
                    );
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coletas");
        }
    }
}
