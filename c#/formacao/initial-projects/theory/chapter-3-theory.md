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


