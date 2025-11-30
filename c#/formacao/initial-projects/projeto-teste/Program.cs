using System.Text;

namespace HelloWorld;

class Program
{
  static void Main()
  {

    string text = "The user {0} enjoys studying {1}";

    string result = string.Format(text, "Caio", "C#");

    Console.WriteLine(result);

  }
}