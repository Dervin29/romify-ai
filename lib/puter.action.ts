import puter from "@heyputer/puter.js";
import { getOrCreateHosting, uploadImageToHosting } from "./puter.hosting";
import { isHostedUrl } from "./utils";
import { PUTER_WORKER_URL } from "./contasts";

export const signIn = async () => await puter.auth.signIn();

export const signOut = async () => puter.auth.signOut();

export const getCurrentUser = async () => {
  try {
    return await puter.auth.getUser();
  } catch (error) {
    return null;
  }
};

export const createProject = async ({
  item,
  visibility = "private",
}: CreateProjectParams): Promise<DesignItem | null | undefined> => {
  if (!PUTER_WORKER_URL) {
    console.error("Missing VITE_PUTER_WORKER_URL; skip history fetch");
    return null;
  }

  const projectId = item.id;

  const hosting = await getOrCreateHosting();

  const hostedSource = projectId
    ? await uploadImageToHosting({
        hosting,
        url: item.sourceImage,
        projectId,
        label: "source",
      })
    : null;

  const hostedRendered =
    projectId && item.renderedImage
      ? await uploadImageToHosting({
          hosting,
          url: item.renderedImage,
          projectId,
          label: "rendered",
        })
      : null;

  const resolvedSource =
    hostedSource?.url ||
    (isHostedUrl(item.sourceImage) ? item.sourceImage : null);

  if (!resolvedSource) {
    console.warn("Failed to resolve source image URL for project creation.");
    return null;
  }

  const resolvedRendered =
    hostedRendered?.url ||
    (item.renderedImage && isHostedUrl(item.renderedImage)
      ? item.renderedImage
      : null);

  const {
    sourcePath: _sourcePath,
    renderedPath: _renderedPath,
    publicPath: _publicPath,
    ...rest
  } = item;

  const payload = {
    ...rest,
    sourceImage: resolvedSource,
    renderedImage: resolvedRendered || undefined,
  };

  try {
    // call to puter worker to store project to kv
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/save`,
      {
        method: "POST",
        body: JSON.stringify({ project: payload, visibility }),
      },
    );

    if (!response.ok) {
      console.error("Failed to create project:", response.statusText);
      return null;
    }

    const data = (await response.json()) as { project?: DesignItem | null };
    return data?.project ?? null;
  } catch (error) {
    console.error("Failed to create project:", error);
    return null;
  }
};

export const getProjects = async () => {
  if (!PUTER_WORKER_URL) {
    console.error("Missing VITE_PUTER_WORKER_URL; skip history fetch");
    return [];
  }

  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/list`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      console.error("Failed to fetch projects:", response.statusText);
      return [];
    }

    const data = (await response.json()) as { projects: DesignItem[] };
    return Array.isArray(data?.projects) ? data.projects : [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const getProjectById = async ({ id }: { id: string }) => {
  if (!PUTER_WORKER_URL) {
    console.warn("Missing VITE_PUTER_WORKER_URL; skipping project fetch.");
    return null;
  }

  console.log("Fetching project with ID:", id);

  try {
    const response = await puter.workers.exec(
      `${PUTER_WORKER_URL}/api/projects/get?id=${encodeURIComponent(id)}`,
      { method: "GET" },
    );

    console.log("Fetch project response:", response);

    if (!response.ok) {
      console.error("Failed to fetch project:", await response.text());
      return null;
    }

    const data = (await response.json()) as {
      project?: DesignItem | null;
    };

    console.log("Fetched project data:", data);

    return data?.project ?? null;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
};
