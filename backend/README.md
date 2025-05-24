## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

This would outline any architecutral and design decisions made for the contacts managment backend application. 

Each decision was made intentionally. I considered factors like 
* maintainability
* scalability
* performance

I attempted to adhere to the NestJs Best practices, and the clean architecture prinicples.

---
### problem analysis
- managing the contact data from the random user API, where each of the API call returns the different users. This makes it impossible to maintain consistent data for fav

To solve this (attempt 1):
Seed-Once Architecture
- load contact data once at the application startup and maintain it in persistent storage

reasoning:
- data is consistent. each contant can maintain a stable identity across the requests
- the performance is better, as it eliminates repeated external API calls
- the user experience is better, as it enables the reliable favourite functionality
- it is more reliable as it reduces the dependency on the external service availability

Possible trade offs:
- while you have predictable data, it might stop you from getting new data
- while you have a fast response,  it might stop you from having real time updats



### Design:

Module structure design
- have a single contacts module (no fav module)

reason:
- domain cohesion: we want to store the contacts, and possibly mark them as the fav
- fav are a property of the contacts, and they are not an independent entity
- not biz logic exists w/o their parent contact
- single bound context = single module (following the domain driven design principle)



Alternative considered 
- a separate fav module. tho rejected it, as it would increase the complexity of it, by creating artificial separation. this would seem to increase complexity without business reason

### API Design


### Storage Architecture

reason:
dep inversion principle
- biz logic now depends on storage abstraction (there is no concrete implementation)
- allows you to switch btw storage strategies 

planning it to change via
- stage 1: in memory (so i can do it faster)
- stage 2: file based for persistance
- stage 3: database


### external api integration
- service abstraction with single initialisation 

design
- isolate the external dependency. so the external api call is contained in a dedicated service. the business logic is unaware of the exteranl api strucutre


### DTO 
- each DTO has it's purpose. There is input validation at the DTO level using the class validator.
- the biz rules are enforced before reaching the service layer


### Controller Design


### Service Layer Architecture


### Error Handling

### Configuration Management

### Overall Architecture + Best Practices used

### Future Dev Considerations