#include <stdio.h>
#include <string.h>
#include "student.h"

#define DATA_FILE "students.dat"

static const char *subject_names[MAX_SUBJECTS] = {
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Programming"
};

char get_grade(float percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    if (percentage >= 50) return 'E';
    return 'F';
}

void calculate_result(Student *s) {
    s->total = 0;
    for (int i = 0; i < MAX_SUBJECTS; i++) {
        s->total += s->marks[i];
    }
    s->percentage = s->total / MAX_SUBJECTS;
    s->grade = get_grade(s->percentage);
}

void add_student(Student students[], int *count) {
    if (*count >= MAX_STUDENTS) {
        printf("Student list is full. Cannot add more students.\n");
        return;
    }

    Student *s = &students[*count];

    printf("\nEnter Roll No: ");
    if (scanf("%d", &s->roll_no) != 1) {
        printf("Invalid roll number.\n");
        while (getchar() != '\n');
        return;
    }

    /* Check for duplicate roll number */
    for (int i = 0; i < *count; i++) {
        if (students[i].roll_no == s->roll_no) {
            printf("Roll number %d already exists.\n", s->roll_no);
            while (getchar() != '\n');
            return;
        }
    }

    while (getchar() != '\n');

    printf("Enter Name: ");
    if (fgets(s->name, MAX_NAME_LEN, stdin) == NULL) {
        printf("Error reading name.\n");
        return;
    }
    /* Remove trailing newline */
    s->name[strcspn(s->name, "\n")] = '\0';

    printf("Enter marks for %d subjects (out of 100):\n", MAX_SUBJECTS);
    for (int i = 0; i < MAX_SUBJECTS; i++) {
        printf("  %s: ", subject_names[i]);
        if (scanf("%f", &s->marks[i]) != 1 || s->marks[i] < 0 || s->marks[i] > 100) {
            printf("Invalid marks. Must be between 0 and 100.\n");
            while (getchar() != '\n');
            return;
        }
    }
    while (getchar() != '\n');

    calculate_result(s);
    (*count)++;
    printf("\nStudent record added successfully.\n");
}

void display_student(const Student *s) {
    printf("\n  Roll No   : %d\n", s->roll_no);
    printf("  Name      : %s\n", s->name);
    printf("  %-15s  %-15s  %-15s  %-15s  %-15s\n",
           subject_names[0], subject_names[1], subject_names[2],
           subject_names[3], subject_names[4]);
    printf("  %-15.1f  %-15.1f  %-15.1f  %-15.1f  %-15.1f\n",
           s->marks[0], s->marks[1], s->marks[2], s->marks[3], s->marks[4]);
    printf("  Total     : %.1f / %.0f\n", s->total, (float)(MAX_SUBJECTS * 100));
    printf("  Percentage: %.2f%%\n", s->percentage);
    printf("  Grade     : %c\n", s->grade);
}

void display_all(const Student students[], int count) {
    if (count == 0) {
        printf("\nNo student records found.\n");
        return;
    }

    printf("\n%-5s  %-30s  %-8s  %-10s  %-6s\n",
           "Roll", "Name", "Total", "Percentage", "Grade");
    printf("%-5s  %-30s  %-8s  %-10s  %-6s\n",
           "-----", "------------------------------", "--------", "----------", "------");
    for (int i = 0; i < count; i++) {
        char pct_buf[16];
        snprintf(pct_buf, sizeof(pct_buf), "%.2f%%", students[i].percentage);
        printf("%-5d  %-30s  %-8.1f  %-10s  %c\n",
               students[i].roll_no,
               students[i].name,
               students[i].total,
               pct_buf,
               students[i].grade);
    }
    printf("\nTotal students: %d\n", count);
}

void search_student(const Student students[], int count) {
    if (count == 0) {
        printf("\nNo student records found.\n");
        return;
    }

    int roll;
    printf("\nEnter Roll No to search: ");
    if (scanf("%d", &roll) != 1) {
        printf("Invalid input.\n");
        while (getchar() != '\n');
        return;
    }
    while (getchar() != '\n');

    for (int i = 0; i < count; i++) {
        if (students[i].roll_no == roll) {
            printf("\nRecord found:");
            display_student(&students[i]);
            return;
        }
    }
    printf("\nStudent with Roll No %d not found.\n", roll);
}

void save_to_file(const Student students[], int count) {
    FILE *fp = fopen(DATA_FILE, "wb");
    if (fp == NULL) {
        printf("Error: Could not open file for writing.\n");
        return;
    }
    fwrite(&count, sizeof(int), 1, fp);
    fwrite(students, sizeof(Student), count, fp);
    fclose(fp);
    printf("Records saved to '%s'.\n", DATA_FILE);
}

int load_from_file(Student students[]) {
    FILE *fp = fopen(DATA_FILE, "rb");
    if (fp == NULL) {
        return 0;
    }
    int count = 0;
    if (fread(&count, sizeof(int), 1, fp) != 1 || count < 0 || count > MAX_STUDENTS) {
        fclose(fp);
        return 0;
    }
    if (fread(students, sizeof(Student), count, fp) != (size_t)count) {
        fclose(fp);
        return 0;
    }
    fclose(fp);
    return count;
}
