var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/api/check", (MultiplicationAnswer payload) =>
{
    var expected = payload.Left * payload.Right;
    var isCorrect = payload.Answer == expected;

    return Results.Ok(new CheckResult(
        isCorrect,
        isCorrect ? "Succès" : "Incorrect"
    ));
});

app.Run();

record MultiplicationAnswer(int Left, int Right, int Answer);
record CheckResult(bool IsCorrect, string Message);
