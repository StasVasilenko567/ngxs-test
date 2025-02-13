import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from "@angular/material/core";

interface EditDialogForm {
    title: FormControl<string | null | undefined>;
    author: FormControl<string | null | undefined>;
    content: FormControl<string | null | undefined>;
    createAt: FormControl<string | null | undefined>;
}

@Component({
    selector: "create-blog-dialog",
    templateUrl: "./create-blog-dialog.component.html",
    styleUrls: ["./create-blog-dialog.component.css"],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogActions,
        MatDialogContent,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        CommonModule,
        MatDatepickerModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideNativeDateAdapter()
    ]
})
export class CreateBlogDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<CreateBlogDialogComponent>);

    public form: FormGroup<EditDialogForm> = new FormGroup({
        "author": new FormControl<string | null | undefined>(null, Validators.required),
        "title": new FormControl<string | null | undefined>(null, Validators.required),
        "content": new FormControl<string | null | undefined>(null, [Validators.required, Validators.minLength(40)]),
        "createAt": new FormControl<string | null | undefined>(null, Validators.required),
    });

    public cancel() {
        this.dialogRef.close();
    }

    public submit() {
        this.dialogRef.close(this.form.value);
    }
}