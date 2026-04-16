import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddAgentForm } from "./add-agent-form.component";

describe("LoginForm", () => {
  let component: AddAgentForm;
  let fixture: ComponentFixture<AddAgentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAgentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAgentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
