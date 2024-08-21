import type { MyPluginSettings } from "./types";

export const APP = {
  appName: 'Napoleon'
};

export const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: 'default',
    mythicOn: true,
    tacOn: false,
    replacer: false,
    replacerSuffix: '//',
    randomTablesActive: true,
    randomTableTag: 'random-table'
  };