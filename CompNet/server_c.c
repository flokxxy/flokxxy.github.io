#include<stdio.h> //printf
#include<string.h> //memset
#include<stdlib.h> //exit(0);
#include<arpa/inet.h>
#include<sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <unistd.h>
#include <netdb.h>

#define BUFLEN 512	//Max length of buffer
#define PORT 1234	//The port on which to listen for incoming data

struct Person
{
    int grades[4];  //оценки
    char name[];  //имя
}B;

int answer;

void die(char *s)
{
    perror(s);
    exit(1);
}

int main(void)
{
    struct sockaddr_in si_me, si_other;

    int s, i,recv_len, slen = sizeof(si_other);
    char buf[BUFLEN];

    //create a UDP socket
    if ((s=socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)) == -1)
    {
        die("socket");
    }

    // zero out the structure
    memset((char *) &si_me, 0, sizeof(si_me));

    si_me.sin_family = AF_INET;
    si_me.sin_port = htons(PORT);
    si_me.sin_addr.s_addr = htonl(INADDR_ANY);

    //bind socket to port
    if( bind(s , (struct sockaddr*)&si_me, sizeof(si_me) ) == -1)
    {
        die("bind");
    }

    //keep listening for data
    while(1)
    {
        printf("Waiting for data...");
        fflush(stdout);
        //try to receive some data, this is a blocking call
        if ((recv_len = recvfrom(s, (char*)&B, sizeof(B), 0, (struct sockaddr *) &si_other, (socklen_t*)&slen)) == -1)
        {
            die("therefrom()");
        }
        //задолжности
        if (B.grades[0] == 2) answer = 2;
        else if (B.grades[1] == 2) answer = 3;
        else if (B.grades[2] == 2) answer = 4;
        else if (B.grades[3] == 2) answer = 5;
        else if (B.grades[0] == 2 && B.grades[1] == 2 && B.grades[2] == 2 && B.grades[3] == 2) answer = 13;
//нет степендии
        else if (B.grades[0] == 3) answer = 6;
        else if (B.grades[1] == 3) answer = 7;
        else if (B.grades[2] == 3) answer = 8;
        else if (B.grades[3] == 3) answer = 9;
        else if (B.grades[0] == 3 && B.grades[1] == 3 && B.grades[2] == 3 && B.grades[3] == 3) answer = 12;
//обычная степендия
        else if (B.grades[0] == 5 && B.grades[1] == 5 && B.grades[2] == 5 && B.grades[3] == 5) answer = 10;
        else  answer = 11;
        //print details of the client/peer and the data received
        printf("Received packet from %s:%d\n", inet_ntoa(si_other.sin_addr), ntohs(si_other.sin_port));
        printf("Data: %d\n" , answer);

        //now reply the client with the same data
        if (sendto(s, (char*)&answer, sizeof(answer), 0, (struct sockaddr*) &si_other, slen) == -1)
        {
            die("sendto()");
        }
    }
    close(s);
    return 0;
}
