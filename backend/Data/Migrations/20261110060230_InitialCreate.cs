using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BugManagement.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bugs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BugName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    BugDescription = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    ReportDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Level = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bugs", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Bugs",
                columns: new[] { "Id", "BugDescription", "BugName", "Level", "ReportDate" },
                values: new object[,]
                {
                    { 1, "When JWT refresh token expires, the client receives HTTP 500 Internal Server Error instead of HTTP 401 Unauthorized, causing unexpected crash on user dashboard.", "Authentication token expiration causes 500 error", "Critical", new DateTime(2026, 11, 8, 9, 30, 0, 0, DateTimeKind.Utc) },
                    { 2, "Payment processing fails to back off when gateway response times out, leading to duplicate charge attempts within a short interval.", "Payment gateway timeout retry loop", "High", new DateTime(2026, 11, 9, 14, 15, 0, 0, DateTimeKind.Utc) },
                    { 3, "Circular avatar cropper distorts non-square uploaded images on mobile responsive viewports below 480px width.", "Profile image avatar rendering distortion", "Medium", new DateTime(2026, 11, 9, 18, 45, 0, 0, DateTimeKind.Utc) },
                    { 4, "Tooltip displays 'Verfication' instead of 'Verification' on hover under Account Security tab.", "Typo in user settings email verification tooltip", "Low", new DateTime(2026, 11, 10, 8, 10, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_Level",
                table: "Bugs",
                column: "Level");

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_ReportDate",
                table: "Bugs",
                column: "ReportDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bugs");
        }
    }
}
