import { createPropertySelectors, createSelector } from "@ngxs/store";
import { BlogState, BlogStateModel } from "./blog.state";
import { Blog } from "../models/blog.model";

export class BlogSelectors {
    static getSlices = createPropertySelectors<BlogStateModel>(BlogState);
    
    static blogs = createSelector(
        [BlogSelectors.getSlices.data],
        (state) => state.blogs
    );

    static getBlogById(id: string) {
        return createSelector(
            [BlogSelectors.getSlices.data],
            (state) => state.blogs.find((blog: Blog) => blog.id === id)
        );
    }
}