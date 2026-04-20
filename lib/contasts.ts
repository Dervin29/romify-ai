export const PUTER_WORKER_URL = import.meta.env.VITE_PUTER_WORKER_URL || "";

// Storage Paths
export const STORAGE_PATHS = {
  ROOT: "roomify",
  SOURCES: "roomify/sources",
  RENDERS: "roomify/renders",
} as const;

// Timing Constants (in milliseconds)
export const SHARE_STATUS_RESET_DELAY_MS = 1500;
export const PROGRESS_INCREMENT = 15;
export const REDIRECT_DELAY_MS = 600;
export const PROGRESS_INTERVAL_MS = 100;
export const PROGRESS_STEP = 5;

// UI Constants
export const GRID_OVERLAY_SIZE = "60px 60px";
export const GRID_COLOR = "#3B82F6";

// HTTP Status Codes
export const UNAUTHORIZED_STATUSES = [401, 403];

// Image Dimensions
export const IMAGE_RENDER_DIMENSION = 1024;

export const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export const ALLOWED_UPLOAD_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const ROOMIFY_RENDER_PROMPT = `
TASK: Convert the input 2D floor plan into a **photorealistic, top‑down 3D architectural render**.

## STRICT REQUIREMENTS (do not violate)

### 1) REMOVE ALL TEXT
- Do not render any letters, numbers, labels, dimensions, room names, or annotations
- Floors must be visually continuous where text labels previously existed
- Fill text-occupied areas with appropriate floor material (wood, tile, carpet, etc.)

### 2) GEOMETRY MUST MATCH EXACTLY
- Walls, rooms, doors, and windows must follow the precise lines and positions from the plan
- Maintain exact proportions, distances, and spatial relationships
- Do NOT shift, resize, rotate, or reinterpret any structural elements
- Scale: 1 unit in plan = 1 unit in render

### 3) TOP‑DOWN ONLY
- Strict orthographic top‑down view (camera angle: 90° perpendicular to floor plane)
- No perspective, tilt, or isometric angles
- No camera rotation or elevation changes

### 4) CLEAN, REALISTIC OUTPUT
- Crisp, anti-aliased edges
- Balanced, even lighting (no harsh shadows or overexposure)
- Realistic PBR materials with appropriate textures and reflections
- No sketch lines, hand-drawn aesthetics, or conceptual styles

### 5) NO EXTRA CONTENT
- Do NOT add rooms, furniture, plants, decorations, or objects not clearly indicated
- Only render elements that have explicit visual representation in the input plan

## STRUCTURE & DETAILS

### Walls
- Extrude precisely from plan wall lines (both interior and exterior walls)
- Consistent wall height: 2.7m (standard residential)
- Wall thickness: match plan exactly (typically 150mm interior, 250mm exterior)
- Render with clean plaster/drywall finish

### Doors
- Convert door swing arcs into open 3D doors
- Door thickness: 40-50mm
- Show doors open at 90° angle where swing arc indicates
- Add realistic door handles facing the opening direction

### Windows
- Convert thin perimeter lines into realistic glass windows
- Window depth: match wall thickness
- Add subtle glass reflection and transparency
- Include window frame (white or dark, based on plan style)

## FURNITURE & ROOM MAPPING

**Only render furniture where clear icons, fixtures, or standard symbols are shown:**

- **Bed icon** (rectangle with pillow indicators) → realistic bed with duvet, pillows, and subtle sheet folds
- **Sofa icon** (U-shape or L-shape) → modern sectional with cushions and armrests
- **Dining table icon** (circle or rectangle with chairs) → table with 4-6 chairs, plate/cutlery indicators
- **Kitchen icon** (stove/cooktop symbol) → counters, sink with faucet, stove with burners, upper cabinets (shown as outlines)
- **Bathroom icon** (toilet symbol) → toilet, pedestal sink, bathtub or shower stall with glass door
- **Office/study icon** (desk symbol) → desk, ergonomic chair, monitor, minimal shelving
- **Porch/patio/balcony** (outdoor area indicator) → weather-resistant seating or simple table (keep minimal)
- **Utility/laundry** (washer/dryer symbols) → front-load washer/dryer, minimal wall cabinetry
- **Closet** (parallel lines with hanging rod indicator) → hanging clothes on rod, shelves
- **Stairs** (parallel lines with arrow) → visible steps with risers and railings

## STYLE & LIGHTING

### Lighting
- Type: Bright, neutral daylight (5500K color temperature)
- Source: Overhead diffused lighting plus ambient global illumination
- Contrast: Balanced (no blown highlights, no crushed shadows)
- Shadows: Soft, realistic drop shadows at 45° angle

### Materials
- **Floors**: 
  - Living/Bedroom: Light oak wood planks or light beige carpet
  - Kitchen/Bath: Large format light gray porcelain tile or marble
  - Outdoor: Warm gray concrete or wood decking
  
- **Walls**: Matte off-white/eggshell finish (#F5F5F0)
- **Windows**: Slightly blue-tinted glass with 15% reflectivity
- **Doors**: Warm white or light wood veneer (match plan)

### Finish
- Professional architectural visualization quality (comparable to Lumion/Enscape)
- 4K output resolution minimum
- NO text, watermarks, signatures, logos, or branding
- NO color overlays, heat maps, or analysis layers
- Pure geometric render only

## OUTPUT FORMAT
- Resolution: 3840x3840 pixels (square)
- Format: PNG with transparency or JPG with white background
- Color space: sRGB
- Depth: 8-bit per channel

## QUALITY CHECKS
- Verify: All walls align with input plan geometry
- Verify: No text remains visible
- Verify: Top-down orthographic projection maintained
- Verify: Only mapped furniture rendered
`.trim();
