import type { App } from 'obsidian';
import type { TaggedFilesCollection } from 'src/types';

interface TaggedFiles {
  simpleList: TaggedFilesCollection;
  weightedTables: TaggedFilesCollection;
  config: TaggedFilesCollection;
}

function getTaggedFiles(app: App): TaggedFiles | undefined {
  const metadataCache = app.metadataCache;
  const markdownFiles = app.vault.getMarkdownFiles();
  const simpleList: TaggedFilesCollection = [];
  const weightedTables: TaggedFilesCollection = [];
  const config: TaggedFilesCollection = [];

  for (const markdownFile of markdownFiles) {
    const cachedMetadata = metadataCache.getFileCache(markdownFile);
    // if (cachedMetadata?.frontmatter?.tags == null) return;

    const tags = cachedMetadata?.frontmatter?.tags;

    if (tags?.includes('solo/list')) {
      simpleList.push(Object.assign({}, markdownFile, cachedMetadata));
    } else if (tags?.includes('solo/weighted')) {
      weightedTables.push(Object.assign({}, markdownFile, cachedMetadata));
    } else if (tags?.includes('solo/config')) {
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
