import { inject, Injectable } from "@angular/core";
import { Actions, ofActionDispatched, Select, select, Store } from "@ngxs/store";
import { BlogState } from "./blog.state";
import { map, Observable } from "rxjs";
import { Blog } from "../models/blog.model";

import * as blogActions from './blog.actions';

@Injectable()
export class BlogFacade {

    private readonly store = inject(Store);
    private readonly actions = inject(Actions);

    @Select(BlogState.isLoading)
    public readonly loading$!: Observable<boolean>;

    @Select(BlogState.getBlogs)
    public readonly blogs$!: Observable<Blog[]>;

    public readonly loadSuccess = this.actions.pipe(
        ofActionDispatched(blogActions.LoadBlogsSuccessAction),
        map((action) => action.blogs)
    );

    
}