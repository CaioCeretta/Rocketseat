## Lesson 1 - Functions with Params

c# has a feature called **named arguments** for the functions.

### What are Named Arguments?

Named arguments are a feature in c# that allows us to pass values to a function by explicitly specifying the name of the
parameter along with its value. Instead of only relying on the **position** of the arguments, we can use the labels defined
in the method signature. This makes the code more expressive and to handle complex method more efficiently.

In traditional programming, we must remember the exact sequence of parameters. If a function has five different bool or
int parameters, it is very easy to swap them by mistake. Named arguments solve this by making the code "self-documenting"

We can see an example of this by defining a subtraction function where the parameter a subtracts the value of the parameter
b, and we could use something as `subtract(b: 7, a: 5)` even though its signature is Subtract(int a, int b) { return a - b }

## Lesson 2 - Returning the values

We can also make arrow functions like this

both returning the value `public int Add(int a, int b) => a + b;` or not `public void Add(int a, int b) => Console.WriteLine(a + b);`
it automatically processes a + b. Independently if that function returns something or not, this works.

And we can also define a function that return more than one value with this signature

`	public (int, string) Add(int a, int b)`

and return, for example

`return (result, "Caio");`

This way, if we utilize the dot after the variable assigned to the return, we will see that we have access to the
separate variables. However, by using (int, string), when this function returns, c# will utilize some generic name to
this. We can make use of desired aliases for these returns. such as public public (int sumResult, string name)...

We can also destructure the function call, like for example:

`(int result, string name) = instance.Add(5, 5)`
 
## Lesson 3 - Optional Parameters

Same as other languages

Reminder:
Optional parameters, like the ones we assign them a value to them, must appear after all the required parameters of the 
list.

## Lesson 4 - Creating Classes with Values

Same as other languages

## Lesson 5

We are going to create a `Car` class, and inside the Car class {} we will define a `public string Model { get; set; }`.

In C#, a property must have at least a `get` or `set` accessor.

the `public string Model { get; set; } is NOT required, just a shorthand

It is called an auto-implemented property and the compiler will secretly creates hidden setters and getters for us

One interest thing about classes in Cs is that if we don't have any constructor, we are still able to use Object Initializers.

Something like

```cs
var car = new Car
{
    Model = "Porsche",
    Color = Color.Blue,
    ReleasedAt = new DateOnly(2021, 01, 01)
};
```

Works even if there is no constructor because

. C# automatically calls an empty constructor `new Car()`
. Assigns the properties one by one

### Required Properties

For us to ensure that a property will be passed on, we can either use
`public required string ...` or defining a constructor with

```ts
  public Car(string model)
  {
    
  }
```

This will make sure that every Car object is initiated with a model. But to assign this property this property to the
instance we must

add the Model = model;

### Remember

If the property name is not strictly equal to the parameter, such as in this case, the parameter is model and the property
is Model, we can omit the this keyword and use `Model = model`. However, if the property name is exactly the same as the
parameter, we MUST use the this.Model = Model keyword, since Model could'nt only reference the property.

## Lesson 5 - What is the static keyword?

Static defines properties and behaviors associated to the class itself and not to a given object.

Static methods don't need to be called after a instance like we would on public methods. Instead of creating a new
instance using the new keyword, we can simply invoke it with ClassName.staticMethod()

Therefore, functions that don't depend on any instance value, can be declared as static.

Properties can also be static, if we define the car model as static, the model property will be shared across all the
objects. However, we must be careful on modifying that property name, because it will end up overriding it on every
other object.

Since the static function modify the static property, that property does not belong to the instance anymore, but to the
class, which now we should access this function through the `Class` itself.

### And why is the function `Main` generated as static?

When we compile the program and it generate a .exe for the program. When we click on the executable, internally it will
run `Program.Main()`, without the need of declaring an instance of `Program` 

### Can static method access instance variables?

No, static variables can't access instance variables (non-static) directly, because the static method exists "before" or
"independently" of any instance created.

### What if the class only have static methods and we can't call them after an instance?

Simply define the class as static, this way, it won't be able to be instantiated.

### And when does static makes life easier and when it becomes a trap?

#### Best Practice Scenarios

1 - Utility Classes (Helper Classes)

This is the most classic use case. When we have a function that simply processes input data and returns a result without
needing to "remember" anything (stateless).

- Examples: Math.sqrt(16), CurrencyConverter.Convert(10, "USD"), CpfValidator.Validate(text)
- Why: It makes no sense to allocate memory for an object just to sum two numbers or validate a string

2 - Singleton Design Pattern

A singleton is actually a hybrid. It uses a **static field** to hold the unique instance of the class and a **static method**
(usually `GetInstance()) to access it.

- Scenario: We want to ensure that there is only one database connection or one log manager throughout the entire application.
- Advantage over pure static: Singletons can implement interfaces and use inheritance, which pure static classes cannot
 do effectively

3 - Factory Methods

When creating an object is complex, we use static methods to instantiate them in a more readable way.
. Example: `Car.CreateSportsCar()` instead of passing 20 parameters into a new `Car()` constructor

### The Golden Rule is:

1. Use static for "tools" (logic that doesn't hold data, just processes it)
2. Use a **Singleton** (or Dependency Injection) for services that manage shared resources (like a Database), as this
keeps our code flexible for future changes

## Lesson 6 - How to debug?

Assume that inside the Program.Main() we have a number property with the value of 10, instantiate the car as we were
before, log the model name and write a simple string as "Ciao"

To debug, we have to click right before the line number, where the circle appears, in this case, inside the Main
opening brackets.

These are break points. Meaning that if we execute the program, we will see a yellow arrow above the circle, meaning
that the program has stopped right on that line.

The way we can advance to the next line/ continue he execution, is by clicking on the curved right arrow on the top bar
or press the F10 key. This skips the method. And we are able to see all the current variables values related to the
method inside the bottom bar.

If we are currently on a given step of the execution, such as method invocation, and click on the `step into` (F11). It
will **enter the file** that declares that method and highlight it.

In case we stepped into a method by accident and it is a method with multiple sets that we don't want to verify. We can
simply click on the Step Out button and it will go back to the main execution.



