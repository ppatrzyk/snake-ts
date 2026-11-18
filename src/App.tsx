import { useCallback, useMemo, useState } from "react";
import Phaser from "phaser";

import GameSettings from "./components/GameSettings";
import GameWrapper from "./components/GameWrapper";

function App() {
  const [gameKey, setGameKey] = useState(crypto.randomUUID());

  const eventEmitter = useMemo(() => new Phaser.Events.EventEmitter(), []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    // console.log("restart handler", e.timeStamp, e.isTrusted);
    setGameKey(crypto.randomUUID());
  }, []);

  return (
    <main className="bg-zinc-800 text-zinc-50 min-h-screen flex flex-col justify-center items-center py-4 md:py-8 px-8 md:px-32">
      <GameSettings eventEmitter={eventEmitter} />
      <p>{gameKey}</p>
      {/* <button onClick={() => {console.log("restart handler"); setGameKey(crypto.randomUUID())}}>Restart</button> */}
      <button type="button" onClick={handleClick}>
        Restart
      </button>
      <GameWrapper
        key={gameKey}
        width={1024}
        height={768}
        eventEmitter={eventEmitter}
      />
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
