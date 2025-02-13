import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { BlogFacade } from "../../facades/blog.facade";
import { AsyncPipe, CommonModule } from "@angular/common";
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateBlogDialogComponent } from "../dialogs/create-blog-dialog/create-blog-dialog.component";
import { Blog } from "../../models/blog.model";
import { Subscription } from "rxjs";
import { SignalDialogComponent } from "../dialogs/signal-dialog/signal-dialog.component";

@Component({
    selector: "app-blog-list",
    templateUrl: "./blog-list.component.html",
    styleUrls: ["./blog-list.component.css"],
    imports: [
        CommonModule,
        AsyncPipe,
        BlogCardComponent,
        MatButtonModule,
        MatIconModule
    ]
})
export class BlogListComponent implements OnInit {
    private readonly blogFacade = inject(BlogFacade);
    private readonly dialog = inject(MatDialog);

    public blogs$ = this.blogFacade.blogs$;

    public ngOnInit(): void {
        this.blogFacade.loadBlogs();
    }

    public openCreateDialog() {
        const dialogRef = this.dialog.open(CreateBlogDialogComponent, {
            width: "900px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.createBlog(result);
            }
        });
    }

    public createBlog(data: any) {
        const tempBlog: Blog = {
            id: Date.now().toString(),
            title: data.title,
            content: data.content,
            author: data.author,
            createdAt: data.createAt
        };
        this.blogFacade.addBlog(tempBlog);
    }

    public openSignalDialog() {
        const dialogRef = this.dialog.open(SignalDialogComponent, {
            width: "900px",
        });
    }
}