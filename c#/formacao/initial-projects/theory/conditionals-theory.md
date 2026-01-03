## Conditionals

Conditionals in C# is very similar to other languages that we are used to. Therefore, this documentation will only
write what is different.

In the same way we have the ternary if to associate values in a given condition. We can do the same thing on a switch

e.g.

```cs
int number = 10;

string result = number switch
{
    7 => "Caio",
    1 => "André",
    10 => "Alex",
    _ => "Unknown name"
};
```

This is a `Switch Expression`, in this case, switch isn't simply a control flow block, but a expression that returns a
value. Different from the traditional `switch`, it "returns" a result. That's why the structure is
`variable = target switch {...}`

This allows us to assign the result directly to a new variable (`string result`), making the code cleaner and concise.



