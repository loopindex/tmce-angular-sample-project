import { Component, NgZone } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CommentsViewComponent } from "./comments-view/comments-view.component"
import type { Editor } from 'tinymce';
import type {Nullable} from "loopindex-types/common";
import type { ILancePlugin, ILanceUser, ILanceInitEvent } from "loopindex-types/lance";
import type { IEditorOptions } from './types';

const initialUsers: ILanceUser[] = [
	//1: { name: "Auberthis", avatar: "avatars/syd.png" },
	{ id: "18", name: "Syd the longer name", picture: "/avatars/syd.png", type: "", metaData: {} },
	{ id: "15", name: "David Frenkiel", picture: "/avatars/david.png", type: "", metaData: {} },
	{ id: "21", name: "Mary Bus", picture: "/avatars/mary.png", type: "", metaData: {} },
	// { id: "JR", name: "Jules Rocheteau", picture: "avatars/syd.png" }
];


@Component({
	selector: 'app-root',
	standalone: true,
	imports: [EditorComponent, CommentsViewComponent],
	providers: [
		{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
	],
	styleUrl: "./app.component.css",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	private _lance: ILancePlugin | null = null;

	constructor(private zone: NgZone) {

	}

	public get lance(): ILancePlugin| null {
		return this._lance;
	}
	public get editorOptions(): Partial<IEditorOptions> {
		const self = this;
		return {
			external_plugins: {
				flite: "/flite/plugin.min.js",
				lance: "/lance/plugin.min.js"
			},
			toolbar: 'code | styleselect | bold italic | alignleft aligncenter alignright | spellcheckdialog | flite | lance | fullscreen',
			plugins: 'lists link image table code help wordcount',
			flite: {
				user: { id: "10", name: "dfl" },
				isTracking: false
			},
			setup: function(editor: Editor) {
				editor.on("flite:init", function(evt) {
					console.log("flite init", evt);
				})
				editor.on("lance::init", function(evt: ILanceInitEvent) {
					console.log("lance init", evt);
					self.lance = evt.lance;
					// self._lance = evt.lance;
				})
			},
			base_url: '/tinymce', // Root for resources
			suffix: '.min'        // Suffix to use when loading resources
		};
	}

	private set lance(l: Nullable<ILancePlugin>) {
		if (!l || l === this._lance) {
			return;
		}
		const ann = l.getAnnotations();
		ann.addUsers(initialUsers);
		ann.setUserId(initialUsers[0].id);
		this.zone.run(() => this._lance = l);

	}
}