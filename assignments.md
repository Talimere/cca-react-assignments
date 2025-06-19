# React+TS assignments

## #1 - Scaffold new project and clean up

### Goals:
- Create a new project and run it
- Clean up demo/boilerplate code

### Tasks:
- Run:
```bash
npm create vite@latest <project name> -- --template react-ts
```
- Open project folder in Visual Studio Code and in a new terminal window run:
```bash
npm install
npm run dev
```
- Verify that project runs on port 5173
- Clean up the App.tsx, so you're left with:
```ts
function App() {
    return(
        <>
            <h1>Hello world!</h1>
        </>
    );
}

export default App;
```
- Verify that project still runs without error message in the browser

## #2 - Basic component

### Goals:
- Create a reusable component
- Understand component trees/nesting

### Tasks:
- Create a new folder called `components` in the src folder
- Create a new tsx file called `Welcome.tsx` in the `components` folder
- Create a deafult exported function in `Welcome.tsx` that returns a greeting in a header tag
- Use the `Welcome` component in `App.tsx`
- Create another component called `Dashboard` in a file with an appropriate file name
- Use `Welcome` inside the `Dahsboard` component
- Replace the `Welcome` component in `App.tsx` with `Dashboard`

## #3 - Props

### Goals:
- Learn how data flows from parent to child component

### Tasks:
- Modify `Welcome` to accept a `name: string` prop
- Render multiple `Welcome` components with different names

```ts
//Hint
function SomeFunction({label}: string) {
    return(
        <p>I can show a {label} here</p>
    );
}
```

### Extra credit:
- Use an array of names and a for-loop to render the `Welcome` components

## #4 - State management

### Goals:
- Learn how components can track internal data

### Tasks:
- Create a `Counter.tsx` component that keeps track of a number using `useState`
- Create a button that increments the count
- Display the current count

In this task you're free to implement the `Counter` function as you wish,
try different approaches. Will you display the counter on the button, or in a separate `<p>` tag for instance?

The `Counter` component should be self-contained, which means the button and count should both exist in the component. This way, you can easily use the `<Counter />` component in `App.tsx`

### Extra credit:
Set up multiple instances of `Counter` on the web page

## #5

### Goals:
- 