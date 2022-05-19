import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSkillsComponent } from './member-skills.component';

describe('MemberSkillsComponent', () => {
  let component: MemberSkillsComponent;
  let fixture: ComponentFixture<MemberSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
