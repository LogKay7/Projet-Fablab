import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-skills',
  templateUrl: './member-skills.component.html',
  styleUrls: ['./member-skills.component.scss']
})
export class MemberSkillsComponent implements OnInit {

  @Input() skillId : Number;
  @Input() skillName : string;
  @Input() skillSlug : string;
  @Input() isDisplayed : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
