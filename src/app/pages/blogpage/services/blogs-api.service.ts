import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Blog } from "../models/blog.model";
import { Observable } from "rxjs";

const API_ENDPOINTS = {
    HOST: "http://localhost:3000",
    BLOGS: "/blogs"
}

@Injectable({ providedIn: "root" })
export class BlogsApiService {
    private readonly http = inject(HttpClient);

    public getAll(): Observable<Blog[]> {
        return this.http.get<Blog[]>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.BLOGS}`)
    }

    // public getById(id: string): Observable<Blog> {
    //     return this.http.get<Blog>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.BLOGS}/${id}`)
    // }

    public add(blog: Blog): Observable<Blog> {
        return this.http.post<Blog>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.BLOGS}`, blog)
    }

    public update(blog: Blog): Observable<Blog> {
        return this.http.put<Blog>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.BLOGS}/${blog.id}`, blog)
    }

    public remove(id: string): Observable<Blog> {
        return this.http.delete<Blog>(`${API_ENDPOINTS.HOST}${API_ENDPOINTS.BLOGS}/${id}`)
    }
}
