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

