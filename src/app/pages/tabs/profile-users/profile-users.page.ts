import { Identify } from './../../../shared/models/auth.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.page.html',
  styleUrls: ['./profile-users.page.scss'],
})
export class ProfileUsersPage implements OnInit {

  formGroup!: FormGroup;
  userInfo!: Identify; // Armazenará as informações do usuário logado
  password_type: string = 'password';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm(); // Inicialize o formulário primeiro
    this.loadUserInfo(); // Carregue as informações do usuário
    console.log(this.loadUserInfo)
  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]], // Adicionado phone
      postal_code: ['', [Validators.required]], // Adicionado postal_code
      address: ['', [Validators.required]], // Adicionado address
    });
  }

  loadUserInfo() {
    this.authService.identify().subscribe({
      next: (res: Identify) => {
        console.log('Usuário carregado:', res);
        this.userInfo = res; // Acessa a propriedade `user` dentro da resposta
        // Preenche o formulário com as informações do usuário
        this.formGroup.patchValue({
          name: this.userInfo.name || '',
          email: this.userInfo.email || '',
          phone: this.userInfo.phone || '',
          postal_code: this.userInfo.postal_code || '',
          address: this.userInfo.address || '',
        });
      },
      error: (err) => {
        console.error('Erro ao carregar informações do usuário:', err);
      }
    });
  }

  updateUser() {
    if (this.formGroup.valid) {
      const userData = this.formGroup.value;
      if (this.userInfo && this.userInfo.id) {
        const userId = this.userInfo.id;
        console.log('Atualizando usuário com ID:', userId);
        this.userService.editUser(userId, userData).subscribe(
          (response) => {
            console.log('Usuário atualizado com sucesso', response);
            this.userInfo = { ...this.userInfo, ...userData };
          },
          (error) => {
            console.error('Erro ao atualizar usuário', error);
          }
        );
      } else {
        console.error('Informações do usuário não carregadas corretamente.');
        // Exibe uma mensagem de erro para o usuário
        alert('Informações do usuário não carregadas corretamente. Por favor, tente novamente.');
      }
    }
  }
}
