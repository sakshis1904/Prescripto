## 💳 Razorpay Integration

**Challenge I faced:**  
While working on this project, integrating Razorpay was more complicated than expected. The main issues were handling order generation on the backend, dealing with CORS errors, and verifying payments correctly. I also got stuck a few times because the signature verification kept failing, and switching between test and live mode added more confusion.


**Solution to it:**  
I went through the Razorpay docs, tested the API step-by-step, and rewrote the backend logic to securely generate orders and verify signatures properly. I stored API keys in environment variables, fixed the CORS configuration, and tested the entire flow multiple times until everything worked consistently. Webhooks helped track the final payment status, which made the system much more reliable.


**Outcome:**  
After a lot of trial and error, the payment flow is now working smoothly from the frontend checkout to backend verification. This task gave me real experience in working with external APIs, handling errors, and making a feature production-ready — not just theoretically, but practically.
