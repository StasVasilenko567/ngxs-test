import { Component, inject, Input, OnDestroy } from "@angular/core";
import { Blog } from "../../models/blog.model";
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Router } from "@angular/router";
import { BlogFacade } from "../../facades/blog.facade";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "../dialogs/delete-dialog/delete-dialog.component";
import { Subscription } from "rxjs";
 
@Component({
    selector: "blog-card",
    templateUrl: "./blog-card.component.html",
    styleUrls: ["./blog-card.component.css"],
    imports: [
        MatCardModule, 
        MatButtonModule,
        MatIconModule
    ]
})
export class BlogCardComponent {
    private readonly router = inject(Router);
    private readonly blogFacade = inject(BlogFacade);
    private readonly dialog = inject(MatDialog);

    @Input() public blog!: Blog;

    public redirectToDetail() {
        this.router.navigate([`/blog/${this.blog.id}`]);
    }

    public openDeleteDialog() {
        const dialogRef = this.dialog.open(DeleteDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.remove();
            }
        });
    }

    private remove() {
        this.blogFacade.remove(this.blog);
    }
}