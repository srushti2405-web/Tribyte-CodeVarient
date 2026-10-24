import { Routes, Route } from "react-router-dom";
import { OpeningSceneHero } from "./components/OpeningSceneHero";
import { Archive } from "./components/Archive";
import { CuriosityCabinet } from "./components/CuriosityCabinet";
import { LanternSkyPage } from "./components/LanternSkyPage";
import { Us } from "./components/Us";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<OpeningSceneHero />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/cabinet" element={<CuriosityCabinet />} />
      <Route path="/graveyard" element={<Us />} />
      <Route path="/us" element={<Us />} />
      <Route path="/lantern" element={<LanternSkyPage />} />
      <Route path="*" element={<OpeningSceneHero />} />
    </Routes>
  );
}

export default App;
