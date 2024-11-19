<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


# Clinic Appointment Management System

## Project Description
The **Clinic Appointment Management System** is a solution designed to address the challenges associated with managing appointments in a private clinic. This system allows:

- Preventing scheduling conflicts between patient and doctor appointments.
- Eliminating duplicate appointments and errors associated with manual scheduling.
- Facilitating easy access to patients' appointment history.
- Providing a clear and centralized view of doctors' availability.

The system is designed to be user-friendly, flexible, and prepared for future expansions.

## Key Features

### 1. Conflict Prevention:
- Automatic availability check before confirming an appointment.

### 2. User Management:
- Different roles for doctors, patients, and administrators.

### 3. Appointment History:
- Fast and secure access to each patient's appointment records.

### 4. Availability Visualization:
- Interactive calendars for doctors and patients.

### 5. Efficient Rescheduling:
- Automated management in case of cancellations or unexpected changes.

## Technical Requirements

- **Backend:** NestJS with TypeScript and MySQL as the database.
- **Authentication:** JWT-based login system.

## Installation

1. Clone this repository:

   ```bash
   https://github.com/Lordnesk/Assesment-AndresDavidGonzalezVanegas.git
   ```

2. Install dependencies:

  ```bash
    @nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.3.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/mapped-types": "^2.0.6",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.2",
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "class-validator": "^0.14.1",
    "mysql2": "^3.11.4",
    "passport-local": "^1.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.20",
    "typeorm-extension": "^3.6.3"
  ```

  ## Usage

### Patients:
- Register, log in, and schedule appointments with available doctors.

### Doctors:
- View their schedule, manage availability, and access appointment history.

### Administrators:
- Manage users, control the system, and resolve conflicts.

## UML Diagrams

The following UML diagrams are included:

### Use Case Diagram:
- Shows the interactions between roles and the system.

### Class Diagram:
- Details the system's structure at the object level.

### Sequence Diagram:
- Illustrates the interaction flow when scheduling an appointment.

---

### 1. Use Case Diagram
**Description:** This diagram details the main functionalities accessible by different roles in the system (patients, doctors, and administrators).

**Actors:**
- Patient
- Doctor
- Administrator

**Use Cases:**
- Schedule Appointment
- Check Availability
- Manage Appointment History
- Modify or Cancel Appointment
- View Doctor's Schedule

### 2. Class Diagram
**Description:** Defines the main entities and their relationships.

**Main Entities:**
- User (Patient, Doctor, Administrator)
- Appointment
- Schedule
- Appointment History

**Relationships:**
- A user can be either a doctor or a patient.
- A doctor has a schedule.
- A patient has an appointment history.
- An appointment belongs to both a doctor and a patient.

### 3. Sequence Diagram: Schedule Appointment
**Description:** Shows the message flow when a patient schedules an appointment.

**Main Steps:**
1. The patient checks availability.
2. The system verifies the doctor's schedule.
3. If available, the appointment is created.
4. Both the patient and the doctor are notified.

 