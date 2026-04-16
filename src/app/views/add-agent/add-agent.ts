import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { AddAgentForm } from "./add-agent-form/add-agent-form.component";
import { AgentService } from "../../shared/agents/agent-service";
import { AgentCredentials } from "../../shared/agents/models/agent-credentials";

@Component({
  selector: "app-login",
  imports: [AddAgentForm],
  templateUrl: "./add-agent.html",
  styleUrl: "./add-agent.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAgent {
  private readonly agentService = inject(AgentService);

  protected readonly agent = computed(() => {
    return this.agentService.agent();
  });

  protected readonly agentSymbol = computed(() => {
    const agent = this.agentService.agent();
    if (agent.status === "valid") {
      return agent.value.symbol;
    }

    return undefined;
  });

  protected readonly error = computed(() => {
    const agent = this.agentService.agent();
    if (agent.status === "error") {
      return "An error occurred.";
    }

    return undefined;
  });

  protected addAgent(credentials: AgentCredentials): void {
    this.agentService.addAgent(credentials);
  }
}
