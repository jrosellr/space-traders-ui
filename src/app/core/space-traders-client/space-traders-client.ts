import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, tap } from "rxjs";
import { fromRaw, handleError, RawResponse, Response } from "./response";
import { AgentResponse } from "./models/get-agent-details";

@Injectable({
  providedIn: "root",
})
export class SpaceTradersClient {
  private readonly http = inject(HttpClient);
  private readonly credentialStore: Map<string, string> = new Map<string, string>();

  public fetchAgent(agentToken: string): Observable<Response<AgentResponse> | undefined> {
    const fetchAgent$ = this.http.get<RawResponse<AgentResponse>>(
      "https://api.spacetraders.io/v2/my/agent",
      {
        headers: new HttpHeaders().set("Authorization", `Bearer ${agentToken}`),
      },
    );

    return fetchAgent$.pipe(
      map(fromRaw),
      tap((response) => {
        if (response.status === "success") {
          this.credentialStore.set(response.data.symbol, agentToken);
        }
      }),
      catchError(handleError<AgentResponse>),
    );
  }
}
