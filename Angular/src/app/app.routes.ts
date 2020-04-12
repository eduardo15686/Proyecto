import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ZombiesComponent } from './zombies/zombies.component';
import { CerebrosComponent } from './cerebros/cerebros.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ApartadoComponent } from './apartado/apartado.component';


const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'zombies', component: ZombiesComponent },
    { path: 'cerebros', component: CerebrosComponent },
    { path: 'graficas', component: GraficasComponent },
    { path: 'apartado', component: ApartadoComponent },
    { path: '**', component: NopagefoundComponent}
];



export const appRouting = RouterModule.forRoot(routes, {useHash: true});
