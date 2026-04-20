// lib/ai.action.ts

import puter from "@heyputer/puter.js";
import { ROOMIFY_RENDER_PROMPT } from "./contasts";

export async function fetchAsDataUrl(url: string): Promise<string> {
  // Fetch the image from the URL
  const response = await fetch(url);

  // Throw an error if the response fails
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`,
    );
  }

  // Convert the response to a blob
  const blob = await response.blob();

  // Create a promise that uses FileReader to convert blob to data URL
  return new Promise((string, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        string(reader.result);
      } else {
        reject(new Error("Failed to convert blob to data URL"));
      }
    };

    reader.onerror = () => {
      reject(new Error("FileReader error occurred while reading blob"));
    };

    reader.readAsDataURL(blob);
  });
}

export const generate3DView = async ({ sourceImage }: Generate3DViewParams) => {
  const dataUrl = sourceImage.startsWith("data:")
    ? sourceImage
    : await fetchAsDataUrl(sourceImage);

  const base64Data = dataUrl.split(",")[1];
  const mimeType = dataUrl.split(";")[0].split(":")[1];

  if (!mimeType || !base64Data) {
    throw new Error("Invalid data URL format");
  }

  const response = await puter.ai.txt2img(ROOMIFY_RENDER_PROMPT, {
    provider: "gemini",
    model: "gemini-2.5-flash-image-preview",
    input_image: base64Data,
    input_image_mime_type: mimeType,
    ratio: { w: 1024, h: 1024 },
  });

  const rawImageUrl = (response as HTMLImageElement).src ?? null;

  if (!rawImageUrl) return { renderedImage: null, renderedPath: undefined };

  const renderedImage = rawImageUrl.startsWith("data:")
    ? rawImageUrl
    : await fetchAsDataUrl(rawImageUrl);

  return { renderedImage, renderedPath: undefined };
};
