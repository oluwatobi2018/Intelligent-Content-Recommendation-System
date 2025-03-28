variable "region" {
    description = "The region where resources will be created"
    type        = string
    default     = "us-east-1"
}

variable "environment" {
    description = "The environment for deployment (e.g., dev, staging, prod)"
    type        = string
    default     = "dev"
}

variable "project_name" {
    description = "The name of the project"
    type        = string
}

variable "tags" {
    description = "A map of tags to apply to resources"
    type        = map(string)
    default     = {
        "Environment" = "dev"
        "Project"     = "example-project"
    }
}