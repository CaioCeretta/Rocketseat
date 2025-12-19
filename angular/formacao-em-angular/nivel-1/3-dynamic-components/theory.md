## Lesson 1 - Flow Control and Template Variables

Pretty similar to js, with the difference that it is more focused on the component's  template

- @if, @else-if and @else

. Focused on the structures, we can decide which HTML element we want to show based on conditionals.

And this comparison is usually made using the component's class properties

- @switch

Similar to if

- @for

Used to make loops over a list. And for each item of the list, we can show an HTML element, infos about the item, and so
on.


- @let   

Angular's new directive that allows us to create a variable inside the template and easy the reading/organizing of our
flows.

## Lesson 2 - @if @else-if @else

If will be useful for letting the component's template dynamic. We can display an HTML snippet based on a condition.

### @if

@if replaces the previous `ngIf` directive that we may still find in some projects and it is used to determine the conditions.

@else if

In case @if condition returns false (not required)

@else

In case no conditions are met

@if have a nice functionality where it enables us to store the value of the expression. For example

### as variable

`@if(userRole === 'admin'; as result) {...}`

the as variable used in the control flow is used to capture the result of the conditional expression and reuse it inside
the block, without having to call a function or accessing a complex variable multiple times

In practice, if we use a simple boolean, like @if(userRole === "admin")
  . result will be the boolean `true`
  . it has low utility in this case, because we already know it is true

This is often useful when the @if condition involves an Observable, using a pipe async or a function that returns a transformed
object/value

### ngIf directive

The syntax was basically, using this directive inside a tag, made the expression inside the quotes, and choose whether to
display the element based on the conditional

And the else were a little more complex. A ng-template should be created, and this ng-template had the id of that template,
which would usually consist of a div inside of it. And back to the first ngIf, after the expression we would add a semicolon
else ng-templateId. And this would have to be done for every else condition we wanted to add

And this is the main reason why angular introduced the new **Control Flow (@if) **, the syntax of *ngIf with `else` was
counter-intuitive because it used to mix attributes with template references.

And in order to use it. We also have to import it inside the ts imports the `CommonModule` that exports these utility
functions like ngIf, ngFor, and more. And we could also import simply the NgIf

## Lesson 3 - @switch

switch is angular is very similar to switch on other languages

we use @switch(property), and for the cases we use the directive @case("possibleValue")

## Lesson 4 - @for

### @for

for is used to render list items in a component's template

Its syntax is pretty simple:
 @for(item of array; track: item.id) {
  <div>
  </div>
 }

 And to the track, we pass a unique identifier for each item of that list and it
 helps angular to know when the list has changed and won't have to rerender every
 item in the DOM, be them removed, handled, and so on — It knows which item has
 changed.

 And at the end of @for block, we are able to use @empty to add what we want to be rendered in case no item is on the array.

 And if after removing every item, we call the update list, angular will notice that the new list is the same as the one
 that was previously assigned to the array and not cause another render

### Removal

We can notice, that when we remove an item from that list, using the method that calls a filter, the list isn't fully
rendered again, only the item that is removed.  


### @ngFor

ngFor came before the @for directive. It was pretty similar to ngIf, with the syntax of:

<div *ngFor="let item of array">{{ item.name }}</li>

ngFor don't have a @empty directive, if we wish to have the same behavior as empty, we would need to wrap it `ng-container`
containing a ngIf define go to a pre defined ng-template for the else clause

Track used to be called trackBy: trackById, where this trackById is going to be a class method that receives the id (in
this case, implicit) to this tracking.


## Lesson 5 - @let

@let is a new angular syntax that allow us to define a local variable and re-use it across a template, similar to the JS
one.
   
In our example we have an array of person containing two objects where one of them has the property address and the other
does not.

Then, in our template, where it displays the list of people, in case one of these people has an address, it creates a variable
with `@let personAddress = person.address;` and adds a conditional with this variable

```ts
@if(personAddress) {
  <p>Street: {{ personAddress.street + ', ' + personAddress.number }}</p>
}
```

Showing us that this fulfill the purpose of defining a variable on the template and using it across the html.

## Lesson 6 - Communication between components

- Passing values to the component with @Input: Parent to child
- Receiving values fr om the component with @Output: child to parent
- Lifecycle ngOnChanges: Every time we receive a value on an input, this lifecycle method is fired
- Lifecycle ngOnInit vs Constructor: Difference between the life cycle ngOnInit and the constructor — Where do we have to
execute some logic when initiating the component

## Lesson 7 - @Input

We initially are using the let to get the quantity of items and using a for to render it.

Let's say that we think that the component has too many responsibilities, how can we create a componentization to improve
the comprehension and readability?

To achieve this, we have to create a new component to separate that @for div, where we display the person from the component
that fetches the person list and pass i t forward.

