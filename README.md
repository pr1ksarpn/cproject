# Student Record Management System

A console-based **Student Record Management System** written in C, designed as a first-semester programming project.

## Features

- Add student records (roll number, name, marks for 5 subjects)
- Display all students in a formatted table with total, percentage, and grade
- Search for a student by roll number
- Automatically calculates grade based on percentage:
  | Percentage | Grade |
  |------------|-------|
  | ≥ 90%      | A     |
  | ≥ 80%      | B     |
  | ≥ 70%      | C     |
  | ≥ 60%      | D     |
  | ≥ 50%      | E     |
  | < 50%      | F     |
- Save/load records from a binary data file (`students.dat`)

## Subjects Covered

- Mathematics
- Physics
- Chemistry
- English
- Programming

## Build

Requires `gcc` and `make`.

```bash
make
```

## Run

```bash
./student_mgmt
```

## Clean

```bash
make clean
```

## Project Structure

```
cproject/
├── main.c       # Entry point, menu-driven interface
├── student.c    # Implementation of all student functions
├── student.h    # Struct definition and function declarations
├── Makefile     # Build configuration
└── README.md    # Project documentation
```
