#include<stdio.h> //printf
#include<string.h> //memset
#include<stdlib.h> //exit(0);
#include<arpa/inet.h>
#include<sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <unistd.h>
#include <netdb.h>


#define SERVER "127.0.0.1"
#define BUFLEN 512	//Max length of buffer
#define PORT 1234	//The port on which to send data

struct Person
{
    int grades[4];
    char name[];
} A;

int answer;

void die(char *s)
{
    perror(s);
    exit(1);
}

int main(void)
{
    struct sockaddr_in si_other;
    int s, i, slen=sizeof(si_other);
    char buf[BUFLEN];
    char message[BUFLEN];

    if ( (s=socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)) == -1)
    {
        die("socket");
    }

    memset((char *) &si_other, 0, slen);
    si_other.sin_family = AF_INET;
    si_other.sin_port = htons(PORT);

    if (inet_aton(SERVER , &si_other.sin_addr) == 0)
    {
        fprintf(stderr, "inet_aton() failed\n");
        exit(1);
    }

    while (1)
    {
        printf("you : ");
        scanf("%s", A.name);
        printf("Введите оценки для:\n");
        printf("Программирование || Математический анализ | Дифференциальные уравнения | Веб\n");


        //gets(message);
        for (int i = 0; i < 4; ++i)
        {
            scanf("%d", &A.grades[i]);
        };
        //send the message

        if (sendto(s, (char*)&A, sizeof(A), 0, (struct sockaddr *) &si_other, slen)==-1)
        {
            die("sendto()");
        }

        int recv_len = recvfrom(s, (char*)&answer, sizeof(answer), 0, (struct sockaddr *) &si_other, (socklen_t*)&slen);
        scanf("server: ");
        switch (answer) {
            case 2:
                printf("долг по программированию\n");
                break;
            case 3:
                printf("долг по Математический анализ\n");
                break;
            case 4:
                printf("долг по Дифференциальные уравнения\n");
                break;
            case 5:
                printf("долг по Веб\n");
                break;
            case 6:
                printf("нет стипендии из-за программированию\n");
                break;
            case 7:
                printf("нет стипендии из-за Математический анализ\n");
                break;
            case 8:
                printf("нет стипендии из-за Дифференциальные уравнения\n");
                break;
            case 9:
                printf("нет стипендии из-за Веб\n");
                break;
            case 10:
                printf("повышенная стипендия");
                break;
            case 11:
                printf("обычная стипендия\n");
                break;
            case 12:
                printf("нет стипендии\n");
                break;
            case 13:
                printf("все очень плохо\n");
                break;
            case -1:
                printf("Error, server sent wrong data");
                break;
        }

        //receive a reply and print it
        //clear the buffer by filling null, it might have previously received data
        //memset(buf,'\0', BUFLEN);
        //try to receive some data, this is a blocking call
        /*
        if (recvfrom(s, buf, BUFLEN, 0, (struct sockaddr *) &si_other, &slen) == -1)
        {
            die("recvfrom()");
        }
        */
        //puts(buf);
    }
    close(s);
    return 0;
}
