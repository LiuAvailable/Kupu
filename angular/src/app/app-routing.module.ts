import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './project/components/views/tournament/teams/teams.component';
import { MyTeamComponent } from './project/components/views/tournament/my-team/my-team.component';
import { CalendarComponent } from './project/components/views/tournament/calendar/calendar.component';
import { RankingComponent } from './project/components/views/tournament/ranking/ranking.component';
import { TournamentComponent } from './project/components/views/tournament/tournament/tournament.component';
import { HomeComponent } from './project/components/views/home/home.component';
import { LoginComponent } from './project/components/views/login/login.component';
import { TournamentsComponent } from './project/components/views/tournaments/tournaments.component';
import { AuthGuard } from './project/model/implementations/authGuard';
import { NewTournamentComponent } from './project/components/views/tournament/new-tournament/new-tournament.component';

const routes: Routes = [ 
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '*',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'tournaments', component: TournamentsComponent, canActivate: [AuthGuard]},
  { path: 'tournaments/create', component: NewTournamentComponent},


  { path: 'tournament/teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'tournament/myteam', component: MyTeamComponent, canActivate: [AuthGuard] },
  { path: 'tournament/calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'tournament/ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
