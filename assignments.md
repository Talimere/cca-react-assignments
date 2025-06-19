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
- Create a new tsx file called `Welcome.tsx`
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

### Extra credit:
- Use an array of names and a for-loop to render the `Welcome` components

