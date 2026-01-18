import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  answered?: boolean;
}

export interface ExamData {
  examTitle: string;
  totalQuestions: number;
  questions: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private examData = new BehaviorSubject<ExamData | null>(null);
  public examData$ = this.examData.asObservable();

  private userAnswers = new BehaviorSubject<Map<number, string>>(new Map());
  public userAnswers$ = this.userAnswers.asObservable();

  private mockData: ExamData = {
    examTitle: 'Mock Test - Java & Python (OOP)',
    totalQuestions: 30,
    questions: [
      {
        id: 1,
        subject: 'Java',
        question: 'Which keyword is used to inherit a class in Java?',
        options: ['this', 'super', 'extends', 'implements'],
        correctAnswer: 'extends'
      },
      {
        id: 2,
        subject: 'Java',
        question: 'Which of these is not a Java feature?',
        options: ['Object-oriented', 'Use of pointers', 'Portable', 'Secure'],
        correctAnswer: 'Use of pointers'
      },
      {
        id: 3,
        subject: 'Java',
        question: 'What is the default value of an int variable in Java?',
        options: ['0', '1', 'null', 'undefined'],
        correctAnswer: '0'
      },
      {
        id: 4,
        subject: 'Java',
        question: 'Which method is the entry point of a Java program?',
        options: ['start()', 'main()', 'run()', 'init()'],
        correctAnswer: 'main()'
      },
      {
        id: 5,
        subject: 'Java',
        question: 'Which access modifier makes a variable visible only within the same class?',
        options: ['public', 'protected', 'default', 'private'],
        correctAnswer: 'private'
      },
      {
        id: 6,
        subject: 'Python',
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/* */', '--'],
        correctAnswer: '#'
      },
      {
        id: 7,
        subject: 'Python',
        question: 'What is the output of: print(type([]))?',
        options: ['list', "<class 'list'>", 'array', '<list>'],
        correctAnswer: "<class 'list'>"
      },
      {
        id: 8,
        subject: 'Python',
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'fun', 'define'],
        correctAnswer: 'def'
      },
      {
        id: 9,
        subject: 'Python',
        question: 'Which data type is immutable in Python?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctAnswer: 'Tuple'
      },
      {
        id: 10,
        subject: 'Python',
        question: 'What does len() function do?',
        options: ['Returns type', 'Returns length', 'Returns value', 'Returns index'],
        correctAnswer: 'Returns length'
      },
      {
        id: 11,
        subject: 'OOP',
        question: 'Which OOP concept binds data and methods together?',
        options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
        correctAnswer: 'Encapsulation'
      },
      {
        id: 12,
        subject: 'OOP',
        question: 'What is inheritance?',
        options: [
          'Creating objects',
          'Acquiring properties of another class',
          'Hiding data',
          'Overloading methods'
        ],
        correctAnswer: 'Acquiring properties of another class'
      },
      {
        id: 13,
        subject: 'OOP',
        question: 'Which concept allows method overriding?',
        options: ['Encapsulation', 'Inheritance', 'Abstraction', 'Interface'],
        correctAnswer: 'Inheritance'
      },
      {
        id: 14,
        subject: 'OOP',
        question: 'What does polymorphism mean?',
        options: [
          'One form',
          'Multiple forms',
          'Many objects',
          'Data hiding'
        ],
        correctAnswer: 'Multiple forms'
      },
      {
        id: 15,
        subject: 'Java',
        question: 'What is the size of int in Java?',
        options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
        correctAnswer: '4 bytes'
      },
      {
        id: 16,
        subject: 'Java',
        question: 'Which class is the superclass of all classes in Java?',
        options: ['String', 'System', 'Object', 'Class'],
        correctAnswer: 'Object'
      },
      {
        id: 17,
        subject: 'Python',
        question: 'What is a dictionary in Python?',
        options: [
          'An ordered collection',
          'An unordered collection of key-value pairs',
          'A sequence of numbers',
          'A string collection'
        ],
        correctAnswer: 'An unordered collection of key-value pairs'
      },
      {
        id: 18,
        subject: 'Python',
        question: 'Which method adds an element to a Python list?',
        options: ['add()', 'push()', 'append()', 'insert_element()'],
        correctAnswer: 'append()'
      },
      {
        id: 19,
        subject: 'OOP',
        question: 'What is an abstract class?',
        options: [
          'A class that cannot be instantiated',
          'A class with only one method',
          'A class that is inherited',
          'A class with no variables'
        ],
        correctAnswer: 'A class that cannot be instantiated'
      },
      {
        id: 20,
        subject: 'OOP',
        question: 'What is an interface?',
        options: [
          'A class with implementation',
          'A blueprint for classes',
          'A variable type',
          'A function definition'
        ],
        correctAnswer: 'A blueprint for classes'
      },
      {
        id: 21,
        subject: 'Java',
        question: 'What is the use of the static keyword?',
        options: [
          'To declare constant variables',
          'To make members belong to the class',
          'To define methods',
          'To import classes'
        ],
        correctAnswer: 'To make members belong to the class'
      },
      {
        id: 22,
        subject: 'Java',
        question: 'What does synchronized keyword do?',
        options: [
          'Speeds up execution',
          'Provides thread safety',
          'Compiles code',
          'Creates objects'
        ],
        correctAnswer: 'Provides thread safety'
      },
      {
        id: 23,
        subject: 'Python',
        question: 'What is the range() function used for?',
        options: [
          'To define a range of numbers',
          'To measure distance',
          'To find maximum value',
          'To sort elements'
        ],
        correctAnswer: 'To define a range of numbers'
      },
      {
        id: 24,
        subject: 'Python',
        question: 'Which keyword is used to handle exceptions in Python?',
        options: ['try', 'catch', 'handle', 'error'],
        correctAnswer: 'try'
      },
      {
        id: 25,
        subject: 'OOP',
        question: 'What is encapsulation?',
        options: [
          'Wrapping code in a class',
          'Hiding internal details and showing only necessary details',
          'Creating multiple objects',
          'Inheriting properties'
        ],
        correctAnswer: 'Hiding internal details and showing only necessary details'
      },
      {
        id: 26,
        subject: 'OOP',
        question: 'What is composition?',
        options: [
          'Having objects of other classes as member variables',
          'Inheriting from multiple classes',
          'Using multiple functions',
          'Creating new classes'
        ],
        correctAnswer: 'Having objects of other classes as member variables'
      },
      {
        id: 27,
        subject: 'Java',
        question: 'What is a constructor?',
        options: [
          'A method that destroys objects',
          'A method that initializes objects',
          'A method that creates variables',
          'A method that deletes memory'
        ],
        correctAnswer: 'A method that initializes objects'
      },
      {
        id: 28,
        subject: 'Python',
        question: 'What does the map() function do?',
        options: [
          'Creates a dictionary',
          'Applies a function to items of a list',
          'Sorts elements',
          'Filters elements'
        ],
        correctAnswer: 'Applies a function to items of a list'
      },
      {
        id: 29,
        subject: 'OOP',
        question: 'What is method overloading?',
        options: [
          'Creating multiple methods with the same name but different parameters',
          'Using multiple methods in a class',
          'Inheriting multiple methods',
          'Creating methods with no parameters'
        ],
        correctAnswer: 'Creating multiple methods with the same name but different parameters'
      },
      {
        id: 30,
        subject: 'Java',
        question: 'What is the purpose of the finally block?',
        options: [
          'To execute code only when exception occurs',
          'To execute code regardless of exception',
          'To initialize variables',
          'To declare methods'
        ],
        correctAnswer: 'To execute code regardless of exception'
      }
    ]
  };

  constructor() {}

  loadQuestions(): Promise<ExamData> {
    return new Promise<ExamData>((resolve) => {
      setTimeout(() => {
        if (environment.mockData) {
          this.examData.next(this.mockData);
          resolve(this.mockData);
        } else {
          // TODO: Replace with actual API call
          // return this.http.get<ExamData>(`${environment.apiUrl}/questions`);
          this.examData.next(this.mockData);
          resolve(this.mockData);
        }
      }, 300);
    });
  }

  getExamData(): ExamData | null {
    return this.examData.value;
  }

  setUserAnswer(questionId: number, answer: string): void {
    const answers = this.userAnswers.value;
    answers.set(questionId, answer);
    this.userAnswers.next(answers);
  }

  getUserAnswer(questionId: number): string | undefined {
    return this.userAnswers.value.get(questionId);
  }

  getAnsweredCount(): number {
    return this.userAnswers.value.size;
  }

  resetAnswers(): void {
    this.userAnswers.next(new Map());
  }
}
