//signup
const signupForm = document.querySelector('form#signup-form'); // فرضاً أعطيت الفورم id
const notificationContainer = document.getElementById('notification-container');

signupForm.addEventListener('submit', async e => {
  e.preventDefault();

  // مسح أي إشعارات سابقة
  notificationContainer.textContent = '';

  const payload = {
    name: document.getElementById('name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('Registered', data);

      // عرض رسالة نجاح
      notificationContainer.textContent = 'Registration successful!';
      notificationContainer.style.color = 'green'; // يمكن تغيير اللون حسب التصميم
      notificationContainer.style.display = 'block';

      // يمكنك مسح الفورم بعد التسجيل
      signupForm.reset();
    } else {
      // عرض رسالة خطأ من السيرفر
      notificationContainer.style.display = 'block';
      notificationContainer.textContent = data.error || 'Registration failed.';
      notificationContainer.style.color = 'red';

      console.error(data);
    }
  } catch (err) {
    notificationContainer.textContent = 'Server error. Please try again.';
    notificationContainer.style.color = 'red';
    console.error(err);
  }
});
