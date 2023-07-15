import { App, CachedMetadata, TFile } from "obsidian";
import type { TaggedFilesCollection } from "src/types";

function getTaggedFiles(app: App) {
  const metadataCache = app.metadataCache;
  const markdownFiles = app.vault.getMarkdownFiles();
  const simpleList: TaggedFilesCollection = [];
  const weightedTables: TaggedFilesCollection = [];
  const config: TaggedFilesCollection = [];

  for (const markdownFile of markdownFiles) {
    const cachedMetadata = metadataCache.getFileCache(markdownFile);

    if (!cachedMetadata) return;

    if (cachedMetadata.frontmatter?.tags?.includes("solo/list")) {
      simpleList.push(Object.assign({}, markdownFile, cachedMetadata));
    } else if (cachedMetadata.frontmatter?.tags?.includes("solo/weighted")) {
      weightedTables.push(Object.assign({}, markdownFile, cachedMetadata));
    } else if (cachedMetadata.frontmatter?.tags?.includes("solo/config")) {
      config.push(markdownFile);
    }
  }

  return {
    simpleList,
    weightedTables,
    config,
  };
}

export default getTaggedFiles;
