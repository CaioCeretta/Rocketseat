namespace Conditionals
{
    class Program
    {
        enum Colors
        {
            Red,
            Blue,
            Yellow
        }

        static void Main(string[] args)
        {
            int number = 10;

            string result = number switch
            {
                7 => "Caio",
                1 => "André",
                10 => "Alex",
                _ => "Unknown name"
            };

            Console.WriteLine(result);
        }
    }
}
