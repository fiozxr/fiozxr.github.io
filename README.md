# 🛡️ Fiozxr Rahman - Portfolio

![Status](https://img.shields.io/badge/Status-Active-success)
![Focus](https://img.shields.io/badge/Focus-Cybersecurity-blue)
![Backend](https://img.shields.io/badge/Backend-Supabase-green)

Welcome to the official repository for my personal portfolio website. This project serves as a central hub to showcase my journey as a cybersecurity student, my technical skill set, and the security tools I have developed.

## 📖 About Me

I am Fiozxr Rahman, a driven Cybersecurity student with a keen interest in network security, ethical hacking, and defending against cyber threats.

While I do not come from a traditional computer science academic background, I have cultivated strong practical experience in understanding complex systems and building defenses. My goal is to collaborate with fellow enthusiasts and expand my knowledge in securing digital infrastructure.

## 💻 Tech Stack & Skills

This portfolio is built as a lightweight, static website enhanced with cloud services.

### Website Architecture
* **Frontend:** HTML5, CSS3, and Vanilla JavaScript.
* **Styling:** Custom CSS (`styles.css`) with responsive design for mobile and desktop.
* **Fonts:** Montserrat and Roboto Mono via Google Fonts.
* **Icons:** FontAwesome (v6.0.0).
* **Backend:** **Supabase** (via CDN) is used to handle contact form submissions without a server.

### My Technical Skills
* **Network Security:** Protocols, firewalls, IDS/IPS, and VPNs.
* **Programming:** Python, C++, and Bash scripting.
* **Ethical Hacking:** Penetration testing and vulnerability assessment.
* **OS & Systems:** Linux/Unix, Windows Server, and Virtualization.
* **Cloud Security:** Basic knowledge of AWS/Azure best practices.

---

## 📂 Featured Projects

This repository highlights the following security tools I have developed:

### 1. [CryXR](https://github.com/fiozxr/CryXR)
* **Description:** A multi-layered encryption and decryption tool with custom cipher stacking, dynamic key derivation, and configurable cipher pipelines.
* **Tech Stack:** Python, Cryptography (AES, RSA).

### 2. NetRecon
* **Description:** A LAN reconnaissance scanner for active host discovery, open-port mapping, and service fingerprinting.
* **Tech Stack:** Python, Scapy, Networking.

### 3. WebVuln
* **Description:** A Proof-of-Concept scanner for identifying basic web vulnerabilities such as XSS and SQL Injection.
* **Tech Stack:** Python, Requests, Web Security.

---

## ⚙️ Installation & Setup

To Download this portfolio locally:

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/fiozxr.github.io
    ```
2.  **Verify Files:** Ensure `index.html`, `styles.css`, and an `images/` folder containing `pfp.jpg` are present.
3.  **Run:** Open `index.html` in your browser.

---

## 🗄️ Database Configuration (Supabase)

The contact form is powered by **Supabase**. The JavaScript logic in `index.html` sends data to a remote database.

If you are setting this up for yourself, you must configure your database table to match the code's expectation:

1.  **Create a Table:** The table must be named `messages`.
2.  **Schema:** The table requires the following columns to accept the form data:
    * `name` (Text)
    * `email` (Text)
    * `message` (Text)
    * *Note: `id` and `created_at` usually default in Supabase.*
3.  **Client Logic:** The script initializes the client using the specific URL and Key found in the footer script of `index.html`.

> **Security Note:** As a cybersecurity student, I am aware that the API key is exposed in the frontend. In a production environment, Row Level Security (RLS) policies are enforced on the Supabase table to ensure that public users can only **INSERT** messages, while only authenticated administrators can **READ** them.

---

## 📬 Contact Information

Feel free to reach out for collaborations or opportunities!

* **Email:** [connect@fiozxrrahman.net.eu.org](mailto:connect@fiozxrrahman.net.eu.org)
* **GitHub:** [fiozxr](https://github.com/fiozxr)
* **Instagram:** [@fiozxr_](https://instagram.com/fiozxr_)

---
&copy; 2023 Fiozxr Rahman. No rights reserved.
