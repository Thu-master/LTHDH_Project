# 🌐 Mô phỏng thuật toán MLFQ – Multilevel Feedback Queue CPU Scheduling

**Website mô phỏng trực quan thuật toán điều độ CPU: MLFQ (Multilevel Feedback Queue) được xây dựng bằng HTML, CSS và JavaScript.**

![Project Banner](#) <!-- Chèn hình ảnh demo tại đây -->

## 🎯 Giới thiệu | Introduction

Đây là đồ án cuối kỳ môn **Lập trình Hệ điều hành**, với mục tiêu xây dựng một trang web mô phỏng trực quan hoạt động của thuật toán lập lịch CPU nổi tiếng – **Multilevel Feedback Queue (MLFQ)**.

Trang web giúp người học, đặc biệt là sinh viên ngành CNTT, hiểu rõ hơn về cách thuật toán MLFQ xử lý các tiến trình qua từng cấp độ hàng đợi ưu tiên, thời lượng CPU, và các bước điều phối.

This is a final course project for *Operating System Programming*. It provides an interactive simulation of the **Multilevel Feedback Queue (MLFQ)** CPU scheduling algorithm using modern web technologies.

## 🛠️ Công nghệ sử dụng | Technologies

- HTML5
- CSS3 (kèm hiệu ứng transition, animation)
- JavaScript (DOM, mô phỏng hàng đợi)
- (Future upgrade: Java backend, modern JS frameworks...)

## 🚀 Tính năng nổi bật | Key Features

✨ **Giao diện hiện đại**:  
- Landing page cuốn hút với video nền, hiệu ứng cuộn mượt.  
- Navbar có icon, responsive design.

🧠 **Mô phỏng trực quan**:  
- Giao diện mô phỏng tương tác, cho phép người dùng nhập tiến trình.  
- Hiển thị từng bước hoạt động của thuật toán MLFQ.  
- Hỗ trợ thay đổi thông số và tự động tính toán.

📘 **Trang hướng dẫn (Tutorial)**:  
- Giải thích lý thuyết MLFQ và cách sử dụng trình mô phỏng.

👥 **About Us**:  
- Thông tin nhóm phát triển.

🌐 **Chuyển trang mượt mà**  
- Sử dụng `window.location` kết hợp hiệu ứng điều hướng.

🖼️ **Demo & Hình ảnh**:
- [**Video demo**](#) <!-- Chèn link video demo -->
- [**Hình ảnh giao diện**](#) <!-- Chèn hình ảnh mô phỏng -->

## 🧑‍💻 Nhóm thực hiện | Project Team

Dự án được thực hiện theo nhóm với phương pháp phát triển linh hoạt, các thành viên cùng đóng góp vào tất cả các phần mà không chia nhiệm vụ cụ thể.

This project was developed by a collaborative team without strict role assignment – each member contributed to various parts of the system.

## 📦 Cách chạy dự án | How to Run

1. Clone repo về máy:
   ```bash
   git clone https://github.com/Thu-master/LTHDH_Project.git

2. Mở file index.html bằng trình duyệt (Chrome/Edge/Firefox...)

📚 **Nội dung thư mục | Folder Structure**
'''
LTHDH_Project/
│
├── index.html             # Landing page chính
├── about.html             # Trang "About Us"
├── tutorial.html          # Trang hướng dẫn
├── simulator.html         # Trình mô phỏng thuật toán MLFQ
│
├── css/
│   └── style.css          # CSS tổng thể
│
├── js/
│   ├── scroll.js          # Hiệu ứng scroll
│   ├── simulator.js       # Logic mô phỏng MLFQ
│   └── navigation.js      # Chuyển trang
│
└── assets/
    └── video/             # Nền video landing page
'''