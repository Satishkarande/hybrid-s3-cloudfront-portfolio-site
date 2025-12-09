Hybrid S3 + CloudFront Static Website Deployment

A Production-ready Static Hosting Architecture on AWS (Free-Tier Friendly)

📌 Project Overview

This project demonstrates how to architect, deploy, and deliver a high-availability, low-latency static website using Amazon S3 + Amazon CloudFront, following real-world AWS Solutions Architect patterns.

The website is stored privately in S3 and delivered globally via CloudFront, ensuring:

⚡ Faster content delivery

🔒 Secure access (Origin Access Control)

🏗️ Fully serverless, scalable architecture

💰 Cost-efficient (100% free tier)

This project is part of my AWS portfolio and showcases strong understanding of cloud architecture, security, and deployment workflows.

🏗️ Architecture Diagram (ASCII)
               +------------------------+
               |      User Browser      |
               +-----------+------------+
                           |
                           | HTTPS Request (Global)
                           v
               +------------------------+
               |      CloudFront        |
               |  Global Edge Network   |
               +-----------+------------+
                           |
                           | Secure OAC (No Public S3)
                           v
               +------------------------+
               |      S3 Bucket         |
               | (Private Static Site)  |
               +-----------+------------+
                           |
                           +--> Stores HTML, CSS, JS

🧰 AWS Services Used
Service	Purpose
Amazon S3	Stores the static website files privately
Amazon CloudFront	Global CDN to deliver content fast
Origin Access Control (OAC)	Ensures S3 is not publicly accessible
IAM	Policies for secure bucket access
CloudFront Invalidations	Cache refresh when updating website
⚙️ Deployment Steps (High-Level)
1️⃣ Create S3 Bucket

Name: project1-<yourname>-static-site

Block all public access

Enable versioning (optional)

Upload website files (index.html, style.css, etc.)

2️⃣ Apply Bucket Policy for CloudFront

S3 bucket remains private, accessible only through CloudFront OAC.

3️⃣ Create CloudFront Distribution

Origin: S3 bucket

Viewer Protocol: Redirect HTTP → HTTPS

Enable OAC

Default Root Object: index.html

Price Class: North America & Europe (free tier optimized)

4️⃣ Upload Website Updates
aws s3 sync . s3://your-bucket-name --delete

5️⃣ Invalidate CloudFront Cache
aws cloudfront create-invalidation --distribution-id XXXX --paths "/*"

📝 Project Highlights
🌍 Global Performance

CloudFront reduces latency by caching content across 450+ POPs worldwide.

🔐 Strong Security

S3 is fully private; only CloudFront can access it using OAC.

🧱 Production-Ready Architecture

Commonly used for:

Landing pages

Documentation portals

Micro-frontend static apps

🎯 Why This Project Matters (Architect Perspective)

As a Solutions Architect, this project proves capability to:

Build secure, scalable serverless hosting systems

Implement CloudFront for latency reduction

Enforce least-privilege access on S3

Manage caching, invalidations, and content updates

Apply real-world AWS architecture patterns

💼 Interview-Style Questions & Answers
▶️ Q: Why use CloudFront instead of S3 static hosting alone?

A: CloudFront provides:

Global edge caching

HTTPS by default

DDoS protection via AWS Shield

Lower latency

Less bandwidth cost

▶️ Q: How does CloudFront securely access the S3 bucket?

A: Through Origin Access Control (OAC).
The S3 bucket policy grants access only to the CloudFront distribution, preventing public exposure.

▶️ Q: How are updates deployed?

Upload new files to S3

Create CloudFront invalidation

Edge caches refresh → users get the latest version

▶️ Q: How is availability preserved?

CloudFront fails over to nearest POP automatically

Cached content can still be served even if S3 is slow

🚧 Challenges Faced

Understanding correct OAC configuration

Bucket policy requiring exact CloudFront principal

Cache not updating until invalidation

Handling CloudFront propagation delays

📚 Key Learnings

Production-grade static hosting patterns

CloudFront caching behavior

How to secure S3 with OAC

Full deployment lifecycle (upload → invalidate → deliver)

🚀 How to Replicate This Project

Clone the repo:

git clone https://github.com/Satishkarande/hybrid-s3-cloudfront-portfolio-site.git


Deploy architecture using:

AWS Console

AWS CLI




👤 Author

Satish Sukhadev Karande
AWS Certified Solutions Architect – Associate
GitHub: https://github.com/Satishkarande
