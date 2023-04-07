# Time-Off Management System
The Time-Off Management System is a web application that allows employees to request time off for vacation and sick leave. Employees can also view their own and their colleagues' time off in a calendar view. The system is designed to help managers and team members manage their time off more efficiently.

## Features

### Employees can:
Request time off for vacation and sick leave
View their upcoming time off requests
View their colleagues' time off in a calendar view

### Managers can:
View time off requests for their team
View their team's time off in a calendar view

### Administrators can:
Add or remove employees
Configure system settings such as holidays and workdays

## Technologies Used
The Time-Off Management System is built using the following technologies:
*ASP.NET Core 6.0
*C#
*Entity Framework Core
*Microsoft SQL Server
*HTML/CSS/JavaScript
*Tailwind CSS


## Getting Started
To get started with the Time-Off Management System, follow these steps:

Clone the repository:

```bash
git clone https://github.com/TheBrianSiu/Time-Off-Management-System.git
```
## Install the dependencies:

```bash
dotnet restore
```

## Create the database:

Install Microsoft SQL Server on your machine if you haven't already.
Restore the database from the master.bak file located in the backend folder. You can do this using SQL Server Management Studio or any other SQL Server client of your choice.
Open the solution file Tsystem.sln located in the Backend folder in Visual Studio.
Set the Tsystem.WebApi project as the startup project.
In Visual Studio, open the Package Manager Console by going to Tools > NuGet Package Manager > Package Manager Console.
Run the following command to create the initial database schema:

```bash
Update-Database -Context TsystemDbContext
```

This will create the necessary tables and relationships in the database.
Run the application by pressing F5 or clicking the "Run" button in Visual Studio.
In your web browser, navigate to http://localhost:5000 to view the application.


## License
The Time-Off Management System is licensed under the MIT License. See LICENSE for more information.

## Contact
If you have any questions or comments about the Time-Off Management System, please feel free to contact me.
