### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
**Answer:** Main differences are shown below:

| Method | Description | Selects By | Returns | CSS Selector | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **getElementById** | Selects a single element by its unique ID. | ID name | One element only | No | `document.getElementById("title")` |
| **getElementsByClassName** | Selects all elements with the same class; returns a live collection. | Class name | HTMLCollection | No | `document.getElementsByClassName("text")` |
| **querySelector** | Selects the first element that matches a CSS selector. | CSS selector | First matching element | Yes | `document.querySelector(".text")` |
| **querySelectorAll** | Selects all elements that match a CSS selector; returns a static list. | CSS selector | NodeList | Yes | `document.querySelectorAll(".text")` |
 

---
### 2: How do you create and insert a new element into the DOM?

**Answer:** Creating and inserting a new element into the DOM is done in two main steps.

 **Step 1:** Create the Element

We use `document.createElement()` to create a new HTML element.

const newItem = document.createElement("li");
 
```javascript
const newItem = document.createElement("li");
newItem.innerText = "New List Item";
```
We can add text using innerText.

 **Step 2:** Create the Element


After creating the element, we attach it to an existing parent element.
appendChild() → adds the element at the end

prepend() → adds the element at the beginning
```javascript
const myList = document.getElementById("myList");
myList.appendChild(newItem);
```
---
### Q3: What is Event Bubbling? How does it work?
**Answer:** Event Bubbling means when an event happens on an element, it starts from that element and then moves upwards to its parent elements.

**How it works:**

If a button is inside a div, and the div is inside the body:

- First, the event runs on the button

- Then, it goes to the div

- Finally, it reaches the body and document

For example:
```javascript
button.addEventListener("click", function () {
  console.log("Button clicked");
});

div.addEventListener("click", function () {
  console.log("Div clicked");
});
```
---
### Q4: What is Event Delegation in JavaScript? Why is it useful?

**Answer:** Event Delegation is a method where we add one event listener to a parent element instead of adding listeners to every child element.

**Why it is useful:**

-  Clean Code: Reduces code repetition.
-  Dynamic Elements: It automatically works for new elements added later.
-  Memory Efficiency: Saves memory by using only one listener for many items.



For example:
```javascript
const parentDiv = document.querySelector("#parent");
parentDiv.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log(event.target.innerText);
  }
});
```
---
## Q5: Difference Between `preventDefault()` and `stopPropagation()`

**Answer:** The main differences are shown below:

| Method | Stops | Example |
|--------|-------|---------------|
| `preventDefault()` | Default browser action | Clicking a link but the page does not open |
| `stopPropagation()` | Event bubbling up to parent elements | Clicking a child button does not trigger parent click |






