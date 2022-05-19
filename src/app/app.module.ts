import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberComponent } from './components/member/member.component';
import { MemberSingleComponent } from './components/member-single/member-single.component';
import { Error404Component } from './components/error404/error404.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { Routes, RouterModule } from '@angular/router';
import { MemberlistComponent } from './components/memberlist/memberlist.component';
import { MemberSkillsComponent } from './components/member-skills/member-skills.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NameCasePipe } from './pipes/name-case.pipe';

// definition des routes
const appRoutes : Routes = [
  { path: 'membres', component: MemberlistComponent },
  { path: 'membres/:id', component: MemberSingleComponent},
  { path: '', redirectTo: 'membres' , pathMatch: 'full'},
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberSingleComponent,
    Error404Component,
    SearchBarComponent,
    LoadingComponent,
    MemberlistComponent,
    MemberSkillsComponent,
    NameCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }