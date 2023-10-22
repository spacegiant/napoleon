import type { CachedMetadata, TFile } from 'obsidian';

type TaggedFilesCollection = Array<TFile & CachedMetadata>;

export type { TaggedFilesCollection };

export interface MyPluginSettings {
    mySetting: string;
    mythicOn: boolean;
    tacOn: boolean;
    replacer: boolean;
    replacerSuffix: string;
  }