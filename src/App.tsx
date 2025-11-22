import { useEffect } from "react";
import "./App.css";
import AppRouter from "./router";
import { useAuthStore } from "./store/auth.store";

function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    init();
  }, []);
  
  return (
      <AppRouter />
  );
}

export default App;
