import GameSettings from "./components/GameSettings";
import GameWrapper from "./components/GameWrapper";

function App() {
  return (
    <main className="bg-zinc-800 text-zinc-50 min-h-screen flex flex-col justify-center items-center py-4 md:py-8 px-8 md:px-32">
      <GameSettings />
      <GameWrapper width={1024} height={768} />
      <div className="mt-auto">
        <span>
          <a className="underline" href="https://github.com/ppatrzyk/snake-ts">
            Source code
          </a>
        </span>
      </div>
    </main>
  );
}

export default App;
