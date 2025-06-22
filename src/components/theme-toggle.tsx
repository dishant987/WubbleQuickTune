import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full"
      aria-label="Toggle theme"
    >
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all duration-300 
        rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 
        rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
