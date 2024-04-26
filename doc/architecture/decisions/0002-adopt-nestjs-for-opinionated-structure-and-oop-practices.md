# 2. Adopt NestJS for Opinionated Structure and OOP Practices

Date: 2024-04-26

## Status

Accepted

## Context

This document outlines the decision to adopt NestJS as the primary framework for building the project's backend API. The key considerations driving this decision are:

- Structure and Maintainability: We require a well-organized backend that promotes code reusability and simplifies maintenance.
- Object-Oriented Programming (OOP) Principles: The project should adhere to established OOP practices for clear separation of concerns and improved code organization.
- Development Efficiency: We seek a framework that provides built-in features and tools to accelerate development.

## Decision

We propose using NestJS as the primary framework for developing the project's backend. NestJS offers several advantages that align with our goals:

- Modular Architecture: NestJS enforces a modular structure, promoting code organization and reusability.
- TypeScript Support: Built-in TypeScript support ensures type safety and improves code maintainability.
- OOP-based Design: NestJS encourages the use of controllers, services, and repositories, fostering a clean separation of concerns and adherence to OOP principles.
- Community and Ecosystem: NestJS benefits from a growing community and a rich ecosystem of libraries and tools.

## Alternatives considered

The following alternatives were considered:

- Express.js: A popular Node.js framework offering flexibility but requiring more manual configuration for structure and features.
- Hono: A lightweight framework that emphasizes simplicity and minimalism but lacks the rich feature set of NestJS.

## Consequences

Benefits:

- Improved Maintainability: NestJS's structure promotes well-organized and maintainable code.
- Faster Development: Built-in features and a clear structure can accelerate development.
- Reduced Complexity: Clear separation of concerns leads to simpler and more manageable code.
- Type Safety: TypeScript support helps prevent runtime errors and improves code quality.

Drawbacks:

- Learning Curve: Developers may require time to learn NestJS's specific conventions and features.
- Opinionated Approach: NestJS enforces a particular structure, which may require adapting existing code or workflows.
