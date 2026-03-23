#include <stdio.h>
#include <stdlib.h>
#include "student.h"

static void print_header(void) {
    printf("\n=========================================\n");
    printf("   STUDENT RECORD MANAGEMENT SYSTEM      \n");
    printf("=========================================\n");
}

static void print_menu(void) {
    printf("\n---------- MAIN MENU ----------\n");
    printf("  1. Add Student\n");
    printf("  2. Display All Students\n");
    printf("  3. Search Student by Roll No\n");
    printf("  4. Save Records to File\n");
    printf("  5. Exit\n");
    printf("--------------------------------\n");
    printf("Enter your choice: ");
}

int main(void) {
    Student students[MAX_STUDENTS];
    int count = 0;

    print_header();

    /* Attempt to load existing records from file */
    count = load_from_file(students);
    if (count > 0) {
        printf("Loaded %d existing record(s) from file.\n", count);
    }

    int choice;
    while (1) {
        print_menu();
        if (scanf("%d", &choice) != 1) {
            while (getchar() != '\n');
            printf("Invalid input. Please enter a number.\n");
            continue;
        }
        while (getchar() != '\n');

        switch (choice) {
            case 1:
                add_student(students, &count);
                break;
            case 2:
                display_all(students, count);
                break;
            case 3:
                search_student(students, count);
                break;
            case 4:
                save_to_file(students, count);
                break;
            case 5:
                save_to_file(students, count);
                printf("Exiting program. Goodbye!\n");
                exit(0);
            default:
                printf("Invalid choice. Please select 1-5.\n");
        }
    }

    return 0;
}
