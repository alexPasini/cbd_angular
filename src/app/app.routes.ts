import { Routes } from '@angular/router';
import path from 'path';
import { MainPageComponent } from './main-page/main-page.component';


export const routes: Routes = [
    {path: "",pathMatch:"full",redirectTo:"pagina-principal"},
    {path:"pagina-principal",component:MainPageComponent}


];
