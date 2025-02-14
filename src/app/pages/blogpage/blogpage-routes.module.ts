import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { BlogDetailComponent } from "./components/blog-detail/blog-detail.component";
import { stateExistGuard } from "./guards/state-exist.guard";

const blogpageRoutes: Routes = [
    {
        path: '',
        component: BlogListComponent
    },
    {
        path: 'blog/:id',
        component: BlogDetailComponent,
        canActivate: [stateExistGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(blogpageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogpageRoutesModule { }