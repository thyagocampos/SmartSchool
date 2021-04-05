import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno;
  public modalRef: BsModalRef;
  public alunos: Aluno[];
  public modo = 'post';

  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private alunoService: AlunoService) {
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSelec(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    console.log(this.alunoSelecionado);
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
    //console.log(this.alunoSelecionado);
  }

  voltar() {
    this.alunoSelecionado = null;
  }

  alunoSubmit() {
    this.salvarAluno(this.alunoForm.value);
    console.log("aluno submit");
  }

  salvarAluno(aluno: Aluno) {
    (aluno.id != 0) ? this.modo = 'put' : this.modo = 'post';

    this.alunoService[this.modo](aluno).subscribe(
      (retorno: Aluno) => {
        console.log(retorno);
        this.carregarAlunos();
        this.alunoSelecionado = new Aluno();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  deletarAluno(id: number) {
    this.alunoService.delete(id).subscribe(
      (model: any) => {
        this.carregarAlunos();
        console.log(model);
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }
}