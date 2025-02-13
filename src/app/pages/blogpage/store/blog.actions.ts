import { Blog } from "../models/blog.model";
import { blogFeatureKey } from "./blog.state";

export namespace BlogActions {
  export class LoadBlogsAction {
    static readonly type = `[${blogFeatureKey}] Load All`
  }
  
  export class AddAction {
    static readonly type = `[${blogFeatureKey}] Add`
    constructor(public readonly blog: Blog) {}
  }
  
  export class UpdateAction {
    static readonly type = `[${blogFeatureKey}] Update`
    constructor(public readonly blog: Blog) {}
  }
  
  export class RemoveAction {
    static readonly type = `[${blogFeatureKey}] Remove`
    constructor(public readonly id: string) {}
  }
}