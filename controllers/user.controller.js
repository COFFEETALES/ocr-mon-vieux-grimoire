/* vim: set tabstop=2 softtabstop=0 expandtab shiftwidth=2 smarttab : */
import jwt from 'jsonwebtoken';
import { createHash } from 'node:crypto';

import User from '../models/user.model.js';
import { config } from '../core/config.js';

const emailRegex = (
  /^[^@]+@[^@]+\.[^@]+$/
);

const passwordRegex = (
  /^(?=.*?[A-Z])(?=.*?\d).{8,}$/
);

const sha512 = (
  (password, salt) => {
    const hash = createHash('sha512');
    hash.update([password, salt].join(''));
    return hash.digest('hex');
  }
);

export const userSignup = (
  (req, res, next) => {
    if (!req.body || !req.body['email'] || !req.body['password']) {
      return (
        res.status(410).json(
          {message: "Les champs email et mot de passe sont obligatoires." }
        )
      );
    }

    if (!emailRegex.test(req.body['email'])) {
      return (
        res.status(410).json(
          {message: "L'adresse e-mail ne correspond pas à une saisie valide." }
        )
      );
    }
    if (!passwordRegex.test(req.body['password'])) {
      return (
        res.status(410).json(
          {message: "Un minimum de 8 caractères est attendu dans le mot de passe et il doit comprendre un chiffre et une majuscule."}
        )
      );
    }

    User.findOne(
      {email: req.body['email']}
    ).then(
      user => {
        if (user) {
          return (
            res.status(409).json({message: "L'utilisateur existe déjà."})
          );
        }
        user = new User({
          email: req.body.email,
          password: sha512(req.body.password, config['SHA_512_SALT'])
        });
        user.save().then(
          () => (
            res.status(201).json({message: "L'utilisateur a été créé."})
          )
        ).catch(
          error => (
            res.status(400).json({error})
          )
        );
      }
    );
  }
);

export const userLogin = (
  (req, res, next) => {
    if (!req.body || !req.body['email'] || !req.body['password']) {
      return (
        res.status(410).json(
          {message: "Les champs email et mot de passe sont obligatoires." }
        )
      );
    }

    User.findOne(
      {'email': req.body['email']}
    ).then(
      user => {
        if (!user || user.password !== sha512(req.body['password'], config['SHA_512_SALT'])) {
          return (
            res.status(401).json(
              {error: "L'adresse e-mail ou le mot de passe est incorrect."}
            )
          );
        }

        return (
          res.status(200).json(
            {
              'userId': user._id,
              'token': jwt.sign(
                { userId: user._id },
                config['JWT_SECRET_TOKEN'],
                { expiresIn: '24h' }
              )
            }
          )
        );
      }
    ).catch(
      error => (
        res.status(500).json({error})
      )
    );
  }
);
