terraform {
    backend "s3" {
        bucket         = "your-s3-bucket-name"
        key            = "path/to/your/terraform/state"
        region         = "your-region"
        encrypt        = true
        dynamodb_table = "your-dynamodb-table-name"
    }
}