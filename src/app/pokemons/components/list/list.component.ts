import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Pokemon } from "src/app/models/pokemon";
import { BackendService } from "src/app/services/backend.service";
import type { PaginatorState } from "../../../components/paginator/paginator.component";

@Component({
	selector: "pokemon-list",
	template: `
		<paginator
			[currentPage]="currentPage"
			[rowsPerPageOptions]="[10, 20, 40, 80]"
			[rows]="rows"
			[totalRecords]="100"
			(onPageChange)="onPageChanged($event)"
		></paginator>
		<input
			type="text"
			class="w-2/4 p-2 rounded border border-gray-600"
			placeholder="Filter by pokemon name..."
			[formControl]="query"
		/>
		<data-table
			*ngIf="listPokemon"
			[isLoading]="isLoading"
			[data]="listPokemon"
		></data-table>
	`,
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
	query = new FormControl("");
	isLoading = false;
	listPokemon: Pokemon[] = [];
	currentPage = 1;
	rows = 20;
	constructor(private backendService: BackendService) {}

	ngOnInit() {
		this.getPokemons();
	}
	onPageChanged(paginatorState: PaginatorState) {
		this.currentPage = paginatorState.page;
		this.rows = paginatorState.rows;
		this.getPokemons();
		console.log(paginatorState);
	}
	getPokemons() {
		this.isLoading = true;
		this.backendService
			.getPokemons(this.rows, this.currentPage - 1)
			.subscribe((data) => {
				this.listPokemon = data.results;
				this.isLoading = false;
			});
	}
}
