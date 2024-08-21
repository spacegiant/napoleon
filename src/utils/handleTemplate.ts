import type { App } from 'obsidian';

type Props = (
  app: App,
  file: any,
  cb: (value: string) => void
) => Promise<void>;

const handleTemplate: Props = async (app, file, cb): Promise<void> => {
  // Get content

  const offset = file.frontmatterPosition.end.offset;
  const path = app.metadataCache.getFirstLinkpathDest(file.name, file.path);

  if (path == null) return;

  await app.vault.cachedRead(path).then((value) => {
    const sourceText = value.substring(offset).trim();

    console.log(sourceText);
  });

  // Parse content

  // Run various random tables

  // repopulate content with results from random tables

  // run callback with new text
  //   console.log(app, file, cb);
};

export default handleTemplate;
