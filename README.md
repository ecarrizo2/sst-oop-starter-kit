# SST OOP Starter Kit
The SST OOP Starter Kit is a boilerplate designed for building enterprise-grade serverless applications using the Serverless Stack Toolkit (SST). It incorporates Object-Oriented Programming (OOP) principles, lightweight dependency injection with TSyringe, and out-of-the-box enterprise configurations like CI/CD workflows, pre-configured Git hooks, and more.

This project aims to provide developers with a collaborative, production-ready foundation for serverless application development.

## 🔥 Key Features

### Core Frameworks & Tools

- **SST**: Serverless Stack Toolkit (SST) is a framework that makes it easy to build serverless applications. It's designed to work with the AWS CDK and AWS SAM.
- **TSyringe**: Automatic Dependency Injection using TSyringe, a lightweight dependency injection container for TypeScript/JavaScript.
- **Prettier**: Code formatting using Prettier.
- **ESLint**: Linting using ESLint.
- **Jest**: Testing using Jest.

### Built-in Enterprise Configurations

- **GitHub Actions**: CI/CD using GitHub Actions for PR verification and deployment of temporary staging environments for pull requests.
- **(Git Hooks)**: Pre-commit hooks for linting and formatting code before committing.


...You only have to fork this repository, run `sst dev` and start coding!


## For Reviewers and Developers
If you are looking to review/develop/fork this project, please refer to the following documentation:

- [Running the project locally](./docs/LOCAL_DEVELOPMENT.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Git Hooks Documentation](./docs/GIT_HOOKS.md)
- [Conventional Commits](./docs/CONVENTIONAL_COMMITS.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [CI/CD](./docs/CI&CD.md)



# SST OOP Starter Kit

The **SST OOP Starter Kit** is a boilerplate designed for building **enterprise-grade serverless applications** 
using the **Serverless Stack Toolkit (SST)**. It incorporates **Object-Oriented Programming (OOP)** principles,
lightweight **dependency injection with TSyringe**, and out-of-the-box enterprise configurations like CI/CD workflows, 
pre-configured Git hooks, and more.

This project aims to provide developers with a collaborative, production-ready foundation for serverless application 
development.
---

## 🔥 Key Features

### Core Frameworks & Tools
- **SST**  
  Build and manage serverless applications seamlessly using the **Serverless Stack Toolkit**, powered by AWS CDK.

- **TSyringe**  
  Use **automatic dependency injection** via TSyringe for clean, testable, and modular code without relying on a heavyweight framework like NestJS.

- **Prettier & ESLint**  
  Ensure consistent code quality with **code formatting** and **linting** using Prettier and ESLint.

- **Jest**  
  Write and run tests using Jest for reliable, maintainable code.

- **Class Transformer and Class Validator**  
  Use Class Transformer and Class Validator libraries to transform plain objects into instances and perform State validations

### Built-in Enterprise Configurations
- **CI/CD with GitHub Actions Examples**  
  Pre-configured workflows for:
    - Pull Request verification.
    - Automatic deployment of **temporary staging environments**(PR Environments) for PRs.
    - Seamless automated staging deployment.
    - Automated semantic versioning and Github Releases generation

- **Git Hooks Examples**  
  - pre-commit Hook:
    - Automatic Formatting using Prettier to ensure consistent code formatting.
    - Code linting using ESLint.
    
  - commit-message Hook:
    - Enforce **Conventional Commits** for clear, semantic versioning and changelog generation.
    
  - pre-push Hook:
    - Run tests before pushing to the remote repository.


- **Conventional Commits**  
  Enforced commit message standards for clear, semantic versioning and changelog generation.

---

## 🌟 Use Cases
This starter kit is a POC for various tools and configurations aimed at solving real-world problems, including:
- Building serverless applications with **infrastructure-as-code** capabilities for APIs, queues, SSL, DNS, and more.
- Providing an architecture to integrate **image analysis** and **speech generation**, which can power accessibility features in larger applications.

---

## 🚀 Getting Started

To begin using the SST OOP Starter Kit, follow the detailed guides below:

1. [Running the Project Locally](./docs/LOCAL_DEVELOPMENT.md)  
   Learn how to set up your local environment and start building.

2. [Project Structure](./docs/PROJECT_STRUCTURE.md)  
   Understand how the project is organized.

3. [Git Hooks Guide](./docs/GIT_HOOKS.md)  
   Set up and leverage Git hooks for your workflow.

4. [Conventional Commits](./docs/CONVENTIONAL_COMMITS.md)  
   Follow the commit guidelines to ensure consistency.

5. [CI/CD Workflow](./docs/CI&CD.md)  
   Explore the pre-configured CI/CD pipeline using GitHub Actions.

6. [Code of Conduct](./CODE_OF_CONDUCT.md)  
   Collaborate respectfully by following the project's code of conduct.

---

## 🛠 Technical Highlights

- **Infrastructure as Code (IaC)**  
  SST and Ion are used to define and manage cloud infrastructure programmatically.

- **Dependency Injection**  
  TSyringe provides lightweight dependency injection for building clean and maintainable codebases.

- **Continuous Integration & Deployment**  
  Automate testing, staging, and deployment for reliable production readiness.

---

## 🧑‍💻 Contributing

We welcome contributions to this project! If you're interested in contributing:
1. Fork the repository.
2. Refer to the [local development guide](./docs/LOCAL_DEVELOPMENT.md) to set up your environment.
3. Follow the project's [Code of Conduct](./CODE_OF_CONDUCT.md) and guidelines.

---

## 📚 Documentation

This project comes with comprehensive documentation to help you get started:

- [Local Development](./docs/LOCAL_DEVELOPMENT.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Git Hooks](./docs/GIT_HOOKS.md)
- [Conventional Commits](./docs/CONVENTIONAL_COMMITS.md)
- [CI/CD](./docs/CI&CD.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

---

## 🏆 Why This Starter Kit?

This project serves as the foundation for building scalable, serverless solutions while incorporating modern development practices. By using this kit, you can:
- Accelerate project setup for serverless architectures.
- Maintain clean, modular code with TSyringe.
- Streamline your development lifecycle with built-in CI/CD pipelines.

---

## 📢 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

















This project is meant to be a POC for the following tools:

- Using SST/Ion for Infrastructure as a code and Resource management such as API and Queues Routing, SSL, DNS, etc
- Using TSyringe for Dependency Injection without having to use a framework like NestJS
- Using GitHub Actions for CI/CD

This project in particular solves a problem for some of my other side projects
which is to provide a way to analyse images and create speech from these analysed images description,
the goal is to be using the generated data to add accessibility features to my other projects.

