using System.Globalization;

namespace ProjetoTeste2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            DateOnly day = new DateOnly(2025, 12, 15);

            string dayInText = day.ToString("d MMMM yyyy", new CultureInfo("en-US"));

            Console.WriteLine(dayInText);
        }
    }
}
