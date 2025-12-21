namespace LegacyHelloWorld;

class LegacyProgram
{
	static void LegacyMain()
	{
		//int[]  integers = new int[10];

		//integers[0] = 1;
		//integers[1] = 2;
		//integers[2] = 3;

		//int[] integers2 = [1, 2, 3];



		//Console.WriteLine(integers.Length);
		//Console.WriteLine(integers[0]);
		//Console.WriteLine(integers[1]);
		//Console.WriteLine(integers[2]);

		//Console.WriteLine(integers2[0]);

		int[,] integers = new int[10, 10];

		integers[0, 0] = 1;
		integers[0, 3] = 2;

		Console.WriteLine(integers.Length);

		Console.WriteLine(integers[0, 0]);
		Console.WriteLine(integers[0, 1]);
		Console.WriteLine(integers[0, 3]);
	}
}
