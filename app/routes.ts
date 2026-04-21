import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("visualizer/:id", "routes/visualizer.$id.tsx"),

  // keep this ONLY if you really need it
  route(":page", "routes/under-development.tsx"),

  route("*", "routes/not-found.tsx"),
];
