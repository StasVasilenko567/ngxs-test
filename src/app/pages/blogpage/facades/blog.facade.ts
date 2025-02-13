import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { BlogState } from "../store/blog.state";
import { map, Observable } from "rxjs";
import { Blog } from "../models/blog.model";
import { BlogActions } from "../store/blog.actions";

@Injectable()
export class BlogFacade {

    private readonly store = inject(Store);

    public readonly blogs$: Observable<Blog[]> = this.store.select(BlogState.getBlogs);

    public getBlogById(id: string) : Observable<Blog> {
        return this.store.select(BlogState.getBlogById(id))
    }

    public loadBlogs() {
        this.store.dispatch(new BlogActions.LoadBlogsAction());
    }

    public addBlog(blogCreate: Blog) {
        this.store.dispatch(new BlogActions.AddAction(blogCreate));
    }

    public update(blogUpdate: Blog) {
        this.store.dispatch(new BlogActions.UpdateAction(blogUpdate));
    }

    public remove(blogRemove: Blog) {
        this.store.dispatch(new BlogActions.RemoveAction(blogRemove.id));
    }
}