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


