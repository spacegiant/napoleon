import type { CachedMetadata, TFile } from 'obsidian';

type TaggedFilesCollection = Array<TFile & CachedMetadata>;

export type { TaggedFilesCollection };
