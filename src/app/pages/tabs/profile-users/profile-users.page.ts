import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageToastService } from 'src/app/shared/services/messageToast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service'; // Importe o AuthService
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.page.html',
  styleUrls: ['./profile-users.page.scss'],
})
export class ProfileUsersPage implements OnInit {

  formGroup!: FormGroup;
  user?: User;
  saved: boolean = false;
  userIdSubscription!: Subscription; // Adicione uma variável de inscrição

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageToastService: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Injete o AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Use o método getUserId do AuthService para obter o ID do usuário
    console.log('ID do usuário recuperado do localStorage:', userId);
    if (userId) {
      this.userService.getUserById(String(userId)).subscribe(
        (user) => {
          this.user = user;
          this.initForm();
        },
        (error) => {
          console.error('Erro ao obter usuário:', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado no localStorage');
    }
  }


  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe(); // Certifique-se de cancelar a inscrição ao destruir o componente
    }
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      nome: [this.user?.nome, [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      telefone: [this.user?.phone, [Validators.required]],
    });

    this.formGroup.patchValue({
      nome: this.user?.nome,
      email: this.user?.email,
      telefone: this.user?.phone,
    });
  }

  updateUser() {
    if (!this.user) {
      console.error('Usuário não encontrado');
      return;
    }

    if (this.formGroup.valid && this.formGroup.value) {
      const userId = Number(this.user!.id); // Convertendo o userId para number

      this.userService.editUser(this.formGroup.value, userId).subscribe({
        next: (user) => {
          console.log('Usuário atualizado com sucesso =>', user)
          this.saved = true
          this.formGroup.reset()
          this.formGroup.patchValue({
            nome: user.nome,
            email: user.email,
            phone: user.phone
          });
          this.messageToastService.showMessage('Usuário atualizado com sucesso!');
          setTimeout(() => {
            return this.router.navigate(['/users'], { relativeTo: this.route })
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro)
          this.messageToastService.showMessage(erro.error.message || `Ocorreu um erro ao atualizar o usuário.`);
        }
      })
    }
  }
}
