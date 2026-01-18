import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionPalette } from '../question-palette/question-palette';
import { AuthService } from '../../auth/auth/auth.service';
import { ToasterService } from '../toaster-service/toaster.service';
import { QuestionService, Question, ExamData } from '../../services/question.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-exam-layout',
  standalone: true,
  imports: [CommonModule, QuestionPalette],
  templateUrl: './exam-layout.html',
  styleUrl: './exam-layout.scss',
})
export class ExamLayout implements OnInit, OnDestroy {
  examData = signal<ExamData | null>(null);
  currentQuestion = signal<Question | null>(null);
  currentQuestionIndex = signal(0);

  answered = signal<number[]>([]);
  selectedAnswers = signal<Map<number, string>>(new Map());
  isLoading = signal(true);

  examTitle = signal('');
  totalQuestions = signal(0);
  timeLeft = signal('59:59');
  answeredCount = signal(0);

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadExam();
    this.startTimer();
  }

  private loadExam(): void {
    this.isLoading.set(true);

    this.questionService.loadQuestions()
      .then((data: ExamData) => {
        this.examData.set(data);
        this.examTitle.set(data.examTitle);
        this.totalQuestions.set(data.totalQuestions);

        if (data.questions.length > 0) {
          this.currentQuestion.set(data.questions[0]);
          this.currentQuestionIndex.set(0);
        }

        this.isLoading.set(false);
      })
      .catch((error: any) => {
        this.toasterService.error('Failed to load exam questions');
        this.isLoading.set(false);
      });
  }

  selectQuestion(questionId: number): void {
    const data = this.examData();
    if (!data) return;

    const questionIndex = data.questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
      this.currentQuestion.set(data.questions[questionIndex]);
      this.currentQuestionIndex.set(questionIndex);
    }
  }

  selectAnswer(answer: string): void {
    const question = this.currentQuestion();
    if (!question) return;

    const answers = this.selectedAnswers();
    answers.set(question.id, answer);
    this.selectedAnswers.set(answers);

    if (!this.answered().includes(question.id)) {
      this.answered.update(arr => [...arr, question.id]);
      this.answeredCount.set(this.answered().length);
    }

    this.questionService.setUserAnswer(question.id, answer);
  }

  next(): void {
    const data = this.examData();
    if (!data || this.currentQuestionIndex() >= data.questions.length - 1) return;

    const nextIndex = this.currentQuestionIndex() + 1;
    this.currentQuestion.set(data.questions[nextIndex]);
    this.currentQuestionIndex.set(nextIndex);
  }

  prev(): void {
    if (this.currentQuestionIndex() <= 0) return;

    const data = this.examData();
    if (!data) return;

    const prevIndex = this.currentQuestionIndex() - 1;
    this.currentQuestion.set(data.questions[prevIndex]);
    this.currentQuestionIndex.set(prevIndex);
  }

  isAnswered(questionId: number): boolean {
    return this.answered().includes(questionId);
  }

  getSelectedAnswer(questionId: number): string | undefined {
    return this.selectedAnswers().get(questionId);
  }

  private startTimer(): void {
    let timeInSeconds = 60 * 60 - 1; // 59:59

    const timerInterval = setInterval(() => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      this.timeLeft.set(
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );

      if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        this.submitExam();
      }

      timeInSeconds--;
    }, 1000);
  }

  submitExam(): void {
    const answered = this.answered().length;
    const total = this.totalQuestions();

    // Validation: Check if all questions are answered
    if (answered < total) {
      this.toasterService.error(
        `Please answer all ${total} questions! You've answered ${answered}/${total}`
      );
      return;
    }

    this.toasterService.warning(`Submitting exam (${answered}/${total} answered)...`);

    setTimeout(() => {
      this.toasterService.success('Exam submitted successfully!');
      this.logout();
    }, 1500);
  }

  logout(): void {
    const answered = this.answered().length;
    const total = this.totalQuestions();

    // Validation: Prevent logout without completing exam
    if (answered < total) {
      this.toasterService.warning(
        `You must complete and submit the exam first! (${answered}/${total} answered)`
      );
      return;
    }

    this.authService.logout();
    this.questionService.resetAnswers();
    this.toasterService.info('You have been logged out');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


