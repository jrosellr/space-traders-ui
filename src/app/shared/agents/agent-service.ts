import { inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { SpaceTradersClient } from "../../core/space-traders-client/space-traders-client";
import { Subject, switchMap, tap } from "rxjs";
import { AgentCredentials } from "./models/agent-credentials";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { emptyResource, Resource } from "../../core/resources/resource";

export interface Agent {
  symbol: string;
}

@Injectable({
  providedIn: "root",
})
export class AgentService {
  private readonly client = inject(SpaceTradersClient);

  private readonly addAgentNotifier = new Subject<AgentCredentials>();
  private readonly agentStore: WritableSignal<Resource<Agent>> = signal(emptyResource());
  public readonly agent: Signal<Resource<Agent>> = this.agentStore.asReadonly();

  constructor() {
    const addAgent$ = this.addAgentNotifier.pipe(
      tap(() => {
        this.agentStore.set({
          status: "loading",
        });
      }),
      switchMap((credentials) => {
        return this.client.fetchAgent(credentials.token);
      }),
      takeUntilDestroyed(),
    );

    addAgent$.subscribe((response) => {
      if (response === undefined || response.status === "failure") {
        this.agentStore.set({
          status: "error",
        });
        return;
      }

      this.agentStore.set({
        status: "valid",
        value: response.data,
      });
    });
  }

  public addAgent(credentials: AgentCredentials): void {
    this.addAgentNotifier.next(credentials);
  }
}
