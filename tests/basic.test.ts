import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { setup, $fetch, isDev } from "@nuxt/test-utils";

describe("example", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("..", import.meta.url)),
    server: true,
  });

  it("Renders Hello Nuxt", async () => {
    expect(await $fetch("/")).toMatch("Hello Nuxt!");
  });

  if (isDev()) {
    it("[dev] ensure vite client script is added", async () => {
      expect(await $fetch("/")).toMatch('/_nuxt/@vite/client"');
    });
  }
});

// import { dataURItoBlob } from '../composables/globalFunction';

// describe('dataURItoBlob', () => {
//   it('should return a Blob object when a valid dataURI is provided', () => {
//     const dataURI = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!" in base64
//     const blob = dataURItoBlob(dataURI);
//     expect(blob).toBeInstanceOf(Blob);
//     expect(blob.size).toBe(13);
//     expect(blob.type).toBe('text/plain');
//   });

//   it('should return undefined when no dataURI is provided', () => {
//     const blob = dataURItoBlob();
//     expect(blob).toBeUndefined();
//   });

//   it('should return undefined when an empty string is provided', () => {
//     const blob = dataURItoBlob('');
//     expect(blob).toBeUndefined();
//   });
// });
