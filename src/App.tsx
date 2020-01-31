import React from "react";
import AppLayout from "./layouts/AppLayout";
import Hangman from "./components/Hangman";

const App = () => {
  return (
    <AppLayout>
      <Hangman />
    </AppLayout>
  );
};

export default App;
