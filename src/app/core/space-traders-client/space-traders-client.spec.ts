import { TestBed } from "@angular/core/testing";

import SpaceTradersClient from "./space-traders-client";

describe("SpaceTradersClient", () => {
  let service: SpaceTradersClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceTradersClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
