import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { LogoutComponent } from './home/logout/logout.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { SingUpComponent } from './home/sing-up/sing-up.component';
import { AcountComponent } from './home/acount/acount.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { UsuarioComponent } from './lista-usuario/usuario/usuario.component';
import { UsuarioNuevoComponent } from './lista-usuario/usuario-nuevo/usuario-nuevo.component';
import { UsuarioEditarComponent } from './lista-usuario/usuario-editar/usuario-editar.component';
import { ListaVehiculoComponent } from './lista-vehiculo/lista-vehiculo.component';
import { VehiculoComponent } from './lista-vehiculo/vehiculo/vehiculo.component';
import { VehiculoNuevoComponent } from './lista-vehiculo/vehiculo-nuevo/vehiculo-nuevo.component';
import { VehiculoEditarComponent } from './lista-vehiculo/vehiculo-editar/vehiculo-editar.component';
import { ListaPasajeComponent } from './lista-pasaje/lista-pasaje.component';
import { PasajeComponent } from './lista-pasaje/pasaje/pasaje.component';
import { PasajeNuevoComponent } from './lista-pasaje/pasaje-nuevo/pasaje-nuevo.component';
import { PasajeEditarComponent } from './lista-pasaje/pasaje-editar/pasaje-editar.component';
import { ListaViajeComponent } from './lista-viaje/lista-viaje.component';
import { ViajeComponent } from './lista-viaje/viaje/viaje.component';
import { ViajeNuevoComponent } from './lista-viaje/viaje-nuevo/viaje-nuevo.component';
import { ViajeEditarComponent } from './lista-viaje/viaje-editar/viaje-editar.component';
import { ListaRutaComponent } from './lista-ruta/lista-ruta.component';
import { RutaComponent } from './lista-ruta/ruta/ruta.component';
import { RutaNuevoComponent } from './lista-ruta/ruta-nuevo/ruta-nuevo.component';
import { RutaEditarComponent } from './lista-ruta/ruta-editar/ruta-editar.component';
import { ListaCiudadComponent } from './lista-ciudad/lista-ciudad.component';
import { CiudadComponent } from './lista-ciudad/ciudad/ciudad.component';
import { CiudadNuevoComponent } from './lista-ciudad/ciudad-nuevo/ciudad-nuevo.component';
import { CiudadEditarComponent } from './lista-ciudad/ciudad-editar/ciudad-editar.component';
import { ListaProvinciaComponent } from './lista-provincia/lista-provincia.component';
import { ProvinciaComponent } from './lista-provincia/provincia/provincia.component';
import { ProvinciaNuevoComponent } from './lista-provincia/provincia-nuevo/provincia-nuevo.component';
import { ProvinciaEditarComponent } from './lista-provincia/provincia-editar/provincia-editar.component';
import { ListaValoracionComponent } from './lista-valoracion/lista-valoracion.component';
import { ValoracionComponent } from './lista-valoracion/valoracion/valoracion.component';
import { ValoracionNuevoComponent } from './lista-valoracion/valoracion-nuevo/valoracion-nuevo.component';

import { StorageService } from './service/storage.service';
import { AuthenticationService } from "./service/authentication.service";
import { UserService } from './service/user.service';
import { VehicleService } from './service/vehicle.service';
import { MockService } from "./service/mock.service.";
import { JwtModule } from '@auth0/angular-jwt';
import { ListaChoferComponent } from './lista-chofer/lista-chofer.component';
import { ChoferComponent } from './lista-chofer/chofer/chofer.component';
import { ChoferEditarComponent } from './lista-chofer/chofer-editar/chofer-editar.component';
import { ChoferNuevoComponent } from './lista-chofer/chofer-nuevo/chofer-nuevo.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'SignUp', component: SingUpComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Logout', component: LogoutComponent },
  { path: 'MyAcount', component: AcountComponent },
  { path: 'Usuarios', component: ListaUsuarioComponent },
  { path: 'Viajes', component: ListaViajeComponent },
  { path: 'Vehiculos', component: ListaVehiculoComponent },
  { path: 'Choferes', component: ListaChoferComponent }
]

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NavBarComponent,
    SingUpComponent,
    AcountComponent,
    ListaUsuarioComponent,
    UsuarioComponent,
    UsuarioNuevoComponent,
    UsuarioEditarComponent,
    ListaVehiculoComponent,
    VehiculoComponent,
    VehiculoNuevoComponent,
    VehiculoEditarComponent,
    ListaPasajeComponent,
    PasajeComponent,
    PasajeNuevoComponent,
    PasajeEditarComponent,
    ListaViajeComponent,
    ViajeComponent,
    ViajeNuevoComponent,
    ViajeEditarComponent,
    ListaRutaComponent,
    RutaComponent,
    RutaNuevoComponent,
    RutaEditarComponent,
    ListaCiudadComponent,
    CiudadComponent,
    CiudadNuevoComponent,
    CiudadEditarComponent,
    ListaProvinciaComponent,
    ProvinciaComponent,
    ProvinciaNuevoComponent,
    ProvinciaEditarComponent,
    ListaValoracionComponent,
    ValoracionComponent,
    ValoracionNuevoComponent,
    ListaChoferComponent,
    ChoferComponent,
    ChoferEditarComponent,
    ChoferNuevoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: []
      }
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    StorageService,
    AuthenticationService,
    UserService,
    VehicleService,
    MockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
