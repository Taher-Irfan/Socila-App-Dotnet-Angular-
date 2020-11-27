import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { timeStamp } from 'console';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { runInThisContext } from 'vm';
import { AlertifyService } from 'src/app/_services/Alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  currentMain: Photo;
  baseUrl = environment.apiUrl;

  constructor(
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.hasBaseDropZoneOver = false;
  }
  ngOnInit() {
    this.initializerUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializerUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'users/' +
        this.authService.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos.push(photo);
      }
    };
  }
  serMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMain = this.photos.filter((p) => p.isMain === true)[0];
          // console.log('Seccessfully set to main');
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }
  deletePhoto(photo: Photo) {
    this.alertifyService.confirm(
      'Are you sure you want to delete this photo??',
      () => {
        this.userService
          .deletePhoto(this.authService.decodedToken.nameid, photo.id)
          .subscribe(
            () => {
              this.photos.splice(
                this.photos.findIndex((p) => p.id === photo.id),
                1
              );
              this.alertifyService.success('Photo has been deleted');
            },
            (error) => {
              this.alertifyService.error('Failed to delete photo');
            }
          );
      }
    );
  }
}
