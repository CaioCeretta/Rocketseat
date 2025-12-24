namespace functions_variables_debug;

class Program
{
	static void Main()
	{
		int number = 10;

			var myCar = new Car("Porsche")
		{	
			Color = Color.Red,
			ReleasedAt = new DateOnly(2020, 1, 1)
			 
		};

		myCar.ModelName();



	}
}