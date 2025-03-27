import os
import shutil
import subprocess
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

# Load configuration from environment variables
MODEL_DIR = os.environ.get("MODEL_DIR", "../ai-engine/models")
DEPLOY_DIR = os.environ.get("DEPLOY_DIR", "../deploy")
DOCKERFILE_PATH = os.environ.get("DOCKERFILE_PATH", os.path.join(DEPLOY_DIR, "Dockerfile"))
CLOUD_BUCKET = os.environ.get("CLOUD_BUCKET", "your-cloud-bucket-name")

# Ensure the deploy directory exists
os.makedirs(DEPLOY_DIR, exist_ok=True)

def package_model():
    """
    Package the trained AI model for deployment by creating a zip archive of the model directory.
    
    Returns:
        bool: True if packaging was successful, False otherwise.
    """
    if not os.path.exists(MODEL_DIR):
        logging.error("Model directory does not exist. Train the model first!")
        return False

    try:
        archive_path = shutil.make_archive(f"{DEPLOY_DIR}/model", 'zip', MODEL_DIR)
        logging.info(f"Model packaged successfully at {archive_path}")
        return True
    except Exception as e:
        logging.error(f"Failed to package model: {e}")
        return False

def upload_to_cloud():
    """
    Upload the model package to a cloud storage service.
    
    Returns:
        bool: True if upload was successful, False otherwise.
    """
    model_file = f"{DEPLOY_DIR}/model.zip"
    
    if not os.path.exists(model_file):
        logging.error("Model package not found. Ensure packaging is successful.")
        return False

    try:
        logging.info(f"Uploading model to {CLOUD_BUCKET} ...")
        cloud_command = f"gsutil cp {model_file} gs://{CLOUD_BUCKET}/model.zip"
        subprocess.run(cloud_command, shell=True, check=True)
        logging.info("Model uploaded to cloud successfully.")
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"Cloud upload failed: {e}")
        return False

def deploy_with_docker():
    """
    Deploy the AI model as a Docker container.
    
    Returns:
        bool: True if deployment was successful, False otherwise.
    """
    if not os.path.exists(DOCKERFILE_PATH):
        logging.error("Dockerfile not found. Ensure it exists in the deploy directory.")
        return False

    try:
        logging.info("Building Docker image...")
        subprocess.run("docker build -t ai-content-recommender ../deploy", shell=True, check=True)
    except subprocess.CalledProcessError as e:
        logging.error(f"Docker image build failed: {e}")
        return False

    try:
        logging.info("Running Docker container...")
        subprocess.run("docker run -d -p 8080:8080 ai-content-recommender", shell=True, check=True)
        logging.info("Deployment successful! Service running on port 8080.")
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"Docker container run failed: {e}")
        return False

def main():
    """
    Main deployment pipeline:
      - Package the model.
      - Upload the package to the cloud.
      - Deploy the model via Docker.
    """
    logging.info("Starting deployment process...")

    if package_model() and upload_to_cloud():
        deploy_with_docker()
    
    logging.info("Deployment process completed!")

if __name__ == "__main__":
    main()
