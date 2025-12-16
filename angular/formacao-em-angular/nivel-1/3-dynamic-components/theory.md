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

@if replaces the previous `ngIf` directive that we may still find in some projects.