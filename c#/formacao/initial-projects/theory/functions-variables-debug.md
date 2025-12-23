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

