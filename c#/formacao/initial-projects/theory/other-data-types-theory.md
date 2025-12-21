## Lesson 1 - Enums

enum is a short for enumeration, it is a special value type that defines a set of named constants. It's a way to represent
a collection of related values using meaningful names instead of numbers or strings. For example

```cs
 enum DifficultyLevel
  {
    Low = 0,
    Medium = 1,
    Hight = 2,
  }
```

Here, `DifficultyLevel` is a enum that defines three different possibilities

Low is associated with 0.
Medium is associated with 1.
High is associated with 2.

The values inside enum are constant and commonly named. Instead of using arbitrary integers or strings to represent the
levels, we use the keys. This make the code more reusable and less error-prone.

### Is it the same as a ts's type?

At first glance, they seem similar but they are not.

#### Ts Type

In typescript, type is a "type alias". It does not exist in runtime, it is only used for type checking during compiling.
A similar example would be 

`type DifficultyLevel = "low" | "medium" | "high";`

```cs
let level: DifficultyLevel;
level = "high";   // ok
level = "easy";   // error 
```

Here, DifficultyLevel does not become a JS object and it only tells the TS compiler which values are allowed or not.

Think of a type as a rule for the compiler, not something the program uses while running.

#### C# enum

Enum in other hand:

Exists at runtime
Has a real numeric values (Low = 0, etc)
Can be cast to int
Occupies Memory
Compiles into real executable code

## Lesson 2 - var

Inside the classes, we define properties using `string varName = 'initialValue'`. However, we also have the possibility
to use the var keyword

With the var keyword, we leave for the compiler to define the variable type for us, instead of writing `string`, `DateTime`,
`int`, using the var keyword it will see the value being assigned to the variable and infer the type.

## Lesson 3 - Object

All types in C# inherit from a base class, which is `System.Object`. This means that by defining a variable of whatever
type and define its typing as object, c# wont give us an error

`System.Object`: In C#, every type (including the primitive ones like `int` and `bool`) implicitly inherit from it.

This doesn't mean that we can define every variable type as object thinking it will work similar as `var` 

`var` infer the type, and `object` does not.

For example, we have a Car class, and this class have two methods. By creating a new instance of that class of type
object and not of the type Car, we will be  able to see that we won't have all the autocomplete that we would if we
typed it as a Car or as var.

Even though this option is not so recommended, we can use it in some scenarios.

Like the ones where it does not make sense for us to define a type for the variable, such as cases where we want to
furthermore convert it to something else, such as a JSON conversion that don't care about the class

## Lesson 4 - Null

With optional values in c# we can do something as

		int age? = null;

		bool ageInformed = age.HasValue;

where the exclamation mark after the variable name, makes the variable option, and also enables the use of HasValue, in
case we want to check whether an optional age was informed or not
