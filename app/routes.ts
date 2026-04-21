import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("visualizer/:id", "routes/visualizer.$id.tsx"),
  
  // Dynamic route for under-development pages
  route(":page", "routes/under-development.tsx"),
  
  // Catch-all for 404s (must be last)
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;