import { Injectable } from '@nestjs/common';
import Book, { IBook } from './book.entity';
import { CreateBookDTO } from './dto/CreateBook.dto';

@Injectable()
export class BookRepository {
  async save(bookData: CreateBookDTO) {
    const newBook = new Book(bookData);
    await newBook.save();

    return newBook;
  }

  async findByInternalId(internalId: string) {
    return await Book.findOne({ internalId });
  }

  async update(internalId: string, bookUpdateData: Partial<IBook>) {
    return await Book.findOneAndUpdate({ internalId }, bookUpdateData, {
      new: true,
    });
  }

  async delete(internalId: string) {
    return await Book.findOneAndDelete({ internalId });
  }

  async findAll() {
    return await Book.find({});
  }
}
