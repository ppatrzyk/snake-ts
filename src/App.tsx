import GameComponent from "./components/GameComponent";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="bg-zinc-800 text-zinc-50 min-h-screen flex flex-col justify-center items-center py-4 md:py-8 px-8 md:px-32">
      <GameComponent />
      <Footer />
    </main>
  );
}

export default App;
