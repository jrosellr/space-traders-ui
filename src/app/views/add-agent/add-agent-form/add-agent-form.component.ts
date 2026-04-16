import { Component, output, signal } from "@angular/core";
import { Field, form, required } from "@angular/forms/signals";
import { AgentCredentials } from "../../../shared/agents/models/agent-credentials";

interface LoginModel {
  accountToken: string;
}

@Component({
  selector: "app-add-account-form",
  imports: [Field],
  templateUrl: "./add-agent-form.component.html",
  styleUrl: "./add-agent-form.component.scss",
})
export class AddAgentForm {
  public readonly credentials = output<AgentCredentials>();

  private loginModel = signal<LoginModel>({
    accountToken: "",
  });

  protected readonly loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.accountToken);
  });

  protected onSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    if (this.loginForm().valid()) {
      const userCredentials = this.loginModel();
      this.credentials.emit({
        token: userCredentials.accountToken,
      });
    }
  }
}
