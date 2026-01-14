# Overall Comments

## Global angular

In case we don't have angular installed globally in our machine, we must create a new script property named something
as "ng", which will call the ng method from the angular cli, and for the commands such as ng generate, we should use
e.g. "npm run ng generate component test-component"

## Google Fonts

A common question is whether we should import the font on our css or on our index.html <link>. And when we need to choose
one of these.

### 1. Using <link> in the HTML (Recommended)

This way is recommended by google fonts itself. We copy the tags and paste them our <head> tag

• Advantages: It's quicker. The browser starts downloading the font as soon as it reads the HTML, even before processing
the CSS
• Performance: It allows the use of `preconnect`, which tells the browser to establish a connection with google's server
ahead of time.

### 2. Using @import inside CSS

Place the line at the very top of our stylesheet

• Pro: It keeps our HTML cleaner and centralizes everything related  to styling in the CSS. It is very useful in frameworks
where we have a "global styles" file
• Con: The browser must first download the CSS, parse it, and only then discover it needs to download the font. This can
cause the FOIT/FOUT effect (where text appears in a system font and "pops" into the google font a second later)
  . FOIT - Flash of Invisible Text: The browser completely hides the text while the font is being loaded. The text will
  only appear when the font is ready.
  . FOUT - Flash of Unstyled Text: The browser displays the text immediately using a system's default font, e, as soon
  as the custom font finishes downloading, it instantly replaces it.

### Which one should we choose?

• Performance: HTML uses parallel loading and CSS uses sequential loading
• Organization: Using links we have a "Cluttered" HTML, and imports we have a centralized CSS
• Best use cases: <link> for production sites & SEO and @import for quick prototypes or CSS-in-JS

## Aligning a flex item to the end

We may think that because exists an align-self in a flex container, that justify-self should also exist. But it doesn't.

`justify-self` does'nt work inside a Flex box. This property exists only on CSS Grids.

However, there is a classic trick. Which is the margin-left: auto;

To push a specific element to the end of the container flex, we must use automatic margins. This works because an auto
margin will occupy all the remaining space in that direction, pushing the element to the edge

### Other approaches are:

• 1. **Spacer div**: Set an empty div with `flex-grow: 1` between our items. This div will expand to fill all space, pushing
the last item to the end.

• 2. **Switch to CSS grid**: If we need a more granular control over every item's position, display grid might be a better
fit

## Occupying full flex width

In case we have a flex div that takes the full width, and we have three children inside of it, and want them to occupy
the full width of the container, we can use flex-1 in all 3 of them, and they will equally occupy the same space.

Just a reminder for the width. The parent component has a width of max-w-7xl, which means that it defines the maximum
width limit and: 

1. If the screen is smaller than 7xl, it occupies 100% of the available width
2. If the screen is bigger than 7xl, the element stops growing at that value

In other words, it don't have a width, it only sets an upper-limit

So, back to that example of the full width, in case we used 3 div inside the flex container, and the screen size is
currently smaller than 7xl, we should always add, for the responsiveness, a style of overflow-x-auto, which will create
a scroll bar for us and do not let the element leak from the parent component. 

## Hiding scroll bar

We can define a utility in our global css, and utilize the class just created inside the element that has the class overflow

## Tailwind v4

In tailwindv4, the rule is to separate what is design configuration (variables) of what is CSS logic (behaviors)

The @theme block is exclusively used to define variables that tailwind will utilize in utilities, like (colors. spacings,
fonts, ...). When creating something as the scrollbar-hidden to modify the webkit-scrollbar, it involes complex selectors
and pure CSS properties. This means that it must stay off the @theme and inside the main body of our CSS file, in a @utility
directive.

### Why does it work like this?

1. The directive `@utility`: It replaces the old way of adding layers `@layer utilities`. By using @utility, Tailwind
automatically registers the class name and generates the CSS if we use it solely in our HTML/JSX

2. Native CSS Syntax: Tailwind v4 focuses on being "CSS-first" and not "Utility-First", anymore. The use of & for nested
selectors (such as webkit's pseudo-elements) now is natively supported by modern CSS and perfectly understood by Tailwind
engine.

3. Organization: @theme is processed to generate the system design. If we put complex selectors inside of it, the compiler
may ignore them or not be able to properly map them as variables.

#### Extra tip: Pure CSS

If we don't need the class to be "trackable" by Tailwind's engine (In other words, without caring if it always available
in the final bundle), we can simply write conventional CSS like

```css
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
```

But using @utility, we maintain the consistence of "only what i use goes to the final bundle"

## Margin-Left Auto

Why does ml-auto works only inside a flex container?

This has to do with how the browser distributes the available space.

1. **The "Positive Spacing" Concept**

In a block layout (Without a flexbox), the automatic margins work in a limited form. For instance, if we give `margin: auto`
to a block with defined width, it centralizes because the browser equally divides the extra spaces.

In a flexbox, the way it works changfes. The flex container calculates all the available space that remains on the main
axis. When we apply ml-auto in a specific item, we are telling the browser: "Get all the available space to the left of
this item and transform it into a margin".

2. **Why it does'nt work in a normal flow?**

In the common rendering flow (display: block):

․ The elements try to occupy 100% of the width or vertically stack
․ The automatic horizontal margin only works to center blocks if they have a fixed width
․ `margin-left: auto` on its own only pushes the element if there is an opposite aligning logic, what the default flow 
doesn't manage in a dynamic way like flex-box

3. **Does it work somewhere else?**

Besides **Flexbox**, automatic margins also work similarly when used inside CSS Grid. If we have an item inside a grid
cell, `ml-auto` also pushes it to the end of the designated area. 

### Other use

Inside flexbox, we can also use my-auto to vertically center an item, what is way harder to do in the default flow.

**Does mt-auto pushes to the bottom and mb-auto to the top?**

Yes, but there is a fundamental rule for WHEN they work.

When working inside the row direction, mt--auto and mb-auto work in the cross axis, mt-auto is to the base of the container
and mb--auto to the top of the container.

When working inside the column direction, mt-auto and mb-auto start to control the space inside the main axis (vertical).

## Form submit

We must ensure that whenever we use two buttons inside a form, but we only want to submit that form, to always inform that
the type of the non-submit button is button. If we leave it empty, it will also submit the form

