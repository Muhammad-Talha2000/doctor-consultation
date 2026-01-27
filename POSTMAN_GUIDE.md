# Doctor Consultation - Postman Collection Guide

This guide will help you import and test the Doctor Consultation API using Postman.

## Files Included

1. **Doctor-Consultation-Postman-Collection.json** - Contains all API endpoints organized by modules
2. **Doctor-Consultation-Postman-Environment.json** - Contains environment variables

## How to Import

### Step 1: Import the Collection

1. Open Postman
2. Click **Import** button (top-left)
3. Select **File** tab
4. Choose `Doctor-Consultation-Postman-Collection.json`
5. Click **Import**

### Step 2: Import the Environment

1. Click the **Settings icon** (⚙️) in the top-right
2. Go to **Environments**
3. Click **Import**
4. Select `Doctor-Consultation-Postman-Environment.json`
5. Click **Import**

### Step 3: Select the Environment

1. In the top-right dropdown (where it says "No Environment"), select **"Doctor Consultation - Development"**

## Environment Variables

The collection uses the following environment variables:

| Variable            | Description                          | Default                     |
| ------------------- | ------------------------------------ | --------------------------- |
| `BASE_URL`          | Backend API base URL                 | `http://localhost:5000/api` |
| `FRONTEND_URL`      | Frontend URL                         | `http://localhost:3000`     |
| `DOCTOR_TOKEN`      | JWT token for doctor authentication  | (empty)                     |
| `PATIENT_TOKEN`     | JWT token for patient authentication | (empty)                     |
| `DOCTOR_ID`         | MongoDB ID of a doctor               | (empty)                     |
| `PATIENT_ID`        | MongoDB ID of a patient              | (empty)                     |
| `APPOINTMENT_ID`    | MongoDB ID of an appointment         | (empty)                     |
| `RAZORPAY_KEY_ID`   | Razorpay merchant key                | (empty)                     |
| `STRIPE_SECRET_KEY` | Stripe secret key                    | (empty)                     |

## API Endpoints Overview

### Authentication

- **POST** `/auth/doctor/register` - Register a new doctor
- **POST** `/auth/doctor/login` - Login as doctor
- **POST** `/auth/patient/register` - Register a new patient
- **POST** `/auth/patient/login` - Login as patient

### Doctor

- **GET** `/doctor/list` - Get list of doctors with filters
- **GET** `/doctor/me` - Get doctor profile (requires auth)
- **PUT** `/doctor/onboarding/update` - Update doctor profile (requires auth)
- **GET** `/doctor/dashboard` - Get doctor dashboard data (requires auth)

### Patient

- **GET** `/patient/me` - Get patient profile (requires auth)
- **PUT** `/patient/onboarding/update` - Update patient profile (requires auth)

### Appointments

- **GET** `/appointment/booked-slots/:doctorId/:date` - Get booked slots for a doctor
- **POST** `/appointment/book` - Book a new appointment (requires auth)
- **GET** `/appointment/doctor` - Get doctor's appointments (requires auth)
- **GET** `/appointment/patient` - Get patient's appointments (requires auth)
- **GET** `/appointment/:id` - Get single appointment details (requires auth)
- **GET** `/appointment/join/:id` - Join consultation (requires auth)
- **PUT** `/appointment/end/:id` - End consultation (requires auth)
- **PUT** `/appointment/status/:id` - Update appointment status (requires auth)

### Payment

- **POST** `/payment/create-order` - Create Razorpay order (requires auth)
- **POST** `/payment/verify-payment` - Verify Razorpay payment (requires auth)
- **POST** `/payment/create-checkout-session` - Create Stripe checkout session

## Quick Start Guide

### 1. Register and Login

**For Doctor:**

1. Send POST request to `/auth/doctor/register` with:
   ```json
   {
     "name": "Dr. John Doe",
     "email": "doctor@example.com",
     "password": "password123"
   }
   ```
2. Copy the token from response
3. In Postman, go to **Environments** and paste the token in `DOCTOR_TOKEN`

**For Patient:**

1. Send POST request to `/auth/patient/register` with:
   ```json
   {
     "name": "John Patient",
     "email": "patient@example.com",
     "password": "password123"
   }
   ```
2. Copy the token from response
3. In Postman, go to **Environments** and paste the token in `PATIENT_TOKEN`

### 2. Update Profiles (Optional)

- Doctor: Use `PUT /doctor/onboarding/update` to complete profile setup
- Patient: Use `PUT /patient/onboarding/update` to complete profile setup

### 3. Get Doctor ID

1. Send GET request to `/doctor/list`
2. Copy the `_id` from any doctor in the response
3. Paste it in Environment variable `DOCTOR_ID`

### 4. Book an Appointment

1. Send POST request to `/appointment/book` with:
   ```json
   {
     "doctorId": "{{DOCTOR_ID}}",
     "slotStartIso": "2026-01-25T10:00:00.000Z",
     "slotEndIso": "2026-01-25T10:30:00.000Z",
     "date": "2026-01-25",
     "consultationType": "Video Consultation",
     "symptoms": "Describe your symptoms here",
     "consultationFees": 500,
     "platformFees": 50,
     "totalAmount": 550
   }
   ```
2. Copy the `_id` from the response
3. Paste it in Environment variable `APPOINTMENT_ID`

### 5. Test Payment

- Create Razorpay order: `POST /payment/create-order`
- Create Stripe checkout: `POST /payment/create-checkout-session`

## Important Notes

### Authentication

- All endpoints marked with `(requires auth)` need a JWT token in the Authorization header
- The collection automatically includes the token from environment variables
- If you get a 401 error, make sure you've set the correct token in the environment

### Base URL

- Make sure your backend is running on `http://localhost:5000`
- If running on a different port, update `BASE_URL` in the environment

### Required Roles

- Doctor endpoints require a doctor token
- Patient endpoints require a patient token
- Public endpoints don't require authentication

### Troubleshooting

**401 Unauthorized Error:**

- Check if the token is correctly set in the environment
- Make sure you're using the right token (doctor vs patient)
- Tokens may expire after 7 days

**404 Not Found Error:**

- Verify the resource ID (doctor, patient, appointment) exists
- Update the `DOCTOR_ID`, `PATIENT_ID`, or `APPOINTMENT_ID` in environment

**CORS Error:**

- Ensure `ALLOWED_ORIGINS` in backend includes your frontend URL
- Check backend `.env` file configuration

**Connection Error:**

- Verify backend is running on the correct port
- Check `BASE_URL` matches your backend URL

## Advanced Features

### Using Pre-request Scripts

Some requests have pre-request scripts to automatically set environment variables. You can expand this by:

1. Right-click on a request
2. Select **Pre-request Script**
3. Add custom JavaScript to manipulate requests/responses

### Using Tests/Post-response Scripts

You can add post-response scripts to automatically extract and save IDs:

```javascript
// Example: Save doctor ID from response
if (pm.response.code === 200) {
  var jsonData = pm.response.json();
  pm.environment.set("DOCTOR_ID", jsonData.data[0]._id);
}
```

## Support & Issues

For issues or questions:

1. Check the backend console for detailed error messages
2. Review request/response in Postman's request inspector
3. Verify all environment variables are set correctly
4. Check MongoDB connection and running status

---

**Last Updated:** January 22, 2026
