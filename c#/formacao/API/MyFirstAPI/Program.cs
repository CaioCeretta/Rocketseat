
namespace MyFirstAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            builder.Services.AddControllers();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

            //         var test = builder.Configuration.GetSection("Object").GetSection("Prop1").Value;
            //test = builder.Configuration.GetSection("Object").GetSection("Prop2").Value;
            //test = builder.Configuration.GetSection("Object").GetSection("PropA").Value;

            //var test = builder.Configuration.GetSection("MyClass").GetSection("Number").Get<int>();

            var test = builder.Configuration.GetValue<int>("MyClass:Number");



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
        }
    }
}
