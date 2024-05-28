import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  faqList1 = [
    { question: 'Quanto tempo para que meu chamado seja resolvido?', answer: 'Normalmente, os chamados são resolvidos em até 48 horas úteis.' },
    { question: 'Como eu posso pedir outra peça?', answer: 'Você pode pedir outra peça entrando em contato com nosso departamento de suporte técnico.' },
    { question: 'Como posso entrar em contato de outra maneira?', answer: 'Você pode entrar em contato por telefone ou por e-mail.' }
  ];

  faqList2 = [
    { question: 'Quanto tempo para que meu chamado seja resolvido?', answer: 'Normalmente, os chamados são resolvidos em até 48 horas úteis.' },
    { question: 'Como eu posso pedir outra peça?', answer: 'Você pode pedir outra peça entrando em contato com nosso departamento de suporte técnico.' },
    { question: 'Como posso entrar em contato de outra maneira?', answer: 'Você pode entrar em contato por telefone ou por e-mail.' }
  ];

  faqList3 = [
    { question: 'Quanto tempo para que meu chamado seja resolvido?', answer: 'Normalmente, os chamados são resolvidos em até 48 horas úteis.' },
    { question: 'Como eu posso pedir outra peça?', answer: 'Você pode pedir outra peça entrando em contato com nosso departamento de suporte técnico.' },
    { question: 'Como posso entrar em contato de outra maneira?', answer: 'Você pode entrar em contato por telefone ou por e-mail.' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
