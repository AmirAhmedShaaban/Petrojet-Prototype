const loginForm = document.getElementById('login-form');
const notificationContainer = document.getElementById('notification-container');

loginForm.addEventListener('submit', async e => {
  e.preventDefault();

  // مسح أي إشعارات سابقة
  notificationContainer.textContent = '';

  const payload = {
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value,
  };

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      // تخزين الاسم الأول والاسم الأخير معًا في localStorage
      localStorage.setItem(
        'userFullName',
        `${data.user.firstName} ${data.user.lastName}`
      );

      // عرض رسالة نجاح قبل الانتقال
      notificationContainer.textContent = 'Login successful!';
      notificationContainer.style.color = 'green';
      notificationContainer.style.display = 'block';

      // يمكن الانتظار نصف ثانية قبل إعادة التوجيه
      setTimeout(() => {
        window.location.href = '../cloud.html';
      }, 500);
    } else {
      // عرض رسالة خطأ من السيرفر
      notificationContainer.textContent = data.error || 'Login failed.';
      notificationContainer.style.color = 'red';
      console.error(data);
      notificationContainer.style.display = 'block';
    }
  } catch (err) {
    notificationContainer.textContent = 'Server error. Please try again.';
    notificationContainer.style.color = 'red';
    console.error(err);
  }
});
