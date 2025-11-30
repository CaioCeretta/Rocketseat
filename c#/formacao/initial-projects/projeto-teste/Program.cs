namespace HelloWorld;

class Program
{
  static void Main()
  {

    char letter = 'a';
    char number = '1';
    char character = '@';
    char space = ' ';

    string text = "Testing";

    char firstLetter = text[0];

    bool startsWithLetterT = text.StartsWith("T");

    bool endsWithIng = text.EndsWith("ing");

    Console.WriteLine(text);
    Console.WriteLine(firstLetter);
    Console.WriteLine(startsWithLetterT);
    Console.WriteLine(endsWithIng);




  }
}