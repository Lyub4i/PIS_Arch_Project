using Microsoft.EntityFrameworkCore;
using PisArch.Domain.Constants;
using PisArch.Domain.Enums;
using PisArch.Domain.Models;
using PisArch.Infrastructure;
using PisArch.Infrastructure.Repositories;
using static System.Net.WebRequestMethods;

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
            Price = 0,
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
        var cours1 = new Course
        {
            Name = "ASP.NET Core Tutorial",
            Description = "This video on What is ASP.NET will provide you with an introduction to ASP.NET Core.",
            Author = "Simplilearn",
            Price = 0,
            ImageLink =
                "https://www.webtrainingroom.com/blogimages/aspnet-core-tutorial.png",
            CourseType = CourseTypes.Recording,
            Lessons = new List<Lesson>
            {
                new Lesson
                {
                    Title = "Lesson 1",
                    Description = "Full Stack Developer (MERN Stack)",
                    Content = "https://www.simplilearn.com/full-stack-developer-course-mern-certification-training",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/fkdMdZmdBs4?si=tRdQjGrRMNMNwboX",
                            Description =
                                "First episode in our course",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
                new Lesson
                {
                    Title = "Lesson 2",
                    Description = "This video on ASP.NET LifeCycle will enable you to learn everything you need to know about LifeCycle",
                    Content = "https://www.simplilearn.com/full-stack-developer-course-mern-certification-training",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/KRYw76-yYJk?si=PmUGL5LyOBRbncKD",
                            Description =
                                "Second episode in our course",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
                new Lesson
                {
                    Title = "Lesson 3",
                    Description = "�������� .Net ����������",
                    Content = "https://www.simplilearn.com/full-stack-developer-course-mern-certification-training",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/y60P5yPlAcM?si=ShqcuUtbt5QEpjQ-",
                            Description =
                                "Third episode in our course",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
            }
        };
        var cours2 = new Course
        {
            Name = "TypeScript Tutorial in Hindi",
            Description = "Welcome, Dive deep into TypeScript as we explore code examples, error handling techniques, and the TypeScript configuration file in this comprehensive tutorial",
            Author = "Thapa Technical",
            Price = 2000,
            ImageLink =
                "https://i.ytimg.com/vi/lpsLAP4x-tk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAxyLKoFuvZa46qOCS9_iQKFlU-JQ",
            CourseType = CourseTypes.Recording,
            Lessons = new List<Lesson>
            {
                new Lesson
                {
                    Title = "Lesson 1",
                    Description = "TypeScript Tutorial in Hindi #1",
                    Content = "https://www.thapatechnical.com/",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "1ee6GHtR5fG2ZU464YngHkhUZRK4f8EvT",
                            Description =
                                "First episode in our course",
                            FileType = FileTypes.GoogleVideo
                        },
                    }
                },
                new Lesson
                {
                    Title = "Lesson 2",
                    Description = "TypeScript Tutorial in Hindi #2",
                    Content = "https://www.thapatechnical.com/",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "1XVVkZZnhqliEMQYJx_k-ft9jtGk5mwiE",
                            Description =
                                "Second episode in our course",
                            FileType = FileTypes.GoogleVideo
                        },
                    }
                },
                new Lesson
                {
                    Title = "Lesson 3",
                    Description = "TypeScript Tutorial in Hindi #3",
                    Content = "https://www.thapatechnical.com/",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "1z1HuYhmFMVk83ONXhXVzs0KsUrSNX20a",
                            Description =
                                "Third episode in our course",
                            FileType = FileTypes.GoogleVideo
                        },
                    }
                },
            }
        };

        var admin = new User()
        {
            Username = "admin",
            Role = UserRoles.Admin,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin")
        };

        dbContext.Users.Add(admin);
        dbContext.Courses.AddRange(course, cours1, cours2);
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