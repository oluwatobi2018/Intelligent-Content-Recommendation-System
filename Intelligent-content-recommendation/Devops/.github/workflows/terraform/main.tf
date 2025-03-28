terraform {
    required_version = ">= 1.0.0"
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 4.0"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
    bucket = "example-terraform-bucket"
    acl    = "private"

    tags = {
        Name        = "example-terraform-bucket"
        Environment = "Dev"
    }
}