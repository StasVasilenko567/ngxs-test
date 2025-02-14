import { inject, Injectable, Signal } from "@angular/core";
import { Store } from "@ngxs/store";
import { map, Observable } from "rxjs";
import { Blog } from "../models/blog.model";
import { BlogActions } from "../store/blog.actions";
import { BlogSelectors } from "../store/blog.selectors";

@Injectable()
export class BlogFacade {

    private readonly store = inject(Store);

    public readonly blogs$: Observable<Blog[]> = this.store.select(BlogSelectors.blogs);

    public getBlogById(id: string) : Signal<Blog | undefined> {
        return this.store.selectSignal(BlogSelectors.getBlogById(id));
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