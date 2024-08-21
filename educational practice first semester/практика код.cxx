#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <iomanip>
#include <fstream>
using namespace std;

double Function(double x, double t)
{
    return	1 / (1 + cos(t + x));
}

vector <double> arr;
vector <double> ix;

int main()
{
    ofstream f;
    f.open("file.txt");
    double Integral;
    double a; cout << "Enter the lower limit of integration (a): "; cin >> a;
    double b; cout << "Enter the upper limit of integration (b): "; cin >> b;
    double c; cout << "Enter the lower limit for x (c): "; cin >> c;
    double d; cout << "Enter the upper limit for x (d): "; cin >> d;
    double n; cout << "Enter the number of splits (n): "; cin >> n;

    double xi = 0;
    double h = (b - a) / n;
    for (int i = 0; i <= 20; i++)
    {
        xi = c + i * (d - c) / 20;
        Integral = 0.0;
        for (int j = 1; j <= n; j++)
            Integral += (Function(xi, h * i) + Function(xi, h * (i + 1))) * h / 2;
        arr.push_back(Integral);
        ix.push_back(xi);
    }
    double xi1;
    vector <double> tx;
    for (int i = 0; i <= 20; i++)
    {
        xi = c + i * (d - c) / 20;
        xi1 = (0.7854+xi/2);
        double t = (2 / (cos(xi1)));
        tx.push_back(t);
    }

    vector <double> nevy;
    double z = 0;
    for (int i = 0; i <= 20; i++)
    {
        z = abs(tx[i] - arr[i]);
        nevy.push_back(z);
    }
    double max_nevy = *max_element(nevy.begin(), nevy.end());

    cout << endl;
    cout << setw(30) << "Accurate"<<setw(24)<<"Approximate"<< setw(22) << "Discrepancy" << endl;
    f << "x" << setw(30) << "Accurate" << setw(24) << "Approximate" << endl;
    for (int i = 0; i <= 20; i++)
    {
        cout << i << "  " << "x=" << ix[i] << setw(20) << tx[i] << setw(20) << arr[i] << setw(20) << nevy[i] << endl;
        f << ix[i] << setw(20) << tx[i] << setw(20) << arr[i] << endl;
    }
    cout << endl << "Maximum discrepancy: " << max_nevy;
    f.close();
    return 0;
}
