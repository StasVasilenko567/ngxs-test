import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogFacade } from "../../facades/blog.facade";
import { AsyncPipe, DatePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "blog-detail",
    templateUrl: "./blog-detail.component.html",
    styleUrls: ["./blog-detail.component.css"],
    imports: [
        DatePipe,
        MatButtonModule,
        MatIconModule,
        AsyncPipe
    ]
})
export class BlogDetailComponent implements OnInit {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly blogFacade = inject(BlogFacade);
    private readonly router = inject(Router);

    private id = this.activatedRoute.snapshot.paramMap.get('id');
    
    public blog$ = this.blogFacade.getBlogById(this.id as string);

    public ngOnInit(): void {
        this.blogFacade.loadBlogs();
    }

    public goBack() {
        this.router.navigate(['/']);
    }
}