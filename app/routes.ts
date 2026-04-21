import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("visualizer/:id", "routes/visualizer.$id.tsx"),
  
  // New pages with mock data
  route("products", "routes/products.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("community", "routes/community.tsx"),
  route("enterprise", "routes/enterprise.tsx"),
  
  // Catch-all for 404s - must be last
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;