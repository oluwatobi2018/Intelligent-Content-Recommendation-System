provider "azurerm" {
    features {}
}

resource "azurerm_resource_group" "example" {
    name     = "example-resources"
    location = "East US"
}

resource "azurerm_storage_account" "example" {
    name                     = "examplestorageacct"
    resource_group_name      = azurerm_resource_group.example.name
    location                 = azurerm_resource_group.example.location
    account_tier             = "Standard"
    account_replication_type = "LRS"
}

resource "azurerm_storage_container" "example" {
    name                  = "example-container"
    storage_account_name  = azurerm_storage_account.example.name
    container_access_type = "private"
}