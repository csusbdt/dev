import "./scripts/main.js";
import { image  } from "./scripts/image.js";
import { circle } from "./scripts/circle.js";

image("photos/palace_of_electricity.jpg").fill().start();

circle(228, -140, 60, 0, 645, 460).start();
