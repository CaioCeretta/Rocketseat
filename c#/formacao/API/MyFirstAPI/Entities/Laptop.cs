namespace MyFirstAPI.Entities;

public class Laptop : Device
{

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