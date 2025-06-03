# 🧠 Mô Phỏng Thuật Toán Lập Lịch CPU – MLFQ

![HTML](https://img.shields.io/badge/Tech-HTML%2FCSS%2FJS-yellow)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![Status](https://img.shields.io/badge/Status-Đồ_án_cuối_kỳ-success)

---

## 📝 Giới Thiệu

**MLFQ Web Simulator** là một website được phát triển nhằm mục đích **mô phỏng trực quan thuật toán lập lịch CPU Multilevel Feedback Queue (MLFQ)**.  
Đây là đồ án cuối kỳ môn **Lập Trình Hệ Điều Hành**, giúp sinh viên:

- Hiểu sâu hơn về cách hoạt động của thuật toán MLFQ.
- Trực tiếp quan sát quy trình xử lý tiến trình qua các hàng đợi ưu tiên.
- Rèn luyện tư duy thuật toán thông qua tương tác trực quan trên giao diện web hiện đại.

---

## 🎯 Tính Năng Chính

1. **Giao Diện Landing Page Chuyên Nghiệp**  
   - Thiết kế hiện đại, hiệu ứng cuộn mượt, nền video sống động.
   - Navigation bar tích hợp icon, dễ sử dụng.

2. **Mô Phỏng Tương Tác Thuật Toán MLFQ**  
   - Nhập tiến trình, thời gian burst, thời điểm đến.
   - Hiển thị trực quan thứ tự xử lý và thời gian từng tiến trình.

3. **Chuyển Trang, Tutorial và About Us**  
   - Chuyển trang không giật lag, trải nghiệm liền mạch.
   - Trang hướng dẫn sử dụng kèm lý thuyết giải thích rõ ràng.
   - Giới thiệu nhóm phát triển và mục tiêu dự án.

4. **Thiết Kế Responsive, Hoạt Động Hoàn Toàn Trên Client**  
   - Không cần backend hay cài đặt phức tạp.
   - Phù hợp cho cả máy tính và thiết bị di động.

---

## ⚙️ Cài Đặt và Sử Dụng

### 1. Yêu Cầu Hệ Thống

- Trình duyệt hiện đại: Chrome, Edge, Firefox...
- Kết nối internet (để hiển thị video nền nếu dùng link online)

### 2. Cài Đặt

```bash
git clone https://github.com/Thu-master/LTHDH_Project.git
cd LTHDH_Project
Sau đó mở file index.html bằng trình duyệt bất kỳ.

3. Hướng Dẫn Sử Dụng
Truy cập trang landing → click “Simulator” để vào trình mô phỏng.

Nhập các thông số tiến trình cần mô phỏng.

Quan sát quá trình xử lý theo thuật toán MLFQ.

🗂️ Cấu Trúc Thư Mục
bash
Sao chép
Chỉnh sửa
LTHDH_Project/
│
├── index.html             # Trang landing page
├── tutorial.html          # Trang hướng dẫn sử dụng
├── about.html             # Trang giới thiệu nhóm
├── simulator.html         # Trang mô phỏng MLFQ
│
├── css/
│   └── style.css          # Giao diện và hiệu ứng
│
├── js/
│   ├── scroll.js          # Điều hướng và cuộn trang
│   ├── simulator.js       # Xử lý logic mô phỏng
│   └── navigation.js      # Chuyển trang
│
└── assets/
    └── video/             # Video nền (nếu có)
🎥 Demo
💡 Bạn có thể chèn hình ảnh hoặc video minh họa tại đây.

[CHỖ CHÈN HÌNH ẢNH / VIDEO DEMO]
Ví dụ: ảnh giao diện landing, ảnh giao diện mô phỏng, ảnh biểu đồ tiến trình...

👨‍💻 Đóng Góp
Chúng tôi luôn hoan nghênh mọi sự đóng góp hoặc góp ý để cải tiến dự án.

Fork repository.

Tạo branch mới:

bash
Sao chép
Chỉnh sửa
git checkout -b feature/ten-tinh-nang
Commit và push thay đổi:

bash
Sao chép
Chỉnh sửa
git commit -m "Thêm mô phỏng Gantt Chart"
git push origin feature/ten-tinh-nang
Mở pull request để được xem xét tích hợp vào dự án.

👥 Nhóm Phát Triển
Dự án được thực hiện theo nhóm, không phân chia vai trò cụ thể – mọi người cùng nhau đóng góp ý tưởng và phát triển:

Thu-master (Initiator & Developer)

Các thành viên nhóm khác (ẩn danh)

📧 Liên Hệ
Email: thuvoong@gmail.com

GitHub: Thu-master

🛡️ Giấy Phép
Dự án phục vụ mục đích học tập, không sử dụng cho thương mại.
Mọi người được phép fork, chỉnh sửa và sử dụng lại với ghi chú nguồn.