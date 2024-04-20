using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmarivAPI.Migrations
{
    /// <inheritdoc />
    public partial class ColetaItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ColetaItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ColetaId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColetaItemId", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ColetaItems_ColetaId", column: x => x.ColetaId,
                        principalTable: "Coletas", principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict
                    );
                    table.ForeignKey(
                        name: "FK_ColetaItems_MaterialId", column: x => x.MaterialId,
                        principalTable: "MATERIAL", principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict
                    );
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ColetaItems");
        }
    }
}
