namespace MyFirstAPI.Entities;

public class Laptop : Device
{
    public override string GetBrand()
    {
        return "Apple";
    }

    public string GetModel()
  {
    var connected = isConnected();

    if (connected)
    {
      return "MacBook";
    }
    return "unknown";
  }

}