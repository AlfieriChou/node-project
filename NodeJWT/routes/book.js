import Book from '../models/book';

const getBooks = (req, res) => {
	Book.find(null, null, { sort: { postDate : 1 } }, (err, books) => {
		if (err) {
			res.send(err);
		}
		res.json(books);
	});
}

const getBook = (req, res) => {
	const { id } = req.params;
	Book.findById(id, (err, book) => {
		if (err) {
			res.send(err);
		}
		res.json(book);
	});
}

const postBook = (req, res) => {
    let book = Object.assign(new Book(), req.body);
    book.save(err => {
        if (err) {
            res.send(err);
        }
        res.json({ message: '书籍已添加', book });
    });
};

const deleteBook = (req, res) => {
    Book.remove(
        { _id: req.params.id },
        err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: '书籍已删除' });
        }
    );
};

export {
	getBooks,
	getBook,
    postBook,
    deleteBook
};