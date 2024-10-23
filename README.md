# TeethTrack - Dental Clinic Management System

TeethTrack is a modern dental clinic management system designed to facilitate the management of patient records, dentist schedules, billing, and appointments. It provides an intuitive interface for both dentists and patients, offering a seamless clinic experience.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Architecture](#project-architecture)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [References](#references)

## Project Overview
TeethTrack is built using Python’s Flask framework for the backend and includes a SQLALCHEMY database. It enables patients to book appointments with dentists, dentists to manage appointments, and provides a billing system. Authentication is handled via JWT, and the frontend interacts with the backend API.
# TeethTrack

## Description
TeethTrack is a web application designed to manage dental clinic operations efficiently.

## Screenshots

### Homepage
![Homepage](Photos/homepage.webp)

### User Login
![Login Page](Photos/login.webp)

### Registration Page
![Registration Page](Photos/register.webp)

### Patient Dashboard
![Patient Dashboard](Photos/patient_dashboard.webp)

### Dentist Dashboard
![Dentist Dashboard](Photos/dentist_dashboard.webp)

## Features
- **User Authentication**: JWT-based authentication for both patients and dentists.
- **Appointment Management**: Book, update, and cancel appointments.
- **Patient Record Management**: Store and retrieve patient medical records.
- **Billing System**: Manage patient invoices and payment tracking.
- **Search Functionality**: Search for patients and appointments by various criteria.
- **User Types**: Separate dashboards for patients and dentists.

## Project Architecture

```
TeethTrack/
│
├── back_end/                # Backend logic
│   ├── app/
│   │   ├── models/          # Database models
│   │   │   ├── appointment_model.py
│   │   │   ├── billing_model.py
│   │   │   ├── patient_model.py
│   │   │   └── user_model.py
│   │   ├── routes/          # API routes
│   │   │   ├── auth.py
│   │   │   ├── billing_route.py
│   │   │   ├── dentist_route.py
│   │   │   ├── patient_route.py
│   │   │   ├── refresh_token.py
│   │   │   └── search_route.py
│   │   ├── static/          # Static files (CSS, JS, images)
│   │   │   ├── images/
│   │   │   ├── js/
│   │   │   └── style.css
│   │   ├── templates/       # HTML templates
│   │   ├── config.py        # Configuration file
│   │   └── __init__.py      # App initialization
│   ├── migrations/          # Database migrations
│   ├── requirements.txt     # Python dependencies
│   ├── run.py               # Entry point for running the app
│   └── .gitignore           # Git ignore file
│
├── README.md                # Project documentation
└── LICENSE                  # License file
```

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- SQLALCHEMY
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/Mukeli3/TeethTrack.git
cd TeethTrack/back_end
```

### 3. Set Up Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the `back_end/app/` directory with the following environment variables:

```
SECRET_KEY=your-secret-key
SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost/teethtrack_db
JWT_SECRET_KEY=your-jwt-secret-key
```

### 6. Set Up the Database

Make sure you have PostgreSQL running on your machine. Create a database called `teethtrack_db` and apply the migrations:

```bash
flask db init
flask db migrate
flask db upgrade
```

### 7. Run the Application

To run the backend locally:

```bash
cd back_end
python3 run.py
```

The server will start on `http://127.0.0.1:5000/`.

## Usage

- **Frontend**: Open the `index.html` located in the `front_end/` directory in your browser.
- **API**: You can test the backend API via tools like Postman or directly through your frontend interface.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## References

- **Daniel Litunya**  
  Full Stack Developer 
  GitHub: [DANIELLITUNYA-CODER](https://github.com/DANIELLITUNYA-CODER)

- **Mukeli Kavivya**  
  Full stack Developer    
  GitHub: [Mukeli3](https://github.com/Mukeli3)
