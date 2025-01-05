/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import fs from 'fs';

import Book from '../models/book.model.js';

export const getAllBooks = (
  async (req, res, next) => {
    try {
      const books = await Book.find();
      return (
        res.status(200).json(books)
      );
    } catch (error) {
      return (
        res.status(400).json({error: error})
      );
    }
  }
);

export const getTopRatedBooks = (
  async (req, res, next) => {
    try {
      const topRatedBooks = (
        await Book.find().sort({averageRating: -1}).limit(3)
      );
      return (
        res.status(200).json(topRatedBooks)
      );
    } catch (error) {
      return (
        res.status(500).json({error: 'Une erreur est survenue.'})
      );
    }
  }
);

export const getOneBook = (
  async (req, res, next) => {
    try {
      const requestedBook = (
        await Book.findOne({_id: req.params.id})
      );
      return (
        requestedBook ?
          res.status(200).json(requestedBook) :
            res.status(404).json({error: 'Le livre demandé est introuvable.'})
      );
    } catch (error) {
      return (
        res.status(500).json({error})
      );
    }
  }
);

export const createBook = (
  async (req, res, next) => {
    const bookData = JSON.parse(req.body.book);
    if (!req.file) {
      return (
        res.status(400).json({message: "L'image du livre est obligatoire."})
      );
    } else {
      delete bookData._id;
      delete bookData._userId;
      if (bookData.ratings[0].grade === 0) {
        bookData.ratings = [];
      }
      const imageFilename = req.file.filename;
      const newBook = new Book({
        ...bookData,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${imageFilename}`,
      });
      try {
        await newBook.save();
        return (
          res.status(201).json({message: 'Book saved'})
        );
      } catch (error) {
        fs.unlinkSync(`images/${imageFilename}`);
        return (
          res.status(400).json({error})
        );
      }
    }
  }
);

export const addBookRating = (
  async (req, res, next) => {
    const userHasRated = await Book.findOne({
      _id: req.params.id, 'ratings.userId': req.body.userId,
    });
    if (userHasRated) {
      return (
        res.status(400).json({message: "L'utilisateur a déjà noté ce livre."})
      );
    }
    if (typeof req.body.rating !== 'number' || req.body.rating < 0.0 || req.body.rating > 5.0) {
      return (
        res.status(400).json({message: 'La note doit être un nombre compris entre 0 et 5.'})
      );
    }
    try {
      const bookToRate = await Book.findOne({ _id: req.params.id });
      if (!bookToRate) {
        return (
          res.status(404).json({message: 'Le livre demandé est introuvable.'})
        );
      }
      bookToRate.ratings.push({userId: req.body.userId, grade: req.body.rating});
      await bookToRate.save();
      return (
        res.status(200).json(bookToRate)
      );
    } catch (error) {
      return (
        res.status(500).json({message: 'Une erreur est survenue.'})
      );
    }
  }
);

export const modifyBook = (
  async (req, res, next) => {
    try {
      const updatedBookData = req.file
        ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          }
        : { ...req.body };
      delete updatedBookData._userId;
      const bookToUpdate = await Book.findOne({_id: req.params.id});
      if (bookToUpdate.userId !== req.auth.userId) {
        return (
          res.status(403).json({message: "L'utilisateur n'est pas autorisé à modifier ce livre."})
        );
      }
      if (req.file) {
        const oldFilename = bookToUpdate.imageUrl.split('/images/')[1];
        fs.unlinkSync(`images/${oldFilename}`);
      }
      await Book.updateOne(
        { _id: req.params.id },
        { ...updatedBookData, _id: req.params.id }
      );
      return (
        res.status(200).json({message: 'Le livre a été modifié.'})
      );
    } catch (error) {
      return (
        res.status(400).json({error})
      );
    }
  }
);

export const deleteBook = (
  (req, res, next) => {
    Book.findOne(
      {_id: req.params.id}
    ).then(
      (bookToDelete) => {
        if (bookToDelete.userId !== req.auth.userId) {
          res.status(403).json({message: "L'utilisateur n'est pas autorisé à supprimer ce livre."});
        } else {
          const imageFilename = bookToDelete.imageUrl.split('/images/')[1];
          fs.unlink(
            `images/${imageFilename}`, () => {
              Book.deleteOne(
                { _id: req.params.id }
              ).then(
                () => res.status(200).json({ message: 'Book deleted' })
              ).catch(
                (error) => res.status(401).json({ error })
              );
            }
          );
        }
      }
    ).catch(error => res.status(500).json({error}));
  }
);
