import { Blog } from "../models/blog.model";

export const blogFeatureKey = "Blog";

export class LoadBlogsAction {
  static readonly type = `[${blogFeatureKey}] Load All`
}

export class LoadBlogsSuccessAction {
  static readonly type = `[${blogFeatureKey}] Load All Success`
  constructor(public readonly blogs: Blog[]) {}
}

export class LoadBlogsFailureAction {
  static readonly type = `[${blogFeatureKey}] Load All Failure`
  constructor(public readonly error: unknown) {}
}

export class LoadByIdAction {
  static readonly type = `[${blogFeatureKey}] Load By Id`
  constructor(public readonly id: string) {}
}

export class LoadByIdSuccessAction {
  static readonly type = `[${blogFeatureKey}] Load By Id Success`
  constructor(public readonly blog: Blog) {}
}

export class LoadByIdFailureAction {
  static readonly type = `[${blogFeatureKey}] Load By Id Failure`
  constructor(public readonly error: unknown) {}
}

export class AddAction {
  static readonly type = `[${blogFeatureKey}] Add`
  constructor(public readonly post: Blog) {}
}

export class AddSuccessAction {
  static readonly type = `[${blogFeatureKey}] Add Success`
  constructor(public readonly blog: Blog) {}
}

export class AddFailureAction {
  static readonly type = `[${blogFeatureKey}] Add Failure`
  constructor(public readonly error: unknown) {}
}

export class UpdateAction {
  static readonly type = `[${blogFeatureKey}] Update`
  constructor(public readonly blog: Blog) {}
}

export class UpdateSuccessAction {
  static readonly type = `[${blogFeatureKey}] Update Success`
  constructor(public readonly blog: Blog) {}
}

export class UpdateFailureAction {
  static readonly type = `[${blogFeatureKey}] Update Failure`
  constructor(public readonly error: unknown) {}
}

export class RemoveAction {
  static readonly type = `[${blogFeatureKey}] Remove`
  constructor(public readonly id: string) {}
}

export class RemoveSuccessAction {
  static readonly type = `[${blogFeatureKey}] Remove Success`
  constructor(public readonly id: string) {}
}

export class RemoveFailureAction {
  static readonly type = `[${blogFeatureKey}] Remove Failure`
  constructor(public readonly error: unknown) {}
}