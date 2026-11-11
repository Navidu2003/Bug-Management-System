using BugManagement.Api.Models;

namespace BugManagement.Api.Dtos;

/// <summary>
/// Data Transfer Object representing the bug details returned to clients.
/// </summary>
public class BugResponseDto
{
    public int Id { get; set; }
    public string BugName { get; set; } = string.Empty;
    public string BugDescription { get; set; } = string.Empty;
    public DateTime ReportDate { get; set; }
    public SeverityLevel Level { get; set; }
}

