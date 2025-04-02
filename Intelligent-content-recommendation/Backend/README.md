# Backend - Intelligent Content Recommendation System

This directory contains the backend implementation of the Intelligent Content Recommendation System.

## Features
- RESTful API for content recommendation.
- Integration with machine learning models.
- Database management for user and content data.
- Authentication and authorization.

## Prerequisites
- Python 3.8 or higher
- Virtual environment tool (e.g., `venv` or `virtualenv`)
- Database (e.g., PostgreSQL, MySQL)

## Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/Intelligent-content-recommendation.git
    cd Intelligent-content-recommendation/Backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure the environment variables:
    - Create a `.env` file in the root directory.
    - Add the required variables (e.g., database credentials, API keys).

5. Run database migrations:
    ```bash
    python manage.py migrate
    ```

6. Start the development server:
    ```bash
    python manage.py runserver
    ```

## API Endpoints
| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/api/recommend`  | Get content recommendations.   |
| POST   | `/api/login`      | User login.                    |
| POST   | `/api/register`   | User registration.             |

## Testing
Run the test suite using:
```bash
python manage.py test
```

## Contributing
Contributions are welcome! Please follow the [contribution guidelines](../CONTRIBUTING.md).

## License
This project is licensed under the [MIT License](../LICENSE).