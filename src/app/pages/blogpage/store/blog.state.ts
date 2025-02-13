import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit, Selector, createSelector } from '@ngxs/store';
import { Blog } from '../models/blog.model';
import { BlogsApiService } from '../services/blogs-api.service';
import { LoadBlogsAction } from './blog.actions';
import * as Actions from './blog.actions';
import { catchError, map } from 'rxjs';

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
  name: 'post',
  defaults
})
@Injectable()
export class BlogState implements NgxsOnInit {
  private readonly apiService = inject(BlogsApiService);

  public ngxsOnInit(ctx: StateContext<BlogStateModel>): void {
    ctx.dispatch(new LoadBlogsAction());
  }

  @Selector()
  static isLoading(state: BlogStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getBlogs(state: BlogStateModel): Blog[] {
    return state.data.blogs;
  }

  static getBlogById(id: string) {
    return createSelector(
      [BlogState], 
      (state) => state.data.blogs.find((blog: Blog) => blog.id === id)
    );
  }

  @Action(Actions.LoadBlogsAction)
  public loadBlogs(ctx: StateContext<BlogStateModel>) {
    return this.apiService.getAll().pipe(
      map((blogs) => {
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

  @Action(Actions.AddAction)
  public add(ctx: StateContext<BlogStateModel>, action: Actions.AddAction) {
    return this.apiService.add(action.post).pipe(
      map((blog) => {
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

  @Action(Actions.UpdateAction)
  public update(ctx: StateContext<BlogStateModel>, action: Actions.UpdateAction) {
    return this.apiService.update(action.blog).pipe(
      map((blog) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          data: { blogs: state.data.blogs.map(blog => blog.id === action.blog.id ? action.blog : blog) }
        });
      }),
    )
  }

  @Action(Actions.RemoveAction)
  public remove(ctx: StateContext<BlogStateModel>, action: Actions.RemoveAction) {
    return this.apiService.remove(action.id).pipe(
      map((blog) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          data: { blogs: state.data.blogs.filter(blog => blog.id !== action.id) }
        });
      }),
    );
  }
}
