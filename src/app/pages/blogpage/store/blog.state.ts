import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { Blog } from '../models/blog.model';
import { BlogsApiService } from '../services/blogs-api.service';
import { BlogActions, blogFeatureKey } from './blog.actions';
import { tap } from 'rxjs';

// export namespace BlogStore {
  export interface BlogStateModel {
    data: {
      blogs: Blog[];
    };
    loading: boolean;
    isError: boolean;
  }
  
  const defaults: BlogStateModel = {
    data : {
      blogs: [],
    },
    loading: false,
    isError: false,
  };
  
  @State<BlogStateModel>({
    name: blogFeatureKey,
    defaults
  })
  @Injectable()
  export class BlogState {
    private readonly apiService = inject(BlogsApiService);
  
    // @Selector()
    // static isLoading(state: BlogStateModel): boolean {
    //   return state.loading;
    // }
  
    // @Selector()
    // static getBlogs(state: BlogStateModel): Blog[] {
    //   return state.data.blogs;
    // }
  
    // static getBlogById(id: string) {
    //   return createSelector(
    //     [BlogState], 
    //     (state) => state.data.blogs.find((blog: Blog) => blog.id === id)
    //   );
    // }
  
    @Action(BlogActions.LoadBlogsAction)
    public loadBlogs(ctx: StateContext<BlogStateModel>) {
      return this.apiService.getAll().pipe(
        tap((blogs) => {
          const state = ctx.getState();
  
          ctx.setState({
            ...state,
            data: {
              blogs: [...blogs],
            }
          })
        }),
      );
    }
  
    @Action(BlogActions.AddAction)
    public add(ctx: StateContext<BlogStateModel>, action: BlogActions.AddAction) {
      return this.apiService.add(action.blog).pipe(
        tap((blog) => {
          const state = ctx.getState();
  
          ctx.setState({
            ...state,
            data: {
              blogs: [...state.data.blogs, blog],
            }
          })
        })
      );
    }
  
    @Action(BlogActions.UpdateAction)
    public update(ctx: StateContext<BlogStateModel>, action: BlogActions.UpdateAction) {
      return this.apiService.update(action.blog).pipe(
        tap((blog) => {
          const state = ctx.getState();
  
          ctx.setState({
            ...state,
            data: { blogs: state.data.blogs.map(blog => blog.id === action.blog.id ? action.blog : blog) }
          });
        }),
      )
    }
  
    @Action(BlogActions.RemoveAction)
    public remove(ctx: StateContext<BlogStateModel>, action: BlogActions.RemoveAction) {
      return this.apiService.remove(action.id).pipe(
        tap((blog) => {
          const state = ctx.getState();
  
          ctx.setState({
            ...state,
            data: { blogs: state.data.blogs.filter(blog => blog.id !== action.id) }
          });
        }),
      );
    }
  }  
// }