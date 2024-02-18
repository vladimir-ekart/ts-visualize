import Controller from "./components/controller/Controller";
import { analyze } from "./helpers/analyzer";
import Renderer from "./helpers/Renderer";

interface Props {
  paths: string[];
  renderer: Renderer;
}

const main = ({ paths, renderer }: Props) => {
  const graph = analyze(paths);

  const controller = new Controller(graph, renderer);

  controller.render();
};

export default main;
