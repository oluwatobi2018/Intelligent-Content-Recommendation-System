provider "aws" {
    region = var.aws_region
}

module "eks" {
    source          = "terraform-aws-modules/eks/aws"
    cluster_name    = var.cluster_name
    cluster_version = var.cluster_version
    subnets         = var.subnets
    vpc_id          = var.vpc_id

    node_groups = {
        eks_nodes = {
            desired_capacity = var.desired_capacity
            max_capacity     = var.max_capacity
            min_capacity     = var.min_capacity

            instance_type = var.instance_type
            key_name      = var.key_name
        }
    }

    tags = var.tags
}

output "cluster_endpoint" {
    value = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
    value = module.eks.cluster_security_group_id
}