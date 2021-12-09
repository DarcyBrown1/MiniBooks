import { Component, OnInit } from '@angular/core';
import { faMask, faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/dataobjects/user';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public faMask = faMask;
  public faUser = faUser;
  public user: User = { username: '' };

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.apiService.currentUser.subscribe(
      user => this.user = user
    );
  }

  enterName() {
    const reviewEdit = this.modalService.open(UserEditComponent, { size: 'lg' });
    reviewEdit.componentInstance.user = { username: '' };
    reviewEdit.result;
  }

  signOut() {
    this.apiService.signOut()
  }
}
