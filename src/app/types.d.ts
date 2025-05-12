import type { EditorOptions } from 'tinymce';

export interface IEditorOptions extends EditorOptions {
    readonly plugins: string | string[]
}

