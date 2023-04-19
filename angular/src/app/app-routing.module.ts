import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './project/components/views/tournament/teams/teams.component';
import { MyTeamComponent } from './project/components/views/tournament/my-team/my-team.component';
import { CalendarComponent } from './project/components/views/tournament/calendar/calendar.component';
import { RankingComponent } from './project/components/views/tournament/ranking/ranking.component';
import { TournamentComponent } from './project/components/views/tournament/tournament/tournament.component';
import { HomeComponent } from './project/components/views/home/home.component';
import { LoginComponent } from './project/components/views/login/login.component';

const routes: Routes = [
  { path: 'tournament/teams', component: TeamsComponent },
  { path: 'tournament/myteam', component: MyTeamComponent },
  { path: 'tournament/calendar', component: CalendarComponent },
  { path: 'tournament/ranking', component: RankingComponent },
  { path: 'tournament', component: TournamentComponent },

  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
