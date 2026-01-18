import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-palette.html',
  styleUrl: './question-palette.scss',
})
export class QuestionPalette implements OnInit {
  @Input() totalQuestions = 30;
  @Input() currentQuestion = 1;
  @Input() answeredQuestions: number[] = [];
  @Output() selectQuestion = new EventEmitter<number>();

  questions: number[] = [];

  ngOnInit(): void {
    this.generateQuestions();
  }

  ngOnChanges(): void {
    this.generateQuestions();
  }

  generateQuestions(): void {
    this.questions = Array.from({ length: this.totalQuestions }, (_, i) => i + 1);
  }

  onSelectQuestion(questionId: number): void {
    this.selectQuestion.emit(questionId);
  }

  isAnswered(questionId: number): boolean {
    return this.answeredQuestions.includes(questionId);
  }

  getQuestionStatus(questionId: number): 'answered' | 'current' | 'unanswered' {
    if (questionId === this.currentQuestion) {
      return 'current';
    } else if (this.isAnswered(questionId)) {
      return 'answered';
    }
    return 'unanswered';
  }
}

