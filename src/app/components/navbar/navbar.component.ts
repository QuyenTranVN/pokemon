import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "../../models/user";

@Component({
	selector: "navbar",
	template: `
		<nav>
			<h4>Pokemon v{{ version }}</h4>
			<button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
				I am {{ user?.name }}, and I like {{ user?.likes }} and dislike
				{{ user?.dislikes }} pokemons / Log Out
			</button>
			<ng-template #notLoggedIn>
				<button (click)="logIn()">Log In</button>
			</ng-template>
		</nav>
	`,
	styles: [
		`
			nav {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1rem;
				background-color: hotpink;
				color: white;
			}

			h4 {
				margin: 0;
				font-size: 2rem;
			}

			button {
				background: transparent;
				outline: none;
				border: 1px solid;
				border-radius: 0.25rem;
				padding: 0.5rem 1rem;
				color: white;
				cursor: pointer;
				font-size: 1rem;
				font-family: "Source Sans Pro";
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	version = VERSION.full;
	user: User = { name: "Quyen", likes: 0, dislikes: 0 };
	isLoggedIn = false;
	constructor(private userService: UserService, private router: Router) {}

	ngOnInit() {
		this.isLoggedIn = JSON.parse(localStorage.getItem("inforUser"));
	}
	logIn() {
		this.userService.isLogin(true);
		localStorage.setItem("inforUser", JSON.stringify(true));
		this.router.navigate(["/pokemons"]);
		this.isLoggedIn = true;
	}

	logOut() {
		this.userService.isLogin(false);
		localStorage.setItem("inforUser", JSON.stringify(false));
		this.router.navigate(["/not-auth"]);
		this.isLoggedIn = false;
	}
}
