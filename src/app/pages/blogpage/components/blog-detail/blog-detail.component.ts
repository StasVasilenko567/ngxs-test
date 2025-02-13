import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContainerComponent } from "../../../../shared/components/container/container.component";
import { BlogFacade } from "../../store/blog.facade";
import { Blog } from "../../models/blog.model";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "blog-detail",
    templateUrl: "./blog-detail.component.html",
    styleUrls: ["./blog-detail.component.css"],
    imports: [
        ContainerComponent,
        DatePipe,
        MatButtonModule,
        MatIconModule
    ]
})
export class BlogDetailComponent implements OnInit, OnDestroy {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly blogFacade = inject(BlogFacade);
    private readonly router = inject(Router);

    public blogData: Blog | null = null;

    private id = this.activatedRoute.snapshot.paramMap.get('id');
    private subscription: Subscription | null = null;

    public ngOnInit(): void {
        this.subscription = this.blogFacade.blog$(this.id as string).subscribe((blog) => {
            this.blogData = blog;
        });
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public goBack() {
        this.router.navigate(['/']);
    }
}