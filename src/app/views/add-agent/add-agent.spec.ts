import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddAgent } from "./add-agent";

describe("Login", () => {
  let component: AddAgent;
  let fixture: ComponentFixture<AddAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAgent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAgent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
