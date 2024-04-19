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
            Name = ".Net українською",
            Description = "Серія роликів по створенню застосунків у .Net українською",
            Author = "Андрій Черніков",
            ImageLink =
                "https://i.ytimg.com/vi/fvLUo5TsPwE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD_5MuzwaYTCtEErR1MapNEa6RawA",
            CourseType = CourseTypes.Recording,
            Lessons = new List<Lesson>
            {
                new Lesson
                {
                    Title = "Урок 1",
                    Description = "Вивчення .Net українською",
                    Content = "https://github.com/chernikov",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/MwPc-9VCJ2s?si=OKRaYqgLn2vkKmwv",
                            Description =
                                "Перша серія, де ми обговорюємо проєкт і маємо список подальших дій. Основне, що нам потрібно перевірити, це роботу телеграм бота. Ми знаходимо Telegram .net API та створюємо додаток, де ми можемо вислати через телеграм бота повідомлення",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
                new Lesson
                {
                    Title = "Урок 2",
                    Description = "Вивчення .Net українською",
                    Content = "https://github.com/chernikov",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/fvLUo5TsPwE?si=Y2FaTONXoLJPhNEk",
                            Description =
                                "Друга серія, де ми перевірили, що зможемо працювати та вирішуємо написати свою першу вебпрограму, ми її створюємо. Показуємо основні моменти: як ставити visual studio, як викликати http запити, показуємо структуру http request та http response.",
                            FileType = FileTypes.YouTube
                        },
                    }
                },
                new Lesson
                {
                    Title = "Урок 3",
                    Description = "Вивчення .Net українською",
                    Content = "https://github.com/chernikov",
                    Materials = new List<Material>
                    {
                        new Material
                        {
                            Link = "https://www.youtube.com/embed/ZGWKq1Bb_Ek?si=T8kpTRgjpEH9MFJP",
                            Description =
                                "Третя серія, де ми створили щось, чим хочеться чимдуж поділитись. І для того, нам потрібно вивчити git (який ми вже бачили в першій серії), ми вивчаємо, як переглядати, викладати і що таке комміт. ",
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