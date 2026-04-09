// Select both forms
const contactForm = document.querySelector(".name-form");
const newsletterForm = document.querySelector(".newsletter-form");

// ==========================================
// 1. Contact Form Logic
// ==========================================
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // 1. Mandatory fields
    if (!name || !email || !message) {
      alert("Error: Name, Email, and Message are required.");
      return;
    }

    // 2. Ironhack rule
    if (name.toLowerCase() === "ironhack") {
      alert("You cannot be Ironhack, because I am Ironhack.");
      return;
    }

    // 3. Name character validation
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Error: Name contains invalid characters. Use letters only.");
      return;
    }

    // 4. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Error: Invalid email format.");
      return;
    }

    // 5. Optional Phone validation
    if (phone) {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        alert("Error: Invalid phone number format.");
        return;
      }
    }

    // --- NEW: Create array and show in CONSOLE ---
    const apiPayload = [
      {
        formType: "contact",
        name: name,
        email: email,
        phone: phone || "Not provided",
        message: message,
      },
    ];

    console.log("--- Contact Form Payload ---");
    console.log(JSON.stringify(apiPayload, null, 2));

    // Success
    alert("Submitted.");
    // contactForm.submit(); // Uncomment to send real data to the server
  });
}

// ==========================================
// 2. Newsletter Form Logic
// ==========================================
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // 1. Locate the container
    const parentContainer = this.parentElement;

    // 2. Select elements to remove
    const headingToRemove = parentContainer.querySelector("h3");
    const asideToRemove = parentContainer.querySelector("aside");

    // 3. Remove them from DOM if they exist
    if (headingToRemove) headingToRemove.remove();
    if (asideToRemove) asideToRemove.remove();

    // --- NEW: Get email, create array and show in CONSOLE ---
    const emailInput =
      this.querySelector('input[type="email"]') || this.querySelector("input");
    const subscriberEmail = emailInput
      ? emailInput.value.trim()
      : "unknown@email.com";

    const apiPayload = [
      {
        formType: "newsletter",
        email: subscriberEmail,
        subscribedAt: new Date().toISOString(),
      },
    ];

    console.log(JSON.stringify(apiPayload, null, 2));

    // 4. Replace form with success message
    this.innerHTML = '<h3 class="success-message">Subscribed!</h3>';
  });
}
