using Microsoft.EntityFrameworkCore;
using PisArch.Domain.Enums;
using PisArch.Domain.Models;
using PisArch.Infrastructure;
using PisArch.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DeffaultConnection")));

builder.Services.AddScoped<CourseRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<LessonRepository>();

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod())
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    dbContext.Database.Migrate();

    if (!dbContext.Courses.Any())
    {
        var course = new Course
        {
            Name = ".Net ����������",
            Description = "���� ������ �� ��������� ���������� � .Net ����������",
            Author = "����� �������",
            ImageLink =
                "https://i.ytimg.com/vi/fvLUo5TsPwE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD_5MuzwaYTCtEErR1MapNEa6RawA",
            CourseType = CourseTypes.Recording,
            Lessons = new List<Lesson>
            {
                new Lesson
                {
                    Title = "���� 1",
                    Description = "�������� .Net ����������",
                    Content = "https://github.com/chernikov",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/MwPc-9VCJ2s?si=OKRaYqgLn2vkKmwv",
                            Description =
                                "����� ����, �� �� ����������� ����� � ���� ������ ��������� ��. �������, �� ��� ������� ���������, �� ������ �������� ����. �� ��������� Telegram .net API �� ��������� �������, �� �� ������ ������� ����� �������� ���� �����������",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
                new Lesson
                {
                    Title = "���� 2",
                    Description = "�������� .Net ����������",
                    Content = "https://github.com/chernikov",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/fvLUo5TsPwE?si=Y2FaTONXoLJPhNEk",
                            Description =
                                "����� ����, �� �� ���������, �� ������� ��������� �� ������� �������� ���� ����� �����������, �� �� ���������. �������� ������ �������: �� ������� visual studio, �� ��������� http ������, �������� ��������� http request �� http response.",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
                new Lesson
                {
                    Title = "���� 3",
                    Description = "�������� .Net ����������",
                    Content = "https://github.com/chernikov",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/ZGWKq1Bb_Ek?si=T8kpTRgjpEH9MFJP",
                            Description =
                                "����� ����, �� �� �������� ����, ��� �������� ������ ���������. � ��� ����, ��� ������� ������� git (���� �� ��� ������ � ������ ���), �� �������, �� �����������, ��������� � �� ���� �����. ",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
            }
        };

        dbContext.Courses.Add(course);
        dbContext.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();