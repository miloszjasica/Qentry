# 1. About QentRy

QentRy is a event management and cashless payment system designed for biger and smaller events. The platform replaces physical cash and tokens with a secure, QR virtual token system.
The main goal of the project is to simplify payment logistics and access control while providing organizers with powerful management tools and participants with a convenient digital wallet.

# 2. Architecture

QentRy follows a client–server architecture built with technologies such as:

- Backend: Django + Django REST Framework

- PostgreSQL database

- Web Application: React

- Mobile Application: .NET MAUI

# 3. The most important features

- **Event & Attraction Management**

  - Organizers can create events and define service points ("Attractions") with assigned token costs.

- **Token-Based Payment System**

  - Each participant receives a unique QR code

  - QR code acts as a digital ID and wallet

  - Staff scan QR codes to:

    - Deduct tokens for attractions

    - Recharge user balances

 - **Roles & Permissions**

  *QentRy has Two-level access control system:*

  - Application Roles:

    - Administrator / Organizer

    - Participant

  - Event Roles:

    - Staff

    - Token Taker

    - Token Seller

    - Participant

- **Geolocation & Search**

  - Event suggestions based on user location

  - Filtering by category, date, and name
 
# 4. Demo

[Watch web application demo](demo/demo_web.mp4)
[Watch mobile application demo](demo/demo_mobile.mp4)

# 5. How to run
## Clone
```bash
git clone https://github.com/miloszjasica/Qentry.git
```
## Web app
### Build and run the application with Docker
```bash
docker compose build docker compose up
```
### Create database migrations
```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```
### (Optional) Create an admin account
```bash
docker compose exec backend python manage.py createsuperuser
```
### Collect static files
```bash
docker compose exec backend python manage.py collectstatic
```
## Mobile app
### Environment Setup
- During installation VS, select the workload:
  - .NET Multi-platform App UI development
- Make sure that .NET SDK 9.0 is installed

```bash
dotnet --version
```
### Opening the Project

- Open the .sln solution file in Visual Studio 2022
- Restore dependencies:
```bash
dotnet restore
```
### Running the Application

- Select the target platform:

  - Android Emulator / Android Device

  - iOS Simulator / iPhone

  - Windows Machine

- Run the application:

```bash
dotnet build
dotnet run
```

Backend Connection Configuration

- In the application configuration files (in the services folder), set the API address of the web application (Django backend).
