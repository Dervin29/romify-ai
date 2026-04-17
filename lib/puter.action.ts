import puter from "@heyputer/puter.js";
import { getOrCreateHosting, uploadImageToHosting } from "./puter.hosting";
import { isHostedUrl } from "./utils";

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
}: CreateProjectParams): Promise<DesignItem | null | undefined> => {
  const projectId = item.id;

  const hosting = await getOrCreateHosting();

  const hostedSource = projectId
    ? await uploadImageToHosting({
        hosting,
        url: item.sourceImage,
        projectId,
        label: "source",
      }).catch(error => {
        console.error("Failed to upload source image:", error);
        return null;
      })
    : null;

  const hostedRendered =
    projectId && item.renderedImage
      ? await uploadImageToHosting({
          hosting,
          url: item.renderedImage,
          projectId,
          label: "rendered",
        }).catch(error => {
          console.error("Failed to upload rendered image:", error);
          return null;
        })
      : null;

  // Fall back to original source image if upload failed or URL is already hosted
  const resolvedSource = hostedSource?.url || item.sourceImage;

  if (!resolvedSource) {
    console.warn("Failed to resolve source image URL for project creation.");
    return null;
  }

  // For rendered image: prefer hosted version, then original if it exists and is valid
  const resolvedRendered = hostedRendered?.url || item.renderedImage || undefined;

  const {
    sourcePath: _sourcePath,
    renderedPath: _renderedPath,
    publicPath: _publicPath,
    ...rest
  } = item;

  const payload = {
    ...rest,
    sourceImage: resolvedSource,
    renderedImage: resolvedRendered,
  };

  try {
    // Note: If resolvedSource is a data/base64 URL, ensure your KV storage or
    // subsequent API calls can handle it. Consider converting to blob or
    // re-uploading if necessary.
    
    // call to puter worker to store project to kv
    // Example: await puter.kv.set(`project:${projectId}`, payload);
    
    return payload;
  } catch (error) {
    console.error("Failed to create project:", error);
    return null;
  }
};
