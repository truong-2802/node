function addProductToList(product) {
    const productList = document.getElementById("product-list");
    const li = document.createElement("li");
    li.textContent = `Tên: ${product.name}, Mô tả: ${product.description}, Giá: ${product.price}, Số lượng: ${product.quantity}, Thumbnail: ${product.thumbnail}`;
    productList.appendChild(li);
}

// Lắng nghe sự kiện khi người dùng nộp form tạo sản phẩm
document.getElementById("create-product").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn nạp lại trang sau khi nộp form

    // Lấy dữ liệu từ form
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const quantity = document.getElementById("quantity").value;

    // Tạo một đối tượng sản phẩm từ dữ liệu form
    const product = { name, description, price, thumbnail, quantity };

    // Thêm sản phẩm vào danh sách sản phẩm
    addProductToList(product);
});