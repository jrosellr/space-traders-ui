import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "./shared/ui/header/header";
import { Footer } from "./shared/ui/footer/footer";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Header, Footer],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal("space-traders-ui");
}
