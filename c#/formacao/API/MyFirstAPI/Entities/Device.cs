namespace MyFirstAPI.Entities;

public abstract class Device
{
  protected bool isConnected() => false;

    public abstract string GetBrand();
}