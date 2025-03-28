# Terraform configuration for CI/CD pipeline

terraform {
    required_version = ">= 1.0.0"
    required_providers {
        github = {
            source  = "integrations/github"
            version = "~> 5.0"
        }
    }
}

provider "github" {
    token = var.github_token
    owner = var.github_owner
}

resource "github_repository" "cicd_repo" {
    name        = "intelligent-content-recommendation"
    description = "Repository for Intelligent Content Recommendation CI/CD pipeline"
    visibility  = "private"
}

resource "github_actions_secret" "terraform_token" {
    repository = github_repository.cicd_repo.name
    secret_name = "TF_API_TOKEN"
    plaintext_value = var.terraform_api_token
}

resource "github_actions_secret" "aws_credentials" {
    repository = github_repository.cicd_repo.name
    secret_name = "AWS_CREDENTIALS"
    plaintext_value = var.aws_credentials
}

variable "github_token" {}
variable "github_owner" {}
variable "terraform_api_token" {}
variable "aws_credentials" {}