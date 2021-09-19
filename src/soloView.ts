import {ItemView, WorkspaceLeaf} from 'obsidian';

export default class soloView extends ItemView {
    getViewType(): string {
        return "solo"
    }

    
    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
    }

    getDisplayText(): string {
        return "Solo Tools"
    }

    getIcon(): string {
        return "checkmark"
    }

    async onClose() {
        this._app.$destroy()
      }
}