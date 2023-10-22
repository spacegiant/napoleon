# Napoleon (Solo Tools) for Obsidian.md

WIP!!!

## Simple random item

Paste a random line from a markdown file at your cursor.

### Creating a Simple List

The markdown file needs to be tagged `solo/list`. This needs to go in front matter so it is not considered part of the random list.

Create a note titles `Animals` like this:

```
---
tags: solo/list
---
Aardvark
Bear
Chinchilla
Donkey
Eagle
```

The script searches for any markdown files tagged with `solo/list` and then registers a command to output a random item from the list. The command for the above example would run `CMD + P > Solo: Animals`. The Command is named using the label.

Future plans: other list types such as weighted lists (in csv format probably), lists that have two tables linked (e.g. mythic action/subject).

**Note**: You need to reload app to get the list to register as a Command.

## Weighted random item

Use this for lists that pick an option on say a 25-30 on a d100 roll. In this case it's weight is 6 (25,26,27,28,29,30).

Example:

```
---
tags:
- solo/weighted
---
8 | Action
6 | Mystery
4 | Social
1 | Tension
1 | Personal
```

## Inline dice roller

Implements https://greenimp.github.io/rpg-dice-roller/

It's easy to use.

1. First, you need to toggle Replacer in Solo settings. (App may need Force Reload/restart)
2. Type dice notation and press Tab (or use dice icon in sidebar or TAB command)

Note: on toolbar you can assign the TAB command to the toolbar.
Limitations: Currently does not handle spaces in dice notation e.g use {2d6,2d10}

**Note**: You can add the _Dice command_ to the toolbar for easier access on Mobile.

## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/napoleon/`.

### Development links

- https://github.com/obsidianmd/obsidian-api

Make sure `esbuild.config.mjs` is updated to output to `/build` folder.

### Automatically build and copy files to vault

`build.sh` or `build.sh prod`:

```sh
#!/bin/bash

ARG=$1

npm run build

if [[ $ARG = 'prod' ]];
then
    cp ./build/* ~/Obsidian\ Vaults/Solo/SOLO/.obsidian/plugins/napoleon
    echo "PROD BUILD COMPLETE"
else
    cp ./build/* ~/Library/CloudStorage/Dropbox/Obsidian\ Files/Plugin\ Dev/Plugin\ Dev/.obsidian/plugins/napoleon
    echo "DEV BUILD COMPLETE"
fi
```
