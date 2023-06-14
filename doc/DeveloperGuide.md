## Guide for NestJS GraphQL provider
Official GraphQL documentation: https://graphql.org/learn/queries/

#### What is GraphQL
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. 
GraphQL provides a complete and understandable description of the data in your API, gives clients 
the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, 
and enables powerful developer tools.

#### How to use GraphQL in NestJS ?
NestJS provides a GraphQL module that allows you to easily integrate GraphQL in your application.

#### What is query and mutation ?
GraphQL queries are used to fetch data, while mutations are used for data modifications.

Example of queries and mutations for this project:

##### Users: (http://localhost:3000/graphql) 
- Create user (Required jwt token authorization)
```graphql
mutation {
    createUser (
        createUserInput: {
            firstName: "Marcos"
            lastName: "Silva"
            email: "dont-spam-me@gmail.com"
            role: "ADMIN"
        }
    ) {
        identificationNumber
        firstName
        lastName
        email
        role
    }
}
```
- Update user (Required jwt token authorization)
```graphql
mutation {
    updateUser (
        updateUserInput: {
            identificationNumber: "123456789"
            firstName: "Marcos"
            lastName: "Silva"
            email: ""
            role: "USER"
        }
    ) {
        identificationNumber
        firstName
        lastName
        email
        role
    }
}
```
- Get user by identification number
```graphql
query {
    user (
        identificationNumber: "123456789"
    ) {
        identificationNumber
        firstName
        lastName
        email
        role
    }
}
```
- Get all users
```graphql
query {
    users {
        identificationNumber
        firstName
        lastName
        email
        role
    }
}
```
- Delete user
```graphql
mutation {
    removeUser (
        identificationNumber: "123456789"
    ) {
        identificationNumber
        firstName
        lastName
        email
        role
    }
}
```

#### Posts: (http://localhost:3000/graphql)
- Create post
```graphql
mutation {
    createPost (
        createPostRequest: {
            title: "My first post"
            content: "This is my first post"
            tags: ["first", "post"]
            author: "123456789"
        }
    )
    {
        id
        title
        content
        tags
        author
    }
}

```
- Update post
```graphql
mutation {
    updatePost (
        updatePostRequest: {
            id: "5f0b3b3b9b0b3b2b3b3b3b3b"
            title: "My first post"
            content: "This is my first post"
            tags: ["first", "post"]
        }
    )
    {
        id
        title
        content
        tags
        author
    }
}
```
- Get post by id
```graphql
query {
    post (
        id: "5f0b3b3b9b0b3b2b3b3b3b3b"
    ) {
        id
        title
        content
        tags
        author
    }
}
```
- Get all posts
```graphql
query {
    posts {
        id
        title
        content
        tags
        author
    }
}
```
- Delete post
```graphql
mutation {
    removePost (
        id: "5f0b3b3b9b0b3b2b3b3b3b3b"
    ) {
        id
        title
        content
        tags
        author
    }
}
```