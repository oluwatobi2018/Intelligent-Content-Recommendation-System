# Terraform variables file

# Define the AWS region
aws_region = "us-east-1"

# Define the environment (e.g., dev, staging, prod)
environment = "dev"

# Define the S3 bucket for Terraform state
terraform_state_bucket = "my-terraform-state-bucket"

# Define the DynamoDB table for state locking
terraform_state_lock_table = "terraform-state-lock"

# Define the VPC ID
vpc_id = "vpc-12345678"

# Define the public subnet IDs
public_subnet_ids = ["subnet-12345678", "subnet-87654321"]

# Define the private subnet IDs
private_subnet_ids = ["subnet-23456789", "subnet-98765432"]