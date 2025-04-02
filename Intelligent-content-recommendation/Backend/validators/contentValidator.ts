import { body, ValidationChain } from 'express-validator';

export const validateContent: ValidationChain[] = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ max: 100 })
        .withMessage('Title must not exceed 100 characters'),
    
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters'),
    
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isString()
        .withMessage('Category must be a string'),
    
    body('author')
        .notEmpty()
        .withMessage('Author is required')
        .isString()
        .withMessage('Author must be a string'),
    
    body('publishedDate')
        .optional()
        .isISO8601()
        .withMessage('Published date must be a valid ISO 8601 date'),
];
