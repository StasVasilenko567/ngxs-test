import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { BlogState } from "./store/blog.state";
import { BlogpageRoutesModule } from "./blogpage-routes.module";
import { BlogFacade } from "./store/blog.facade";
import { BlogsApiService } from "./services/blogs-api.service";

@NgModule({
    imports: [
        NgxsModule.forFeature([BlogState]),
        BlogpageRoutesModule
    ],
    providers: [
        BlogFacade,
        BlogsApiService
    ]
})
export class BlogpageModule { }