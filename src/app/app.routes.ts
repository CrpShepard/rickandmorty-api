import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CharacterComponent } from './pages/character/character.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'character/:id', component: CharacterComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', redirectTo: '/home' }
];
