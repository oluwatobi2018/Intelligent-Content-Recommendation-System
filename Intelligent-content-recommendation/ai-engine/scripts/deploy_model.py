import os
import shutil
import subprocess

# Define paths
MODEL_DIR = "../ai-engine/models"
DEPLOY_DIR = "../deploy"
DOCKERFILE_PATH = "../deploy/Dockerfile"
CLOUD_BUCKET = "your-cloud-bucket-name"

# Ensure the deploy directory exists
os.makedirs(DEPLOY_DIR, exist_ok=True)

def package_model():
    """ Package the trained AI model for deployment """
    if not os.path.exists(MODEL_DIR):
        print("❌ Model directory does not exist. Train the model first!")
        return False

    shutil.make_archive(f"{DEPLOY_DIR}/model", 'zip', MODEL_DIR)
    print("✅ Model packaged successfully.")
    return True

def upload_to_cloud():
    """ Upload the model package to a cloud storage service """
    model_file = f"{DEPLOY_DIR}/model.zip"
    
    if not os.path.exists(model_file):
        print("❌ Model package not found. Ensure packaging is successful.")
        return False

    # Simulating cloud upload (replace with actual command)
    print(f"🚀 Uploading model to {CLOUD_BUCKET} ...")
    cloud_command = f"gsutil cp {model_file} gs://{CLOUD_BUCKET}/model.zip"
    subprocess.run(cloud_command, shell=True, check=True)
    
    print("✅ Model uploaded to cloud successfully.")
    return True

def deploy_with_docker():
    """ Deploy the AI model as a Docker container """
    if not os.path.exists(DOCKERFILE_PATH):
        print("❌ Dockerfile not found. Ensure it exists in the deploy directory.")
        return False

    print("🐳 Building Docker image...")
    subprocess.run("docker build -t ai-content-recommender ../deploy", shell=True, check=True)

    print("🚀 Running Docker container...")
    subprocess.run("docker run -d -p 8080:8080 ai-content-recommender", shell=True, check=True)
    
    print("✅ Deployment successful! Service running on port 8080.")
    return True

def main():
    """ Main deployment pipeline """
    print("🚀 Starting deployment process...")

    if package_model() and upload_to_cloud():
        deploy_with_docker()
    
    print("🎯 Deployment process completed!")

if __name__ == "__main__":
    main()
