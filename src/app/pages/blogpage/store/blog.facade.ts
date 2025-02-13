import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { BlogState } from "./blog.state";
import { map, Observable } from "rxjs";
import { Blog } from "../models/blog.model";

import * as blogActions from './blog.actions';

@Injectable()
export class BlogFacade {

    private readonly store = inject(Store);

    public readonly blogs$: Observable<Blog[]> = this.store.select(BlogState.getBlogs);

    public readonly blog$ = (id: string) => this.store.select(BlogState.getBlogById(id));

    public loadBlogs() {
        this.store.dispatch(new blogActions.LoadBlogsAction());
    }

    public addBlog(blogCreate: Blog) {
        this.store.dispatch(new blogActions.AddAction(blogCreate));
    }

    public update(blogUpdate: Blog) {
        this.store.dispatch(new blogActions.UpdateAction(blogUpdate));
    }

    public remove(blogRemove: Blog) {
        this.store.dispatch(new blogActions.RemoveAction(blogRemove.id));
    }
}