/*
 * Name: Abhinav Sharma
 * Student ID: 2210994752
 * Unit: SIT331
 * Task: 5.2HD
 */

using art_gallery.Persistence;
using Microsoft.AspNetCore.Authentication;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using robot_controller_api.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {   
        builder.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
    });
});

builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddSingleton<IMongoDatabase>(serviceProvider =>
{
    var mongoDbService = serviceProvider.GetRequiredService<MongoDbService>();
    return mongoDbService.Database;
});

builder.Services.AddSingleton<IGridFSBucket>(serviceProvider =>
{
    var database = serviceProvider.GetRequiredService<IMongoDatabase>();
    return new GridFSBucket(database);
});

builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions,BasicAuthenticationHandler>("BasicAuthentication", default);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();