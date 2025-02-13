import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/blogpage/blogpage.module').then(m => m.BlogpageModule)
    }
];
