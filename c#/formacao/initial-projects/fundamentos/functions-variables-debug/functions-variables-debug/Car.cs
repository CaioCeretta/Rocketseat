
namespace functions_variables_debug;

public class Car
{
	//public int Model { get; set;  }
	public static string Model { get; set; }
	public DateOnly ReleasedAt { get; set; }
	public Color Color { get; set; }

	public Car(string model)
	{
		Model = model;
	}

	public void ModelName() {
		Console.WriteLine(Model);
	}
	public void CarColor() => Console.WriteLine(Color);

}

