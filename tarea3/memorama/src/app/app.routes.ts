import { Routes } from '@angular/router';
import { MemeComponent } from './components/pages/meme/meme.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: MemeComponent },
    { path: '**', component: NotFoundComponent },
];
