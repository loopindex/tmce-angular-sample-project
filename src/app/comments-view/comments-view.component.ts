import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ILancePlugin, ILanceUI, Nullable } from '../types';

@Component({
	selector: 'comments-view',
	imports: [],
	templateUrl: './comments-view.component.html',
	styleUrl: './comments-view.component.css',
	encapsulation: ViewEncapsulation.None
})
export class CommentsViewComponent {
	private _ui: Nullable<ILanceUI> = null;
	constructor(private _ref: ElementRef) {

	}
	@Input()
	public set lance(l: ILancePlugin | null) {
		console.log("lance new value:", l, l?.App);
		if (l && !this._ui) {
			this._createUI(l)
			.then(ui => {
				this._ui = ui;
				if (!ui) {
					console.error(`Failed to create lance ui`);
				}
			})
		}
	}

	private async _createUI(lance: ILancePlugin): Promise<Nullable<ILanceUI>> {
		const el = this._ref.nativeElement.querySelector(".comments-container")

		const u = lance.App.createAnnotationsUI({ type: "aligned" });
		if (!u) {
			return null;
		}
		const success = await u.init({
			container: el,
			owner: lance.getAnnotations(),
			generateUI: true
		});
		return success ? u : null;
	}
}
