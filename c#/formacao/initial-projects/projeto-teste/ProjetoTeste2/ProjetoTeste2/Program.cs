using System.Globalization;

namespace ProjetoTeste2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            DateOnly day = new DateOnly(2025, 12, 15);

            string dayInText = day.ToString("d MMMM yyyy", new CultureInfo("en-US"));

            DateTime day1 = new DateTime(2025, 12, 15);

            DateTime today = DateTime.Today;

            Console.WriteLine(today);

        }
    }
}
