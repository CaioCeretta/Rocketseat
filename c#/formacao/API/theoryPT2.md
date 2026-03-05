## Lesson 1 - Inheritance

Let's a DeviceController class for this example.

When we add a new Controller from vs code, it creates a new controller class which inherits from `ControllerBase`

The `: BaseClass` is how we create an inheritance in C#

### Centralizing Attributes 
One interesting approach the instructor likes to take, to reuse attributes, is to create a Controller with the project
name as its name + Controller. This class will set the route attribute and the ApiController attribute. Now, every class
will extend that class, which extends from the ControllerBase, centralizing the Route and Api attributes in a single file.

By doing this, if it a certain point, we choose to modify the api route, we only have to modify it in one place.

### Optional This

We were able to modify the inherited attribute by simply assigning a new value to its name, but, we didn't had to prefix
the attribute with the `this` keyword, why? 

In C#, when we access a property or a field that was inherited from the parent (base), the compiler automatically understands
that we are referring to that instance member, unless there is an ambiguity.

1. Why `this` is optional?

The compiler follows a fetch order. When we write something as `Author = 'Regina';`, it searches:

1. A local variable inside the method
2. A field or property inside the current class
3. A field or property in the parent class

Since it finds `Author` in the parent class, it automatically "binds". THe use of `this.Author` would just be a specific
qualifier to say "this attribute of this instance"

2. When `this` (or `base`) becomes necessary?

There are two main scenarios where the clarity requires more than just one attribute

• **Ambiguity (Shadowing)**: If the method had a parameter with the same name

```cs
public void SetAuthor(string Author) 
{
    this.Author = Author; // Here `this` differentiates the attribute from the parameter.
}
```

• **Overwriting (Hiding)**: If the child class has an attribute with the **same name** as the parent, and we specifically
want the parent's, then we use `base.Author`

## Lesson 2 - Protected Access Modifier

Start by creating an entities folder and three base classes inside of it. A `Device` class, that will be the base class,
and two other classes: `Smartphone` and `Laptop` that inherits the Device class.

In the DeviceController's GET function, we create a new instance of `Laptop`, and through this instance, define a model
variable equal to the result of `laptop.GetModel()` method. This method will return a certain laptop model in case a
variable inside the `Device` class is true. Which could be done due to inheritance. In case we change the access modifier
from the isConnected variable visibility from public to private, its children, that have a condition based on that variable.
Will stop working.

If we change the access modifier from private to protected, every classes that are derived from it. The ones that inherit
it. Can visualize it.

## Lesson 3 - Understanding abstract

Let's say we create an instance of the Device class. But it usually does not make sense to have an instance of the parent
class, in most cases, we should only have instances of derived classes.

There is a way to block the creation of the parent class (In this case, Device), which is to turn the class to `abstract`.

When we say that a class is abstract, we are telling the compiler that we can't  create a new `Device` instance, because we
can't create instances of abstract classes.

Not only classes can be abstract, functions and properties can also be abstract. But we must be cautious of one thing. If
we have a function or a property that is abstract, the class MUST also be abstract. But when we define the class as abstract
we are not obligated to define the methods or properties as abstract.

While abstract prevents us from creating instances of the class, a function defined as abstract will obligate all the
child classes to implement that function. And this abstract function can't have an implementation. Imagine this scenario

We are inside an abstract class, such as Device. Inside this class, we have a method `GetBrand()`, which will return the
brand of the device.

However, we are inside the context of Device, a device doesn't have a brand. What has a brand is a laptop, smartphone, etc.
A device is a more generic thing.

Therefore, we want to require all children of device, to have and implement this function. If we want to write a signature
of how the children must create this method. The abstract class will have something as

`public abstract string GetBrand();`

How the function will be implemented, is up to the child.

As soon as we create this signature on the parent, whichever class that inherits from this class, is going to be warned
that it must implement this new method. So inside every child, we now have to

```cs
public override string GetBrand()
{

}
```

`override` is the act of a child class to provide a specific implementation for a method that was already declared in the
parent class.

Even though the parent's function does not have a body, it defines a signature (name, parameters and return type). When
the child class uses override, it is basically saying: "I know that my parent has already explained to me what i should
do, but i am the one going to decide HOW to do it my way."







