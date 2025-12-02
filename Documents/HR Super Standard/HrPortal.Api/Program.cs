using HrPortal.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Dev bypass: allow all requests (no external auth).
builder.Services.AddAuthorization(options =>
{
    var allowAll = new AuthorizationPolicyBuilder()
        .RequireAssertion(_ => true)
        .Build();
    options.DefaultPolicy = allowAll;
    options.FallbackPolicy = allowAll;
});

var sql = builder.Configuration.GetConnectionString("Sql");
builder.Services.AddDbContext<HrDbContext>(opts =>
{
    if (!string.IsNullOrWhiteSpace(sql))
    {
        opts.UseSqlServer(sql);
    }
    else
    {
        opts.UseInMemoryDatabase("HrPortalDev");
    }
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
