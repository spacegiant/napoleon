// This is just snippets kept for learning or reference

const doc = app.workspace.activeLeaf.view.editor.getDoc()
doc.replaceSelection(template)
const currentLine = doc.getCursor().line
const newLine = currentLine - 2
doc.setCursor({ line: newLine, ch: 0 })





// -------------------------------------- //




// set the tag you want to match
const tag = "#books"

// get all the files and run them through Array.reduce() method

const count = app.vault.getMarkdownFiles().reduce((acc, file) => {

    // get the CachedMetadata
    const cache = app.metadataCache.getFileCache(file)
    if (cache.tags) {

        // get all the tags. this is easier than iterating of cache.tags
        const tags = tp.obsidian.getAllTags(cache)
        if (tags.includes(tag)) {

            // if the tag we specified exists we add to the count
            acc += 1
        }
    }
    return acc
}, 0)
// return the count
tR += count