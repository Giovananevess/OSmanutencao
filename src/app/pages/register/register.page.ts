import { MessageToastService } from './../../shared/services/messageToast.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  saved: boolean = false;
  messageSubscription: Subscription | undefined;

  user?: User

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private messageToastService: MessageToastService,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      cep: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.userService.register(this.formGroup.value).subscribe({
      next: (user) => {
        console.log('Usuário criado com sucesso =>', user);
        this.saved = true;
        this.formGroup.reset();
        this.messageToastService.showMessage('Usuário criado com sucesso!');
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
      },
      error: (erro) => {
        console.error('Erro ao criar usuário:', erro);
        this.messageToastService.showMessage(erro.error.message || `Ocorreu um erro ao criar o usuário.`);
      }
    });
    // this.route.data.subscribe(
    //   (data) => this.user = data['usuario'][0]
    // )
    // console.log('Data', this.user);

    // this.formGroup.patchValue({
    //   nome: this.user?.nome,
    //   email: this.user?.email,
    //   telefone: this.user?.phone,


    // });

  }
  createUser() {
    if (this.formGroup.valid && this.formGroup.value) {
      this.userService.register(this.formGroup.value).subscribe({
        next: (user) => {
          console.log('Usuário criado com sucesso =>', user)
          this.saved = true
          this.formGroup.reset()
          this.messageToastService.showMessage('Usuário criado com sucesso!');
          setTimeout(() => {
            return this.router.navigate(['../users'], { relativeTo: this.route })
          }, 2000)
        },
        error: (erro) => {
          console.error('Erro => ', erro)
          this.messageToastService.showMessage(erro.error.message || `Ocorreu um erro ao criar o usuário.`);
        }
      })
    }
  }

}
