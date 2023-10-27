function submitBuku(e) {
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;
    const checkBox = document.getElementById('checkBox').checked;

    const formData = {
        id: +new Date(),
        title: judul,
        author: penulis,
        year: parseInt(tahun),
        isComplete: checkBox,
      }

    const getBooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

    localStorage.setItem('books', JSON.stringify ([...getBooks, formData]));

    alert('Buku Berhasil Ditambahkan!');
    document.getElementById('judul').value = "";
    document.getElementById('penulis').value = "";
    document.getElementById('tahun').value = "";

    renderDataBuku();
}

function searchBook() {
    const searchInput = document.getElementById('searchInput').value;
    renderDataBuku(searchInput.toLowerCase());
}

function renderDataBuku(search = "") {
    const getBooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
    const getBooksFiltered = getBooks.filter((o) => o.title.toLowerCase().includes(search));

    const belumSelesai = document.getElementById('belumSelesai');
    const sudahSelesai = document.getElementById('sudahSelesai');

    belumSelesai.innerHTML = "";
    sudahSelesai.innerHTML = "";

    for (const book of getBooksFiltered) {
     if (book.isComplete) {
        sudahSelesai.innerHTML += `<div class="statusBaca mb-2">
        <h5>${book.title}</h3>
            <h6>By: ${book.author}</h6>
            <h6>Tahun: ${book.year}</h6>
            <button onclick="moveBook(${book.id}, false)" type="button" class="btn btn-success btnGreen my-1">Tandai belum selesai</button>
            <button onclick="deleteBook(${book.id})" type="button" class="btn btn-danger my-1">Hapus Buku</button>
    </div>`
     } else {
        belumSelesai.innerHTML += `<div class="statusBaca mb-2">
        <h5>${book.title}</h3>
            <h6>By: ${book.author}</h6>
            <h6>Tahun: ${book.year}</h6>
            <button onclick="moveBook(${book.id}, true)" type="button" class="btn btn-success btnGreen my-1">Tandai sudah selesai</button>
            <button onclick="deleteBook(${book.id})" type="button" class="btn btn-danger my-1">Hapus Buku</button>
    </div>`
     }
    }
}

function moveBook(id, isComplete) {
    console.log(id);
    const getBooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
console.log(getBooks);
    const findBook = getBooks.find((o) => o.id === id);
    console.log(findBook);
    const editBook = {...findBook, isComplete: isComplete};
    console.log(editBook);
    deleteBook(id);

    const getLatestBooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
    localStorage.setItem('books', JSON.stringify([...getLatestBooks, editBook]));
    renderDataBuku();
}

function deleteBook(id) {
    const getBooks = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

    const notDeleted = getBooks.filter((o) => o.id !== id);
    localStorage.setItem("books", JSON.stringify(notDeleted));

    renderDataBuku();
}

window.onload = function () {
    renderDataBuku();
}