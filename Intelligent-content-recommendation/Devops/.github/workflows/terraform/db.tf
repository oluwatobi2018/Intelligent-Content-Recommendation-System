<<<<<<< HEAD
# Terraform configuration for database resources

provider "aws" {
    region = "us-east-1"
}

resource "aws_rds_instance" "db_instance" {
    allocated_storage    = 20
    engine               = "mysql"
    engine_version       = "8.0"
    instance_class       = "db.t3.micro"
    name                 = "mydatabase"
    username             = "admin"
    password             = "password123"
    parameter_group_name = "default.mysql8.0"
    skip_final_snapshot  = true
}

output "db_endpoint" {
    value = aws_rds_instance.db_instance.endpoint
}
=======
# Terraform configuration for database resources

provider "aws" {
    region = "us-east-1"
}

resource "aws_rds_instance" "db_instance" {
    allocated_storage    = 20
    engine               = "mysql"
    engine_version       = "8.0"
    instance_class       = "db.t3.micro"
    name                 = "mydatabase"
    username             = "admin"
    password             = "password123"
    parameter_group_name = "default.mysql8.0"
    skip_final_snapshot  = true
}

output "db_endpoint" {
    value = aws_rds_instance.db_instance.endpoint
}
>>>>>>> 170a03675e530086ecaed8348cf79cad35a7a658
