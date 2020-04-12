import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { TitleComponent } from './shared/title/title.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { appRouting } from './app.routes';
import { ZombiesComponent } from './zombies/zombies.component';
import { ZombiesModalsComponent } from './modals/zombies/zombiesmodals.component';
import { CerebrosModalsComponent } from './modals/cerebros/cerebros.component';
import { CerebrosComponent } from './cerebros/cerebros.component';
import { SettingsService } from './services/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './modals/usuarios/usuarios.component';
import { RegisterComponent } from './register/register.component';
import { SaborComponent } from './graficos/sabor/sabor.component';
import { ChartsModule } from 'ng2-charts';
import { CerebrosUsuarioComponent } from './graficos/cerebros-usuario/cerebros-usuario.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ApartadoComponent } from './apartado/apartado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    ProgressComponent,
    GraphsComponent,
    HeaderComponent,
    SidemenuComponent,
    TitleComponent,
    SettingsComponent,
    ZombiesComponent,
    ZombiesModalsComponent,
    CerebrosComponent,
    CerebrosModalsComponent,
    UsuariosComponent,
    RegisterComponent,
    SaborComponent,
    CerebrosUsuarioComponent,
    GraficasComponent,
    ApartadoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    appRouting,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [SettingsService, ZombiesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
