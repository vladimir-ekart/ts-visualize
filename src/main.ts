import Controller from "./components/controller/Controller";
import { analyze } from "./helpers/analyzer";
import { getBaseHtmlTemplate } from "./helpers/baseHtmlTemplate";

interface Props {
  paths: string[];
  updateHtml: (html: string) => void;
}

const main = ({ paths, updateHtml }: Props) => {
  updateHtml(getBaseHtmlTemplate("<div>Building Dependency Graph</div>"));

  const graph = analyze(paths);

  const controller = new Controller(graph);
  controller.render();

  updateHtml(getBaseHtmlTemplate("<div>Hello World</div>"));
};

export default main;
