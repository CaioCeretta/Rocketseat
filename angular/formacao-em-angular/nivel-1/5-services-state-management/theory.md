## Lesson 1 - Services?

### What are angular services?

In angular, while `@Input()` and `@Output()` are essential for direct communication between parent ad child, they become
problematic as an applications grows. Services offers a more scalable way to manage data and logic

### The Problem: Coupling and "Prop Drilling"

Imagine a component tree: a **Container** (Parent) holds several **Child** components, which in turn hold **Grandchild** components.

If a Grandchild needs data from the Parent, the Child must receive that data via @Input() solely to pass it down, even if
the Child doesn't use it. The same happens in reverse with @Output(): for a Grandchild to notify the Parent of a change,
the event must "mix" through every intermediate layer.

### This creates two major issues:

1. **Tight Coupling**: Components become dependent on the structure of others. Moving a component to a different part of
the app breaks the communication chain.

2. **Maintenance Burden**: Any change to the data structure requires updates to every component in the "cascade," making
refactoring difficult and error-prone.

### **The Solution**: Centralized State with Services

• **Centralize Logic and State**: The list of products and the functions to add or remove them live in the Service, not
the component.

• **Persistent Data across Routes**: When you navigate from "Route X" to "Route Y" components are destroyed and recreated.
Services (typically provided at the root) stay alive, allowing data to persist during navigation.

• **Direct Communication**: Any component, regardless of its depth in the tree, can "inject" the service and access the
data directly, bypassing unnecessary intermediaries.

**Key Takeaway**: Components should focus on Presentation (how things look). Services should focus on Logic and Data
(how things work).





