import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './project/components/views/login/login.component';
import { TourneyNavBarComponent } from './project/components/reusables/tourney-nav-bar/tourney-nav-bar.component';
import { UserNavBarComponent } from './project/components/reusables/user-nav-bar/user-nav-bar.component';
import { HomeComponent } from './project/components/views/home/home.component';
import { RankingComponent } from './project/components/views/tournament/ranking/ranking.component';
import { CalendarComponent } from './project/components/views/tournament/calendar/calendar.component';
import { TeamsComponent } from './project/components/views/tournament/teams/teams.component';
import { TournamentComponent } from './project/components/views/tournament/tournament/tournament.component';
import { MyTeamComponent } from './project/components/views/tournament/my-team/my-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TourneyNavBarComponent,
    UserNavBarComponent,
    HomeComponent,
    RankingComponent,
    CalendarComponent,
    TeamsComponent,
    TournamentComponent,
    MyTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
