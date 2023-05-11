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
import { TournamentsComponent } from './project/components/views/tournaments/tournaments.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewTournamentComponent } from './project/components/views/tournament/new-tournament/new-tournament.component';

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
    MyTeamComponent,
    TournamentsComponent,
    NewTournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
