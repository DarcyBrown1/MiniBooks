import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/dataobjects/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  @Input() user: User = { username: '' };

  constructor(public modal: NgbActiveModal, private apiService: ApiService) { }

  save() {
    this.user.username = this.user.username.trim();
    this.apiService.signIn(this.user)
    this.modal.close('close')
  }
}
