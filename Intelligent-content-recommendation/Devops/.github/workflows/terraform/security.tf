# security.tf

resource "aws_iam_policy" "terraform_security_policy" {
    name        = "TerraformSecurityPolicy"
    description = "IAM policy for securing Terraform operations"

    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Action   = [
                    "s3:GetObject",
                    "s3:PutObject",
                    "s3:ListBucket"
                ],
                Effect   = "Allow",
                Resource = [
                    "arn:aws:s3:::your-terraform-state-bucket",
                    "arn:aws:s3:::your-terraform-state-bucket/*"
                ]
            },
            {
                Action   = [
                    "dynamodb:PutItem",
                    "dynamodb:GetItem",
                    "dynamodb:DeleteItem",
                    "dynamodb:UpdateItem"
                ],
                Effect   = "Allow",
                Resource = "arn:aws:dynamodb:your-region:your-account-id:table/your-lock-table"
            }
        ]
    })
}

resource "aws_iam_role" "terraform_execution_role" {
    name               = "TerraformExecutionRole"
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect    = "Allow",
                Principal = {
                    Service = "ec2.amazonaws.com"
                },
                Action    = "sts:AssumeRole"
            }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "attach_security_policy" {
    role       = aws_iam_role.terraform_execution_role.name
    policy_arn = aws_iam_policy.terraform_security_policy.arn
}