# TASK 9 : Complete E-commerce Backend System

## System Story: 
- An entrepreneur wants to launch an online store selling various products
- Customers should be able to browse products with filters and search functionality
- Users need to create accounts to save their information and order history
- Shopping cart functionality with ability to add/remove items before checkout
- Secure payment processing with order confirmation emails
- Admin users should manage products, orders, and view sales analytics
- Customers should be able to upload product reviews with images
- Inventory management with stock tracking and low stock alerts
- Password reset functionality via email with secure token validation

## Security Implementation Requirements:
- Helmet.js for setting secure HTTP headers
- CORS configuration for cross-origin requests
- Rate limiting to prevent brute force attacks
- XSS protection for input sanitization
- Mongoose schema validation for data integrity
- Environment variables for sensitive data
- Secure cookie configuration for JWT tokens
- Token expiration for password reset (1 hour)
- Token deletion after use

## API Endpoints :
## Authentication Endpoints
POST   /api/auth/register     - Register new user (with argon2 password hashing)
POST   /api/auth/login        - Login user (set JWT in HTTP-only cookie)
POST   /api/auth/logout       - Logout user (clear cookie)
POST   /api/auth/refresh      - Refresh access token
GET    /api/auth/verify-email/:token - Verify email token
POST   /api/auth/forgot-password - Send password reset email (store token in Token model)
POST   /api/auth/reset-password/:token - Verify token and reset password
PUT    /api/auth/update-password - Update password (authenticated users)

## Product Endpoints
GET    /api/products          - Get all products (with pagination, filters, search)
GET    /api/products/:id      - Get single product
POST   /api/products          - Create product (Admin only, with image upload)
PUT    /api/products/:id      - Update product (Admin only)
DELETE /api/products/:id      - Delete product (Admin only)
GET    /api/products/categories - Get all categories

## Cart Endpoints
GET    /api/cart              - Get user's cart
POST   /api/cart              - Add item to cart
PUT    /api/cart/:itemId      - Update cart item quantity
DELETE /api/cart/:itemId      - Remove item from cart
DELETE /api/cart              - Clear entire cart

## Order Endpoints
POST   /api/orders            - Create new order (send confirmation email)
GET    /api/orders            - Get user's orders
GET    /api/orders/:id        - Get single order details
PUT    /api/orders/:id/status - Update order status (Admin only)
GET    /api/orders/admin/all  - Get all orders (Admin only)

## Review Endpoints
POST   /api/products/:id/reviews - Add review with image upload
GET    /api/products/:id/reviews - Get product reviews
PUT    /api/reviews/:id      - Update review
DELETE /api/reviews/:id      - Delete review

## User Endpoints
GET    /api/users/profile     - Get user profile
PUT    /api/users/profile     - Update user profile
PUT    /api/users/address     - Add/update shipping address
GET    /api/users/admin/all   - Get all users (Admin only)
PUT    /api/users/:id/role    - Update user role (Admin only)

## Password Reset Flow:
1. POST /api/auth/forgot-password
   - User submits email
   - System generates token and saves to Token model
   - Sends email with reset link containing token
   
2. POST /api/auth/reset-password/:token
   - System verifies token exists and is not expired
   - Validates new password
   - Updates user password
   - Deletes token from Token model
   
3. PUT /api/auth/update-password
   - Authenticated user
   - Verifies current password
   - Updates to new password


## Folder Structure :
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Token.js
│   │
│   ├── validation/
│   │   ├── authValidation.js
│   │   ├── productValidation.js
│   │   ├── orderValidation.js
│   │   ├── userValidation.js
│   │   └── tokenValidation.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── notFoundMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   ├── rateLimitMiddleware.js
│   │   └── tokenMiddleware.js
│   │
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── sendEmail.js
│   │   ├── cloudinary.js
│   │   ├── generateToken.js
│   │   ├── apiFeatures.js
│   │   ├── generateResetToken.js
│   │   └── passwordUtils.js
│   │
│   └── app.js
├── package.json
├── .env
├── .env.example
├── .gitignore
└── README.md

## Postman URL :
- https://documenter.getpostman.com/view/49722654/2sB3dTrnCY