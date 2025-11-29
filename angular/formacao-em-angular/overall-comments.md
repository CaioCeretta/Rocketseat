## Attributes / Properties / Class Fields

### Angular's Nomenclature

The reason why in angular calling an attribute of the class as a "field", "property", or "attribute", is a matter of
**language convention, OOP context**, and, especially, **DOM terminolog in angular**

Detailing why the term "property" is the most common in the angular context

### 1. Fields (Class Fields): What exist in our typescript code
### 2. Properties (Object Properties) — What exists at runtime

Therefore, attribute is just the way developers often informally use to mean a field of a class.

Field is when we talking about the class code
Property when talking about the object at runtime

The reason i got confused is

"This is inside the class, so it's an attribute"

That's exactly how we would describe it in Java or C#, however in Angular we have some differences

### Angular

Angular templates access the instance, not the class definition, so they always refer to: **Component Properties**

That's why Angular documentation always says "class properties", even though in classic OOP we would call them attributes/fields

The confusion came from the fact that

✔ In strict OOP languages, fields ≠ properties
✔ In TypeScript, fields → always become → properties
✔ Angular uses the runtime perspective (“properties”), not the class-definition perspective (“fields”)

### The simplest way to remember is

✔ When we write inside the class → it’s a field
✔ When the class is instantiated → it becomes a property
✔ “Attribute” is an informal OO word often used to mean “field,” but TypeScript doesn’t officially use that term
