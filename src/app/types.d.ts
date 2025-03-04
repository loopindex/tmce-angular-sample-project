import type { EditorOptions } from 'tinymce';

export type Nullable<T extends {}> = T | null;

export interface IEditorOptions extends EditorOptions {
    readonly plugins: string | string[]
}

export interface ILanceUser {
    readonly id: string;
    readonly name: string;
    readonly picture?: string;
}

export interface IAnnotationsManager {
    addUsers(users: ILanceUser[]);
    setUserId(id: string): void;
}
export interface  ILanceUIOptions {
    readonly container: string | HTMLElement;
    readonly owner: IAnnotationsManager;
    readonly generateUI: boolean;
}

export interface ILanceUI {
    init(options: Partial<ILanceUIOptions>): Promise<boolean>;
}


export interface ILanceGlobals {
	createAnnotationsUI(options: { type: "simple" | "aligned"}): ILanceUI;
}



export interface ILancePlugin {
    readonly App: ILanceGlobals;
    getAnnotations(): IAnnotationsManager;
}

export interface ILanceInitEvent {
    lance: ILancePlugin;
}