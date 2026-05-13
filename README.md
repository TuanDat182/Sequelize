# Luyện tập làm việc với dependencies

## Cách chạy dự án
*Đầu tiên cần bật dịch vụ mysql của bạn*

```bash
npm install
npx sequelize-cli migrate
npx sequelize-cli seed 
npm run dev

## Cấu trúc dự án


server
├── public
├── src
│   ├── config          *Chứa các tùy chọn để kết nối database*
│   ├── controllers     *Logic điều khiển*
│   ├── middlewares     *Middlewares*
│   ├── migrations      *Lưu trữ cấu trúc bảng*
│   ├── models          *Cấu hình cấu trúc dữ liệu*
│   ├── routes          *Các cấu hình đường dẫn*
│   └── seeders         *Lưu trữ dữ liệu mẫu khi tạo bảng*
├── .env
├── .gitignore
├── .sequelizerc
├── app.js              *Chứa hàm tạo server chính của dự án*
├── package.json
└── package-lock.json
