import "./App.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <ThemeToggle />
      <Button variant="destructive" size="lg">
        Button
      </Button>
    </>
  );
}

export default App;
