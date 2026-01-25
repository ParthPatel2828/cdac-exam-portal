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
  "examTitle": "Mock Test - Java, Python & OOP",
  "totalQuestions": 100,
  "questions": [
    { "id": 1, "subject": "Java", "question": "Which keyword is used to inherit a class in Java?", "options": ["this", "super", "extends", "implements"], "correctAnswer": "extends" },
    { "id": 2, "subject": "Java", "question": "Which of these is not a Java feature?", "options": ["Object-oriented", "Use of pointers", "Portable", "Secure"], "correctAnswer": "Use of pointers" },
    { "id": 3, "subject": "Java", "question": "Default value of int variable in Java?", "options": ["0", "1", "null", "undefined"], "correctAnswer": "0" },
    { "id": 4, "subject": "Java", "question": "Entry point of Java program?", "options": ["start()", "main()", "run()", "init()"], "correctAnswer": "main()" },
    { "id": 5, "subject": "Java", "question": "Which access modifier is most restrictive?", "options": ["public", "protected", "default", "private"], "correctAnswer": "private" },

    { "id": 6, "subject": "Java", "question": "Which collection allows duplicates?", "options": ["Set", "List", "Map", "None"], "correctAnswer": "List" },
    { "id": 7, "subject": "Java", "question": "Which keyword prevents inheritance?", "options": ["static", "final", "private", "protected"], "correctAnswer": "final" },
    { "id": 8, "subject": "Java", "question": "Which exception is unchecked?", "options": ["IOException", "SQLException", "NullPointerException", "FileNotFoundException"], "correctAnswer": "NullPointerException" },
    { "id": 9, "subject": "Java", "question": "Which keyword refers to current object?", "options": ["this", "super", "object", "current"], "correctAnswer": "this" },
    { "id": 10, "subject": "Java", "question": "Which JVM component loads classes?", "options": ["JIT", "Class Loader", "Interpreter", "GC"], "correctAnswer": "Class Loader" },

    { "id": 11, "subject": "Python", "question": "Symbol for comments in Python?", "options": ["//", "#", "/* */", "--"], "correctAnswer": "#" },
    { "id": 12, "subject": "Python", "question": "Which keyword defines function?", "options": ["function", "def", "fun", "define"], "correctAnswer": "def" },
    { "id": 13, "subject": "Python", "question": "Which datatype is immutable?", "options": ["List", "Set", "Dictionary", "Tuple"], "correctAnswer": "Tuple" },
    { "id": 14, "subject": "Python", "question": "Output of print(2**3)?", "options": ["6", "8", "9", "Error"], "correctAnswer": "8" },
    { "id": 15, "subject": "Python", "question": "Which function gives length?", "options": ["size()", "count()", "len()", "length()"], "correctAnswer": "len()" },

    { "id": 16, "subject": "Python", "question": "Which loop does not exist in Python?", "options": ["for", "while", "do-while", "nested"], "correctAnswer": "do-while" },
    { "id": 17, "subject": "Python", "question": "Which module supports regex?", "options": ["regex", "re", "pyregex", "express"], "correctAnswer": "re" },
    { "id": 18, "subject": "Python", "question": "Convert string to integer?", "options": ["str()", "int()", "float()", "chr()"], "correctAnswer": "int()" },
    { "id": 19, "subject": "Python", "question": "What is PEP 8?", "options": ["Compiler", "Library", "Style guide", "Version"], "correctAnswer": "Style guide" },
    { "id": 20, "subject": "Python", "question": "Output of type([])?", "options": ["list", "<class 'list'>", "array", "[]"], "correctAnswer": "<class 'list'>" },

    { "id": 21, "subject": "OOP", "question": "Binding data and methods together?", "options": ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], "correctAnswer": "Encapsulation" },
    { "id": 22, "subject": "OOP", "question": "Acquiring properties of another class?", "options": ["Abstraction", "Inheritance", "Encapsulation", "Polymorphism"], "correctAnswer": "Inheritance" },
    { "id": 23, "subject": "OOP", "question": "Method overriding uses?", "options": ["Encapsulation", "Inheritance", "Abstraction", "Interface"], "correctAnswer": "Inheritance" },
    { "id": 24, "subject": "OOP", "question": "Many forms concept?", "options": ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"], "correctAnswer": "Polymorphism" },
    { "id": 25, "subject": "OOP", "question": "Hiding implementation details?", "options": ["Inheritance", "Abstraction", "Encapsulation", "Polymorphism"], "correctAnswer": "Abstraction" },

    { "id": 26, "subject": "OOP", "question": "Constructor is used for?", "options": ["Loop", "Method call", "Object initialization", "Overloading"], "correctAnswer": "Object initialization" },
    { "id": 27, "subject": "OOP", "question": "Multiple inheritance in Java classes?", "options": ["Yes", "No", "Sometimes", "Only interfaces"], "correctAnswer": "No" },
    { "id": 28, "subject": "OOP", "question": "Which keyword implements interface?", "options": ["extends", "implements", "interface", "inherit"], "correctAnswer": "implements" },
    { "id": 29, "subject": "OOP", "question": "Improves code reusability?", "options": ["Abstraction", "Inheritance", "Encapsulation", "Polymorphism"], "correctAnswer": "Inheritance" },
    { "id": 30, "subject": "OOP", "question": "Data hiding is achieved by?", "options": ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], "correctAnswer": "Encapsulation" },

    { "id": 31, "subject": "Java", "question": "Which keyword is used to create object?", "options": ["class", "object", "new", "create"], "correctAnswer": "new" },
    { "id": 32, "subject": "Java", "question": "Which method is called automatically?", "options": ["main()", "constructor", "start()", "run()"], "correctAnswer": "constructor" },
    { "id": 33, "subject": "Java", "question": "Which collection stores key-value pairs?", "options": ["List", "Set", "Map", "Array"], "correctAnswer": "Map" },
    { "id": 34, "subject": "Java", "question": "Which keyword is used for exception handling?", "options": ["catch", "throw", "try", "All"], "correctAnswer": "All" },
    { "id": 35, "subject": "Java", "question": "Which interface is used for sorting?", "options": ["Serializable", "Comparable", "Runnable", "Cloneable"], "correctAnswer": "Comparable" },

    { "id": 36, "subject": "Python", "question": "Which keyword handles exceptions?", "options": ["catch", "handle", "except", "error"], "correctAnswer": "except" },
    { "id": 37, "subject": "Python", "question": "Which operator is used for power?", "options": ["^", "**", "//", "%"], "correctAnswer": "**" },
    { "id": 38, "subject": "Python", "question": "Which datatype stores key-value?", "options": ["List", "Tuple", "Dictionary", "Set"], "correctAnswer": "Dictionary" },
    { "id": 39, "subject": "Python", "question": "Which keyword stops loop?", "options": ["stop", "exit", "break", "end"], "correctAnswer": "break" },
    { "id": 40, "subject": "Python", "question": "Index of first element?", "options": ["0", "1", "-1", "None"], "correctAnswer": "0" },

    { "id": 41, "subject": "OOP", "question": "Interface supports?", "options": ["Multiple inheritance", "Single inheritance", "No inheritance", "Private methods"], "correctAnswer": "Multiple inheritance" },
    { "id": 42, "subject": "OOP", "question": "Which is not OOP principle?", "options": ["Encapsulation", "Compilation", "Inheritance", "Abstraction"], "correctAnswer": "Compilation" },
    { "id": 43, "subject": "OOP", "question": "Superclass is also called?", "options": ["Child", "Derived", "Parent", "Object"], "correctAnswer": "Parent" },
    { "id": 44, "subject": "OOP", "question": "Method overloading occurs at?", "options": ["Compile time", "Run time", "Link time", "Load time"], "correctAnswer": "Compile time" },
    { "id": 45, "subject": "OOP", "question": "Method overriding occurs at?", "options": ["Compile time", "Run time", "Link time", "Load time"], "correctAnswer": "Run time" },

    { "id": 46, "subject": "Java", "question": "Which package contains Scanner?", "options": ["java.io", "java.lang", "java.util", "java.net"], "correctAnswer": "java.util" },
    { "id": 47, "subject": "Java", "question": "Which keyword is used to call parent constructor?", "options": ["this", "super", "parent", "base"], "correctAnswer": "super" },
    { "id": 48, "subject": "Java", "question": "Which thread method starts execution?", "options": ["run()", "start()", "execute()", "init()"], "correctAnswer": "start()" },
    { "id": 49, "subject": "Java", "question": "Which class is root of Java hierarchy?", "options": ["Main", "System", "Object", "Class"], "correctAnswer": "Object" },
    { "id": 50, "subject": "Java", "question": "Which keyword is used to define constant?", "options": ["static", "final", "const", "define"], "correctAnswer": "final" },

    { "id": 51, "subject": "Python", "question": "Which keyword is used to create class?", "options": ["def", "function", "class", "struct"], "correctAnswer": "class" },
    { "id": 52, "subject": "Python", "question": "Which function reads input?", "options": ["input()", "read()", "scan()", "get()"], "correctAnswer": "input()" },
    { "id": 53, "subject": "Python", "question": "Which keyword continues loop?", "options": ["skip", "continue", "pass", "next"], "correctAnswer": "continue" },
    { "id": 54, "subject": "Python", "question": "Which symbol is used for floor division?", "options": ["/", "//", "%", "**"], "correctAnswer": "//" },
    { "id": 55, "subject": "Python", "question": "Which datatype stores unique elements?", "options": ["List", "Tuple", "Set", "Dict"], "correctAnswer": "Set" },

    { "id": 56, "subject": "OOP", "question": "Which concept hides complexity?", "options": ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], "correctAnswer": "Abstraction" },
    { "id": 57, "subject": "OOP", "question": "Can constructor be inherited?", "options": ["Yes", "No", "Sometimes", "Only abstract"], "correctAnswer": "No" },
    { "id": 58, "subject": "OOP", "question": "Which keyword is used for runtime polymorphism?", "options": ["static", "final", "override", "virtual"], "correctAnswer": "override" },
    { "id": 59, "subject": "OOP", "question": "Encapsulation uses?", "options": ["Classes", "Objects", "Methods", "Variables"], "correctAnswer": "Classes" },
    { "id": 60, "subject": "OOP", "question": "Which access modifier is default?", "options": ["public", "private", "protected", "no modifier"], "correctAnswer": "no modifier" },

    { "id": 61, "subject": "Java", "question": "Which keyword creates thread?", "options": ["implements Runnable", "extends Thread", "Both", "None"], "correctAnswer": "Both" },
    { "id": 62, "subject": "Java", "question": "Which stream is used to read data?", "options": ["InputStream", "OutputStream", "Writer", "Reader"], "correctAnswer": "InputStream" },
    { "id": 63, "subject": "Java", "question": "Which keyword is used for package?", "options": ["import", "package", "include", "namespace"], "correctAnswer": "package" },
    { "id": 64, "subject": "Java", "question": "Which keyword throws exception?", "options": ["throw", "throws", "catch", "try"], "correctAnswer": "throw" },
    { "id": 65, "subject": "Java", "question": "Which loop executes at least once?", "options": ["for", "while", "do-while", "foreach"], "correctAnswer": "do-while" },

    { "id": 66, "subject": "Python", "question": "Which keyword deletes variable?", "options": ["remove", "delete", "del", "pop"], "correctAnswer": "del" },
    { "id": 67, "subject": "Python", "question": "Which statement does nothing?", "options": ["continue", "break", "pass", "skip"], "correctAnswer": "pass" },
    { "id": 68, "subject": "Python", "question": "Which function returns ASCII?", "options": ["char()", "ord()", "ascii()", "chr()"], "correctAnswer": "ord()" },
    { "id": 69, "subject": "Python", "question": "Which keyword is used for inheritance?", "options": ["extends", "inherits", "super", "class"], "correctAnswer": "class" },
    { "id": 70, "subject": "Python", "question": "Which datatype is ordered?", "options": ["Set", "Dictionary", "List", "None"], "correctAnswer": "List" },

    { "id": 71, "subject": "OOP", "question": "Which feature increases security?", "options": ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], "correctAnswer": "Encapsulation" },
    { "id": 72, "subject": "OOP", "question": "Which concept uses IS-A relationship?", "options": ["Aggregation", "Inheritance", "Composition", "Encapsulation"], "correctAnswer": "Inheritance" },
    { "id": 73, "subject": "OOP", "question": "Which concept uses HAS-A relationship?", "options": ["Inheritance", "Abstraction", "Aggregation", "Polymorphism"], "correctAnswer": "Aggregation" },
    { "id": 74, "subject": "OOP", "question": "Which binding happens at runtime?", "options": ["Static", "Dynamic", "Early", "Compile"], "correctAnswer": "Dynamic" },
    { "id": 75, "subject": "OOP", "question": "Which keyword prevents method override?", "options": ["static", "final", "private", "protected"], "correctAnswer": "final" },

    { "id": 76, "subject": "Java", "question": "Which keyword is used to import packages?", "options": ["include", "import", "package", "using"], "correctAnswer": "import" },
    { "id": 77, "subject": "Java", "question": "Which datatype stores decimal?", "options": ["int", "float", "char", "boolean"], "correctAnswer": "float" },
    { "id": 78, "subject": "Java", "question": "Which operator compares objects?", "options": ["=", "==", "equals()", "!"], "correctAnswer": "equals()" },
    { "id": 79, "subject": "Java", "question": "Which keyword is used for interface?", "options": ["class", "interface", "implements", "extends"], "correctAnswer": "interface" },
    { "id": 80, "subject": "Java", "question": "Which method stops thread?", "options": ["stop()", "end()", "kill()", "exit()"], "correctAnswer": "stop()" },

    { "id": 81, "subject": "Python", "question": "Which function converts int to string?", "options": ["int()", "str()", "float()", "chr()"], "correctAnswer": "str()" },
    { "id": 82, "subject": "Python", "question": "Which keyword checks condition?", "options": ["check", "if", "when", "cond"], "correctAnswer": "if" },
    { "id": 83, "subject": "Python", "question": "Which keyword handles error?", "options": ["catch", "except", "error", "handle"], "correctAnswer": "except" },
    { "id": 84, "subject": "Python", "question": "Which data type is mutable?", "options": ["Tuple", "String", "List", "Int"], "correctAnswer": "List" },
    { "id": 85, "subject": "Python", "question": "Which loop iterates sequence?", "options": ["while", "for", "do", "repeat"], "correctAnswer": "for" },

    { "id": 86, "subject": "OOP", "question": "Which feature supports flexibility?", "options": ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"], "correctAnswer": "Polymorphism" },
    { "id": 87, "subject": "OOP", "question": "Which class cannot be instantiated?", "options": ["Normal", "Abstract", "Public", "Private"], "correctAnswer": "Abstract" },
    { "id": 88, "subject": "OOP", "question": "Which keyword creates abstract method?", "options": ["abstract", "virtual", "interface", "static"], "correctAnswer": "abstract" },
    { "id": 89, "subject": "OOP", "question": "Which concept uses method hiding?", "options": ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], "correctAnswer": "Encapsulation" },
    { "id": 90, "subject": "OOP", "question": "Which principle reduces complexity?", "options": ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], "correctAnswer": "Abstraction" },

    { "id": 91, "subject": "Java", "question": "Which type of memory is heap?", "options": ["Static", "Dynamic", "Stack", "Register"], "correctAnswer": "Dynamic" },
    { "id": 92, "subject": "Java", "question": "Which keyword is used for garbage collection?", "options": ["gc", "delete", "finalize", "System.gc()"], "correctAnswer": "System.gc()" },
    { "id": 93, "subject": "Java", "question": "Which datatype stores true/false?", "options": ["int", "char", "boolean", "float"], "correctAnswer": "boolean" },
    { "id": 94, "subject": "Java", "question": "Which operator is logical AND?", "options": ["&", "&&", "|", "||"], "correctAnswer": "&&" },
    { "id": 95, "subject": "Java", "question": "Which keyword creates constant?", "options": ["static", "const", "final", "define"], "correctAnswer": "final" },

    { "id": 96, "subject": "Python", "question": "Which function sorts list?", "options": ["sort()", "order()", "arrange()", "sorted()"], "correctAnswer": "sort()" },
    { "id": 97, "subject": "Python", "question": "Which keyword defines lambda?", "options": ["lambda", "def", "function", "fun"], "correctAnswer": "lambda" },
    { "id": 98, "subject": "Python", "question": "Which operator compares equality?", "options": ["=", "==", "!=", "<>"], "correctAnswer": "==" },
    { "id": 99, "subject": "Python", "question": "Which statement exits program?", "options": ["exit()", "stop()", "break", "return"], "correctAnswer": "exit()" },
    { "id": 100, "subject": "Python", "question": "Which keyword is used to raise exception?", "options": ["raise", "throw", "except", "error"], "correctAnswer": "raise" }
  ]
}


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
