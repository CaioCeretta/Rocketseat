using System.Text;

namespace HelloWorld;

class Program
{
  static void Main()
  {

    string text1 = "First sentence.";
    string text2 = "Second sentence.";

    // string path = @"C:\teste\otherfolder";

    string paragraph = text1 + " " + 7 + " " + true + " " + text2;

    string paragraph2 = $"{text1} {7} {true} {text2}";

    StringBuilder stringBuilder = new StringBuilder();

    stringBuilder.Append(paragraph);

    stringBuilder.Append(paragraph2);

    string result = stringBuilder.ToString();

    Console.WriteLine(result);

  }
}