# Napoleon (Solo Tools) for Obsidian.md

WIP!!! 

## Simple random item

Paste a random line from a markdown file at your cursor.

### Creating a list
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

## Inline dice roller

Implements https://greenimp.github.io/rpg-dice-roller/

It's easy to use. 
1. First, you need to toggle Replacer in Solo settings. (App may need Force Reload/restart)
2. Type dice notation and press Tab.


## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

### Development links
- https://github.com/obsidianmd/obsidian-api
