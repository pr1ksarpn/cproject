CC      = gcc
CFLAGS  = -Wall -Wextra -pedantic -std=c99
TARGET  = student_mgmt
SRCS    = main.c student.c
OBJS    = $(SRCS:.c=.o)

.PHONY: all clean

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c student.h
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	rm -f $(OBJS) $(TARGET) students.dat