The `@Input` property requires an initializer. But if we are sure that the value is never going to be undefined when we
call this property, we can use a non-null assertion on it

An input can also receive an object containing its validations, alias, and more, as a property. But in many cases, we
utilize the raw @Input() propertyName: Type

For this example, we are going to create an input component, and inside the input folder, create another component for the
person item:

Since we want to use that person for the input template we will do the following:

. First we will start by moving the div that represents a person to the new person component
. Reference this new component inside the for loop of the input component.
. To send the person information to the child, we are going to pass it via @Input.
. In the child component's ts we create a property annotated with @Input() using the interface defined in the person's
array, like `@Input() person: IPerson`


. To use this new property, first we have to import the child component inside the parent's ts, and inside of the component
where we call the <app-person> component, and add an attribute with
`[nameOfTheInput]="variableWeWantToPassIn"`

### Best place to store our interfaces

Even though in the case above we are storing the interface inside the component. The ideal was that the interfaces were in
a separated files, such as a app/interfaces

## Lesson 8 - Output

We use `@Output` for properties that we want to use to communicate with the parent component

Now we are going to increment the person component so it "talks" with its parent.

Assume we have a button, and when we click on it, we will tell the parent component that we want to remove that person,
and the parent will want to know which person it wants to remove to execute the removal of it.

We then call (click)="removePerson" which will be a method defined as output on the parent. Because it is the parent 
component that manages the people list, and it is it that must indeed remove it.

The child component is only a "dumb" component, it is only used to show the information on the screen and have basic logic
concerning itself

This will be done with these steps

1 - First, on the person component(child) we create the method we are defining in the (click) method
2 - We then create the @Output property `removePersonEmit` and assign to it a new `EventEmitter()`. Every time we create
Outputs, we always have to create an instance of `EventEmitter`. 
3 - EventEmitter constructor have a generic typing, that tells which value it will emit. Which in this case, it will be
a number (type of person id parameter).
4 - Now, when the (click) is triggered, we invoke that removePersonEmit.emit passing as parameter, the one received on the
click
5 - Now, the parent component must receive this value being emitted. To do so, we will make the parent component to subscribe
to this `removerPessoaEmit` property that is being outputted.
6 - When this component emit a value, we want to execute something on the parent, which will be the execution of a method
that removes that id from the list. For us to get that id being sent by the output, we use the reserved word $event


## Lesson 9 - ngOnChanges

ngOnChanges is a lifecycle method that is fired every time the values of a component's input change. Therefore, if we have
to execute some logic when that happens, that is the place.

For this, inside the person component, which is the component that has the @Input, we will implement the onChanges interface.

It is not required to implement this interface, but it is a good practice because it will require us to implement the 
`ngOnChanges` method

This method is executed by angular itself. Angular calls it under the hood every time a `@Input()` value changes.

It is not recommended to invoke this method, like `this.ngOnChanges...`, let angular to deal with its life cycles.

this method receives a changes parameter, of the type SimpleChanges. By logging the value of changes we will notice:

. changes is an object
. it will have the name of the inputs, in this case, the `person` object we are sending to it.
. the input pessoa will be another object of type simple change containing the currentValue (the one we are passing in).
the firstChange, which will be true on its initialization and false after every change. and the previousValue attribute

### Does the previous value "gets" the initial value we define in the `@Input()`?

The short answer is **no**. 

We defined the input person with the ! non null assertion, this tells TS that:

"trust me, this property will be initialized at some point". It doesn't initialize any value in runtime

For angular, before the first binding, person is undefined

### Why does previousValue starts at null or undefined? 

At the first time angular makes the @Input binding there is no previous value and with the first change as true. Even if
the parent passes an initial object, there is no "before". It doesn't consider the default value as the previous one. The
change cycle begins in the binding coming form the parent

previousValue stops being undefined only after the second change     

### input objects and arrays

When we are dealing with one of these two types, when we simply alter the one property of the object, it won't reflect on
ngOnChanges. For it to be called again, we need to create a new reference in memory, by creating another instance of object.

We can see this in action by creating a method that changes a person name onclick, and even though we have the console log
inside the ngOnChanges method, it doesn't fire this method

If we want ngOnChanges to be fired and to treat that new value. We need to make use of the immutability concept, and create
a new object on the peoples array that will spread over all the already existing person properties, and update only its name.
like: `this.people[0] = { ...this.people[0], name: "Updated" };`

### Is this 

I thought so, since we are modifying an item on the array in a specific position, but the anser is **no**, and we are actually
using the correct pattern.

But what the code is really doing is:

. it creates a new object
. copies every property of the old object
. overwrites the name
. **replace** the item in index 0

The object is being re-created, not updated. It is a new memory reference but with the same values.



