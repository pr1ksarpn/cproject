#ifndef STUDENT_H
#define STUDENT_H

#define MAX_STUDENTS 100
#define MAX_NAME_LEN 50
#define MAX_SUBJECTS 5

typedef struct {
    int roll_no;
    char name[MAX_NAME_LEN];
    float marks[MAX_SUBJECTS];
    float total;
    float percentage;
    char grade;
} Student;

void add_student(Student students[], int *count);
void display_all(const Student students[], int count);
void display_student(const Student *s);
void search_student(const Student students[], int count);
void calculate_result(Student *s);
char get_grade(float percentage);
void save_to_file(const Student students[], int count);
int load_from_file(Student students[]);

#endif
