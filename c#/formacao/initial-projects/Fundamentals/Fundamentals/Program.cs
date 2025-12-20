namespace HelloWord;

class Program
{
	enum DifficultyLevel
	{
		Low = 0,
		Medium = 1,
		High = 2
	}

	static void Main()
	{
		DifficultyLevel level = DifficultyLevel.High;

		int integerLevel = (int)level;

		Console.WriteLine(level);
		Console.WriteLine(integerLevel);
	}

}